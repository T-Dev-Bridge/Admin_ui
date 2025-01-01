import { z } from "zod";
import {
  BaseReseponsePaginationDtoSchema,
  PageParamsDtoSchema,
} from "@/shared/api/common/common.contracts";
import { CommonSchema } from "@/entities/common/common.contracts";

export const ManagerDtoSchema = CommonSchema.extend({
  id: z.string(),
  username: z.string(),
  password: z.string().optional(),
  email: z.string(),
  pwdId: z.number().optional(),
  roleId: z.number().optional(),
  enabled: z.boolean(),
});

export const ManagersDtoSchema = z.object({
  list: z.array(ManagerDtoSchema),
  pagination: BaseReseponsePaginationDtoSchema,
});

export const FilterParamsDtoSchema = z.object({});

export const ManagersParamsDtoSchema = z.intersection(
  PageParamsDtoSchema,
  FilterParamsDtoSchema,
);

export const CreateManagerDtoSchema = ManagerDtoSchema;
export const UpdateManagerDtoSchema = ManagerDtoSchema;
export const DeleteManagerDtoSchema = ManagerDtoSchema;
