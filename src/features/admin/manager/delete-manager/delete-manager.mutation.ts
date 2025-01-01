import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { ManagerService } from "@/shared/api/admin";
import { queryClient } from "@/shared/lib/react-query";
import { ManagerQueries } from "@/entities/admin";
import { DeleteManager } from "@/features/admin/manager/delete-manager/delete-manager.contract";
import { transformDeleteManagerToDeleteManagerDto } from "@/features/admin/manager/delete-manager/delete-manager.lib";

export function useDeleteManagerMutation(
  options?: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof ManagerService.deleteManagerMutation>>,
      DefaultError,
      DeleteManager,
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
    mutationKey: ["manager", "delete", ...mutationKey],

    mutationFn: (deleteManager: DeleteManager) => {
      const deleteManagerDto =
        transformDeleteManagerToDeleteManagerDto(deleteManager);
      return ManagerService.deleteManagerMutation({
        deleteManagerDto,
      });
    },

    onMutate: async (variables) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ManagerQueries.keys.root }),
        onMutate?.(variables),
      ]);
    },

    onSuccess: async (response, variables, context) => {
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
