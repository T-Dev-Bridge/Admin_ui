import { z } from "zod";
import {
  LoginResponseWithTokenDtoSchema,
  LoginUserDtoSchema,
  UserDtoSchema,
} from "./auth.contract";

export type UserDto = z.infer<typeof UserDtoSchema>;
export type LoginUserDto = z.infer<typeof LoginUserDtoSchema>;
export type LoginResponseWithTokenDto = z.infer<
  typeof LoginResponseWithTokenDtoSchema
>;
