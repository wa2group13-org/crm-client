import { z } from "zod";
import { CreateCustomerDTO } from "../apis/crm/api.ts";

export const customerSchema = z.object({
  note: z.string().min(1).max(5000),
  contactId: z.number(),
}) satisfies z.ZodType<CreateCustomerDTO>;
