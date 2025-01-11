import { LoaderFunctionArgs } from "react-router";
import { queryClient } from "@/shared/lib/react-query";
import { useSessionStore } from "@/shared/store/session";
import { ManagerQueries } from "@/entities/admin";
import { createManagerFilterStore } from "@/entities/admin/manager/manager.filter";

export class ManagerLoader {
  static async managerPage(args: LoaderFunctionArgs) {
    const promises = [];

    if (useSessionStore.getState().session) {
      promises.push(...ManagerLoader.handleUserSession());
    }

    Promise.all(promises);

    return args;
  }
  private static handleUserSession() {
    const promises: Promise<void>[] = [];

    const managersQuery = ManagerQueries.managersQuery();

    promises.push(queryClient.prefetchQuery(managersQuery));

    return promises;
  }
}

class ManagerModel {
  readonly useManageFilterStore;

  constructor() {
    this.useManageFilterStore = createManagerFilterStore({
      devtoolsOptions: { name: "Manager Filter Store" },
    });
  }
}

export const managerModel = new ManagerModel();
