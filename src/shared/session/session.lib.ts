import { authTypesDto } from "../api/auth";
import { Session } from "./session.types";

export function transformLoginResponseWithTokenDtoToSession(
  loginResponseWithTokenDto: authTypesDto.LoginResponseWithTokenDto,
): Session {
  return {
    userId: loginResponseWithTokenDto.userId,
    username: loginResponseWithTokenDto.username,
    accessToken: loginResponseWithTokenDto.accessToken,
    refreshToken: loginResponseWithTokenDto.refreshToken,
    authorities: loginResponseWithTokenDto.authorities,
  };
}
