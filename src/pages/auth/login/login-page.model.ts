import { LoaderFunctionArgs, redirect } from "react-router";
import { pathKeys } from "@/shared/lib/react-router";
import { useSessionStore } from "@/shared/session";
import { createLoginStore } from "@/features/auth/login/login.model";

export class LoginLoader {
  static async loginPage(args: LoaderFunctionArgs) {
    if (useSessionStore.getState().session) {
      // 새션이 로그인 돼어 있을 경우 login이 아닌 다른 페이지로 이동한다.
      return redirect(pathKeys.admin.manager());
    }
    // 세션이 없을 경우 정해진대로 login 페이지로 이동한다.
    return args;
  }
}

class LoginModel {
  readonly useLoginStore;

  constructor() {
    this.useLoginStore = createLoginStore({
      initialState: { targetUserInfo: {} },
      devtoolsOptions: { name: "Login Store" },
    });
  }
}

export const loginModel = new LoginModel();
