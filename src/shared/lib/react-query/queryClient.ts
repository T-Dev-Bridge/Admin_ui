import { QueryClient } from "@tanstack/react-query";

// useQuery 데이터 유효 기간 기본 세팅
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 3,
    },
  },
});
