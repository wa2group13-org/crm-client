import { z } from "zod";
import {
  CreateJobOfferDTO,
  CreateJobOfferDTOStatusEnum,
} from "../apis/crm/api.ts";

export const jobOfferSchema = z.object({
  description: z.string().min(1).max(255),
  duration: z.number().positive(),
  customerId: z.number(),
  status: z.nativeEnum(CreateJobOfferDTOStatusEnum),
  skills: z
    .array(
      z.object({
        value: z.string().min(1).max(255),
      }),
    )
    .max(100),
});

export type JobOfferSchema = z.infer<typeof jobOfferSchema>;

export function jobOfferToSchema(jobOffer: CreateJobOfferDTO): JobOfferSchema {
  return {
    ...jobOffer,
    skills: [...jobOffer.skills].map((s) => ({ value: s })),
  };
}

export function schemaToJobOffer(schema: JobOfferSchema): CreateJobOfferDTO {
  return {
    ...schema,
    skills: new Set(schema.skills.map((s) => s.value)),
  };
}
