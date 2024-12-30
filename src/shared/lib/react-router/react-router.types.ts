import { z } from "zod";
import {
  CommonPageArgsSchema,
  UsernamePageParamsSchema,
} from "./react-router.contracts";

export type UsernamePageParams = z.infer<typeof UsernamePageParamsSchema>;
export type CommonPageData = z.infer<typeof CommonPageArgsSchema>;
