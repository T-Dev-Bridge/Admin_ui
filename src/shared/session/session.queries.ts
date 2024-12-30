import { queryOptions } from "@tanstack/react-query";
import { AuthService } from "../api/auth";
import { queryClient } from "../lib/react-query";
import { transformLoginResponseWithTokenDtoToSession } from "./session.lib";
import { Session } from "./session.types";

export class SessionQueries {
  static currentSessionQuery() {
    return queryOptions({
      queryKey: ["session", "current-user"],
      queryFn: async ({ signal }) => {
        const response = await AuthService.currentUserQuery({ signal });
        return transformLoginResponseWithTokenDtoToSession(
          response.data as any,
        );
      },

      initialData: () =>
        queryClient.getQueryData<Session>(["session", "current-session"]),

      initialDataUpdatedAt: () =>
        queryClient.getQueryState(["session", "current-session"])
          ?.dataUpdatedAt,
    });
  }
}
