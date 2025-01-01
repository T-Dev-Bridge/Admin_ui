import { z } from "zod";
import { FilterQuerySchema, order, searchOp } from "./common.contracts";

export type SearchOp = z.infer<typeof searchOp>;
export type Order = z.infer<typeof order>;
export type FilterQuery = z.infer<typeof FilterQuerySchema>;
