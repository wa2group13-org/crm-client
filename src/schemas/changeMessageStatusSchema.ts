import { z } from "zod";
import {
  ChangeMessageStatusDTO,
  ChangeMessageStatusDTOStatusEnum,
} from "../apis/crm/api.ts";

export const changeMessageStatusSchema = z.object({
  status: z.nativeEnum(ChangeMessageStatusDTOStatusEnum),
  comment: z.string().min(1).optional(),
}) satisfies z.ZodType<ChangeMessageStatusDTO>;
