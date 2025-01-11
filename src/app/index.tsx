import axios, { AxiosError, AxiosHeaders } from "axios";
import "@/shared/lib/react-i18next/i18n"; // import 해주지 않으면 경고가 발생한다.
import ReactDOM from "react-dom/client";
import { baseClient, handleGenericError } from "@/shared/api";
import {
  ACCESS_TOKEN_HEADER,
  PATH_REFRESH_TOKEN,
  REFRESH_TOKEN_HEADER,
  SHOULD_ADD_REFRESH_TOKEN,
} from "@/shared/constants/constants";
import { apiPathKeys } from "@/shared/lib/axios/config";
import { useSessionStore } from "@/shared/store/session";
import { Session } from "@/shared/store/session/session.types";
import { Provider } from "./providers";

window.addEventListener("error", (event) => {
  if (axios.isAxiosError(event.error)) {
    event.preventDefault();
  }
});

baseClient.interceptors.request.use(
  // config 객체는 Axios 요청에 담긴 설정 정보들을 담는다.
  // header, url, method, data, params 등이 있을 수 있다.
  // 더 적은 역할을 담당하지만 Java의 Sevlet과 유사하다.
  (config) => {
    // 로그인 model에서 지정한 상태값을 통해 인증정보가 담긴 session 객체를 가져온다.
    const { session } = useSessionStore.getState();

    if (session?.refreshToken && config.headers.get(SHOULD_ADD_REFRESH_TOKEN)) {
      // refreshToken을 보유하고 있는데, logout 상태인 경우
      config.headers.set(
        // 토큰 재발급을 위해 세팅
        REFRESH_TOKEN_HEADER,
        `Bearer ${session.refreshToken}`,
      );
      config.headers.delete(SHOULD_ADD_REFRESH_TOKEN);
    }

    if (
      // accessToken을 가지고 있을 때
      session &&
      session.accessToken &&
      !config?.url?.includes(PATH_REFRESH_TOKEN)
    ) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

let refreshTokenPromise: Promise<any> | null;
let refreshAttemptCount = 0;

baseClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { session, setSession, resetSession } = useSessionStore.getState();
    const { status, config } = error;

    // !! 연산자는 존재하면서, null, undefined 등의 falsy한 값이 아닌 경우 true를 반환한다.
    const isExpired =
      status === 409 &&
      !!config?.headers.Authorization &&
      !!session?.accessToken;

    // 토큰이 만료되어 409 에러가 발생했고, 요청 경로가 토큰 재발급 경로가 아닌 경우
    // 토큰 재발급 GET 요청을 보내고 session (전역 상태 값)에 응답으로 온 AccessToken을 다시 저장한 뒤 재 요청 수행
    if (isExpired && !config.url?.includes(PATH_REFRESH_TOKEN)) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = baseClient
          .get(`${apiPathKeys.auth()}${PATH_REFRESH_TOKEN}`, {
            ...(config && { ...config, params: {} }),
            headers: {
              ...(config?.headers && { ...config.headers }),
              [ACCESS_TOKEN_HEADER]: null,
              [REFRESH_TOKEN_HEADER]: `Bearer ${session.refreshToken}`,
            },
          })
          .then((resp) => {
            refreshTokenPromise = null;
            console.log(resp);
            return resp;
          });
      }
      return refreshTokenPromise
        .then(async (resp) => {
          const responseHeaders = resp.headers as AxiosHeaders;
          const newRefreshToken = responseHeaders[REFRESH_TOKEN_HEADER];
          const accessToken = responseHeaders.getAuthorization();

          if (accessToken && newRefreshToken) {
            const newSession: Session = {
              ...session,
              accessToken: accessToken.toString()!.replace("Bearer ", ""),
              refreshToken: newRefreshToken.toString()!.replace("Bearer ", ""),
            };

            setSession(newSession);

            config.headers.setAuthorization(responseHeaders.getAuthorization());

            refreshAttemptCount += 1;
            if (refreshAttemptCount >= 5) {
              // 토큰 재발급을 5회 시도했는데 실패한 경우
              resetSession();
              refreshAttemptCount = 0; // 카운터 초기화
              return Promise.reject(error);
            }

            return baseClient(config).then((res) => {
              // 성공적으로 재발급 토큰 사용 시 카운터 초기화
              refreshAttemptCount = 0;
              return res;
            });
          }
          // 토큰 재발급에 결국 실패한 경우
          resetSession(); // 만료시킨 뒤 다시 로그인 페이지로
          return Promise.reject(error);
        })
        .catch((refreshTokenError) => {
          resetSession();
          return Promise.reject(refreshTokenError);
        });
    }
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }
    return Promise.reject(handleGenericError(error));
  },
);

ReactDOM.createRoot(document.getElementById("root")!).render(<Provider />);

// const root = ReactDOM.createRoot(document.getElementById("root")!);
//
// root.render(
//   <StrictMode>
//     <Provider />
//   </StrictMode>,
// );
