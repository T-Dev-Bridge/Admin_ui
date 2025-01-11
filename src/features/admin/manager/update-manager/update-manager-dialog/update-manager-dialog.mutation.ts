import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { ManagerService } from "@/shared/api/admin";
import { queryClient } from "@/shared/lib/react-query";
import { ManagerQueries, transformManagerDtoToManager } from "@/entities/admin";
import { UpdateManager } from "./update-manager-dialog.contracts";
import { transformUpdateManagerToUpdateManagerDto } from "./update-manager-dialog.lib";

/**
 * Manager 추가 API 에 대한 Mutate 정의
 */
export function useUpdateManagerMutation(
  options?: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof ManagerService.updateManagerMutation>>,
      DefaultError,
      UpdateManager,
      unknown
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
    mutationKey: ["manager", "update", ...mutationKey],

    mutationFn: (updateManager: UpdateManager) => {
      const updateManagerDto =
        transformUpdateManagerToUpdateManagerDto(updateManager);
      return ManagerService.updateManagerMutation({
        updateManagerDto: updateManagerDto,
      });
    },

    onMutate: async (variables) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ManagerQueries.keys.root }),
        onMutate?.(variables),
      ]);
    },

    onSuccess: async (response, variables, context) => {
      const manager = transformManagerDtoToManager(response.data.data!);

      queryClient.setQueryData(
        ManagerQueries.managerQuery(manager.id).queryKey,
        manager,
      );

      /**
       * Success 로직이 추가로 있으면 커스텀해서 활용가능
       */
      await onSuccess?.(response, variables, context);
    },

    onError,

    onSettled: async (response, error, variables, context) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ManagerQueries.keys.root,
        }),
        onSettled?.(response, error, variables, context),
      ]);
    },
  });
}
