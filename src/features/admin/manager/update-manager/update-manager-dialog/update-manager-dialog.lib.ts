import { UpdateManagerDto } from "@/shared/api/admin";
import { UpdateManager } from "./update-manager-dialog.contracts";

/**
 * UI Form 데이터 -> BackEnd 에서 요구하는 Body 데이터로 변환
 */
export function transformUpdateManagerToUpdateManagerDto(
  manager: UpdateManager,
): UpdateManagerDto {
  return {
    id: manager.id,
    username: manager.username,
    email: manager.email,
    roleId: manager.roleId,
    pwdId: manager.pwdId,
    enabled: true,
  };
}
