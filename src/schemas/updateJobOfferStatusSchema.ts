import { z } from "zod";
import {
  UpdateJobOfferStatusDTO,
  UpdateJobOfferStatusDTOStatusEnum,
} from "../apis/crm/api.ts";

export const updateJobOfferStatusSchema = z.object({
  status: z.nativeEnum(UpdateJobOfferStatusDTOStatusEnum),
  professionalId: z.number().optional(),
  note: z.string().min(1).max(1000),
}) satisfies z.ZodType<UpdateJobOfferStatusDTO>;
