import { z } from "zod";
import { ManagerDtoSchema } from "@/shared/api/admin/manager";
import { BaseResponsePaginationDtoSchema } from "@/shared/api/common";
import { CommonSchema } from "@/entities/common";

export const ManagerSchema = CommonSchema.extend({
  id: z.string(),
  username: z.string(),
  password: z.string().optional(),
  email: z.string(),
  pwdId: z.number().optional(),
  roleId: z.number().optional(),
  enabled: z.boolean(),
});

export const ManagersSchema = z.object({
  list: z.array(ManagerDtoSchema),
  pagination: BaseResponsePaginationDtoSchema,
});
