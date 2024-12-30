import { StateCreator, create } from "zustand";
import { DevtoolsOptions, devtools } from "zustand/middleware";
import { createSelectors } from "@/shared/lib/zustand";

export type LoginStore = ReturnType<typeof createLoginStore>;

interface TargetUserInfo {
  temporaryToken: string;
}

export function createLoginStore(config: {
  initialState: LoginState;
  devtoolsOptions: DevtoolsOptions;
}) {
  const { initialState, devtoolsOptions } = config;

  const slice = createLoginSlice(initialState);
  const withDevtools = devtools(slice, devtoolsOptions);
  const store = create(withDevtools);
  const useLoginStore = createSelectors(store);

  return useLoginStore;
}

export type LoginState = {
  targetUserInfo: Record<string, TargetUserInfo>;
};

type Actions = {
  reset(): void;
  setTargetUserInfo(userId: string, temporaryToken: string): void;
};

function createLoginSlice(initialState: LoginState) {
  const slice: StateCreator<
    LoginState & Actions,
    [["zustand/devtools", never]],
    [],
    LoginState & Actions
  > = (set) => ({
    ...initialState,
    reset() {
      set({ ...initialState }, false, "reset");
    },
    setTargetUserInfo(userId: string, temporaryToken: string) {
      set(
        (state) => {
          const updatedTargetUserInfo = {
            ...state.targetUserInfo,
            [userId]: {
              ...state.targetUserInfo[userId],
              temporaryToken,
            },
          };

          return {
            ...state,
            targetUserInfo: updatedTargetUserInfo,
          };
        },
        false,
        `setTargetUserInfo ${userId}${temporaryToken}`,
      );
    },
  });

  return slice;
}
