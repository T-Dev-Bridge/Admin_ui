// Session 모델을 정의하고, zustand를 사용하여 세션을 관리하는 슬라이스를 생성한다.
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { decryptData, encryptData } from "../lib/crypto";
import { createSelectors } from "../lib/zustand/zustand.lib";
import { Session } from "./session.types";

type State = {
  session: Session | null;
};

type Actions = {
  setSession: (session: Session) => void;
  resetSession: () => void;
};

// zustand를 활용해 세션 상태 관리를 수행하는 store를 생성한다.
function createSessionSlice() {
  const sessionSlice: StateCreator<
    // Sotre 생성에 사용되는 함수의 타입을 정의한다.

    State & Actions, // Store의 상태 타입을정의한다. 상태와 상태를 업데이트하는 함수를 받는다.
    [["zustand/devtools", never], ["zustand/persist", unknown]], // 미들웨어에 의해 추가된 매개변수의 타입을 정의한다.
    [], // 미들웨어에 의해 추가된 콜백 타입을 정의한다.
    State & Actions // 반환되는 상태 타입을 정의한다.
  > = (set) => ({
    session: null, // 초기 세션은 null이다.
    setSession: (session: Session) => set({ session }, false, "setSession"), // 새 세션을 설정한다.
    // set 함수는 StateCreator에서 제공해주는 상태 업데이트 함수이다.
    // {session} 은 업데이트할 상태 객체를 의미한다.
    // false는 상태 업데이트를 병합하지 않고 대체한다는 의미이다.
    // ""은 액션의 이름으로 디버깅 목적으로 사용된다. 즉 세션을 파라미터로 받아 상태값으로 업데이트 한다는 의미이다.

    resetSession: () => set({ session: null }, false, "resetSession"), // 세션을 null로 초기화한다.
  });
  return sessionSlice;
}

const slice = createSessionSlice();

// session 즉 인증 DTO를 암호화 하여 zustand를 통해 저장한다.
// AccessToken, RefreshToken UserId 등 상태 값에 포함되는 정보를 저장한다.
const withPersist = persist(slice, {
  name: "session",
  storage: {
    getItem: (name) => {
      const encryptedData = localStorage.getItem(name);
      if (encryptedData) {
        try {
          const decryptedData = decryptData(encryptedData);
          return JSON.parse(decryptedData);
        } catch (error) {
          return null;
        }
      }
      return null;
    },
    setItem: (name, state) => {
      try {
        const encryptedData = encryptData(JSON.stringify(state));
        localStorage.setItem(name, encryptedData);
      } catch (error) {
        console.error(error);
      }
    },
    removeItem: (name) => {
      localStorage.removeItem(name);
    },
  },
});
// 상태의 변화를 추적한다. withPersist를 통해 LocalStorage에 저장되어 상태를 유지할 수 있다.
const withDevtools = devtools(withPersist, { name: "Session Service" });

// 실제 zustand store를 생성한다.
const store = create(withDevtools);

// 해당 store에 접근할 수 있는 훅을 만들어서 내보낸다.
// 해당 훅을 통해 정해진 상태만 선택적으로 가져올 수 있다.
export const useSessionStore = createSelectors(store);
