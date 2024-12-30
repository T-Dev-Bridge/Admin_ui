import { z } from "zod";
import { SessionSchema } from "./session.contracts";

export type Session = z.infer<typeof SessionSchema>;
