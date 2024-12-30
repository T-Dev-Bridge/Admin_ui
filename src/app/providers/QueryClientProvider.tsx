import { ReactNode } from "react";
import {
  Query,
  QueryClientProvider as TanStackQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { queryClient } from "@/shared/lib/react-query";

type QueryClientProviderProps = {
  children: ReactNode;
};

export function QueryClientProvider(props: QueryClientProviderProps) {
  const { children } = props;

  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools // React-Query 개발자 도구의 위치를 세팅한다.
        initialIsOpen={false}
        buttonPosition="bottom-left"
        errorTypes={[
          {
            name: "Error",
            initializer: errorInitializer(new Error("Error message")),
          },
          {
            name: "Axios Error",
            initializer: errorInitializer(new AxiosError("Axios error")),
          },
        ]}
      />
    </TanStackQueryClientProvider>
  );
}

function errorInitializer(error: Error) {
  return (query: Query) => {
    query.reset();
    return error;
  };
}
