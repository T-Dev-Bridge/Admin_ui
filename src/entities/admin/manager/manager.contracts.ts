import { z } from "zod";
import { ManagerDtoSchema } from "@/shared/api/admin/manager";
import { BaseReseponsePaginationDtoSchema } from "@/shared/api/base/base.contracts";
import { BaseSchema } from "@/entities/base/base.contracts";

export const ManagerSchema = BaseSchema.extend({
  id: z.string(),
  username: z.string(),
  password: z.string().optional(),
  email: z.string(),
  pwdId: z.number().optional(),
  roleId: z.string().optional(),
  enabled: z.boolean(),
});

export const ManagersSchema = z.object({
  list: z.array(ManagerDtoSchema),
  pagination: BaseReseponsePaginationDtoSchema,
});
