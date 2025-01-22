import { z } from "zod";
import { CreateEmailDTO } from "../apis/communication_manager/api.ts";

export const createEmailSchema = z.object({
  recipient: z.string().min(1).max(255),
  subject: z.string().min(1).max(255),
  body: z.string().min(1).max(255),
}) satisfies z.ZodType<CreateEmailDTO>;
