import { z } from "zod";
import {
  ManagerSchema,
  ManagersSchema,
} from "@/entities/admin/manager/manager.contracts";

export type Manager = z.infer<typeof ManagerSchema>;
export type Managers = z.infer<typeof ManagersSchema>;
