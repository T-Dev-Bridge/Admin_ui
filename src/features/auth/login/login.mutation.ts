import {
  DefaultError,
  UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { AxiosHeaders } from "axios";
import { AuthService } from "@/shared/api/auth";
import { LoginResponseWithTokenDto } from "@/shared/api/auth/auth.types";
import { REFRESH_TOKEN_HEADER } from "@/shared/constants/constants";
import { sessionLib, useSessionStore } from "@/shared/session";
import { loginModel } from "@/pages/auth/login/login-page.model";
import { loginContract } from "./login-form";
import { transformLoginToLoginDto } from "./login-form/login-form.lib";

export function useLoginMutation(
  options?: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof AuthService.loginUserMutation>>, // 응답 타입
      DefaultError, // 실패시 에러 타입
      loginContract.Login, // 요청 타입
      unknown // 추가적인 옵션 타입
    >,
    "mutationKey" | "onMutate" | "onSuccess" | "onError" | "onSettled"
  >,
) {
  const {
    mutationKey = [],
    onMutate,
    onSuccess,
    onError,
    onSettled,
  } = options || {};

  return useMutation({
    mutationKey: ["session", "login-user", ...mutationKey],

    mutationFn: async (login: loginContract.Login) => {
      const loginUserDto = transformLoginToLoginDto(login);
      return AuthService.loginUserMutation({ loginUserDto });
    },

    onMutate,

    onSuccess: async (response, variables, context) => {
      const responseHeaders = response.headers as AxiosHeaders;

      const loginResponse = response.data.data;

      const accessToken = responseHeaders
        .getAuthorization()!
        .toString()
        .replace("Bearer ", "");

      if (loginResponse && accessToken) {
        const refreshToken = responseHeaders
          .get(REFRESH_TOKEN_HEADER)!
          .toString()
          .replace("Bearer ", "");

        const loginResponseWithToken: LoginResponseWithTokenDto = {
          ...loginResponse,
          accessToken,
          refreshToken,
        };
        const { setSession } = useSessionStore.getState();

        const session = sessionLib.transformLoginResponseWithTokenDtoToSession(
          loginResponseWithToken,
        );
        setSession(session);
      } else {
        const { setTargetUserInfo } = loginModel.useLoginStore.getState();
        setTargetUserInfo(variables.username, accessToken);
      }

      await onSuccess?.(response, variables, context);
    },

    onError,

    onSettled,
  });
}
