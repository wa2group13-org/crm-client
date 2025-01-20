import { z } from "zod";
import {
  ChangeMessagePriorityDTO,
  ChangeMessagePriorityDTOPriorityEnum,
} from "../apis/crm/api.ts";

export const messagePrioritySchema = z.object({
  priority: z.nativeEnum(ChangeMessagePriorityDTOPriorityEnum),
}) satisfies z.ZodType<ChangeMessagePriorityDTO>;
