import { z } from "zod";
import {
  CreateManagerDtoSchema,
  DeleteManagerDtoSchema,
  ManagerDtoSchema,
  ManagersDtoSchema,
  ManagersParamsDtoSchema,
  UpdateManagerDtoSchema,
} from "@/shared/api/admin/manager/manager.contracts";

export type ManagerDto = z.infer<typeof ManagerDtoSchema>;
export type ManagersDto = z.infer<typeof ManagersDtoSchema>;
export type ManagerParamsDto = z.infer<typeof ManagersParamsDtoSchema>;
export type CreateManagerDto = z.infer<typeof CreateManagerDtoSchema>;
export type UpdateManagerDto = z.infer<typeof UpdateManagerDtoSchema>;
export type DeleteManagerDto = z.infer<typeof DeleteManagerDtoSchema>;
