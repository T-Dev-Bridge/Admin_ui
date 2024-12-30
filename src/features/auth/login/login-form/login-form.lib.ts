import { authTypesDto } from "@/shared/api/auth";
import { Login } from "./login-form.contract";

export function transformLoginToLoginDto(
  login: Login,
): authTypesDto.LoginUserDto {
  return {
    ...login,
  };
}
