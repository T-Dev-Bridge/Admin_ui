import { z } from "zod";
import { ManagerDtoSchema } from "@/shared/api/admin";

export const DeleteManagerSchema = ManagerDtoSchema;
export type DeleteManager = z.infer<typeof DeleteManagerSchema>;
