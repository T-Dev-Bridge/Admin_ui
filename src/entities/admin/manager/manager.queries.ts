import { queryOptions } from "@tanstack/react-query";
import { ManagerService } from "@/shared/api/admin/manager";
import { queryClient } from "@/shared/lib/react-query";
import {
  transformManagerDtoToManager,
  transformManagersDtoToManagers,
} from "@/entities/admin/manager/manager.lib";
import { Managers } from "@/entities/admin/manager/manager.types";
import { FilterQuery } from "@/entities/common/common.types.ts";

export class ManagerQueries {
  static readonly keys = {
    root: ["manager"] as const,
  };

  static managerQuery(id: string) {
    return queryOptions({
      queryKey: [...this.keys.root, id],
      queryFn: async ({ signal }) => {
        const response = await ManagerService.managerQuery(id, {
          signal,
        });
        return transformManagerDtoToManager(response.data.data);
      },
      initialData: () => this.getInitialData(["manager", `${id}`]),
      initialDataUpdatedAt: () =>
        this.getQueryDataUpdateAt(["manager", `${id}`]),
    });
  }

  static managersQuery(filter?: FilterQuery) {
    const {
      size = 5,
      index = 0,
      keywords = "",
      searchOp = "OR",
      order = "desc",
      orderBy = "modDt",
    } = filter || {};

    const sortProperties = `${orderBy};${order}`;

    const queryKey = [
      ...this.keys.root,
      "general-groups",
      "by-filter",
      index,
      size,
      searchOp,
      keywords,
      sortProperties,
    ].filter(Boolean) as string[];

    return {
      queryKey,
      queryFn: async () => {
        const response = await ManagerService.managersQuery({
          params: {
            size,
            index,
            sortProperties,
            searchOp,
            ...(keywords && { keywords }),
          },
        });

        const managers = transformManagersDtoToManagers(response.data.data);

        this.setManagerData(managers);

        return managers;
      },
      initialData: () => this.getInitialData<Managers>(queryKey),
      initialDataUpdatedAt: () => this.getQueryDataUpdateAt(queryKey),
    };
  }

  private static getInitialData<T>(queryKey: string[]) {
    return queryClient.getQueryData<T>(queryKey);
  }

  private static getQueryDataUpdateAt<T>(queryKey: string[]) {
    return queryClient.getQueryState<T>(queryKey)?.dataUpdatedAt;
  }

  private static setManagerData(managers: Managers) {
    const { list } = managers;
    list.forEach((manager) => {
      queryClient.setQueryData([...this.keys.root, manager.id], manager);
    });
  }
}
