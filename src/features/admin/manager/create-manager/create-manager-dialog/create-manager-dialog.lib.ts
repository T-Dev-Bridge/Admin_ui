import { CreateManagerDto } from "@/shared/api/admin";
import { CreateManager } from "./create-manager-dialog.contracts";

/**
 * UI Form 데이터 -> BackEnd 에서 요구하는 Body 데이터로 변환
 */
export function transformCreateManagerToCreateManagerDto(
  manager: CreateManager,
): CreateManagerDto {
  return {
    id: manager.id,
    username: manager.username,
    password: manager.password,
    email: manager.email,
    roleId: manager.roleId,
    enabled: true,
  };
}
