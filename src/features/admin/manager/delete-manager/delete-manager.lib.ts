import { DeleteManagerDto } from "@/shared/api/admin";
import { DeleteManager } from "./delete-manager.contract";

export function transformDeleteManagerToDeleteManagerDto(
  manager: DeleteManager,
): DeleteManagerDto {
  return {
    ...manager,
  };
}
