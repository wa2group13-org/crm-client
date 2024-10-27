import { z, ZodType } from "zod";
import {
  CreateContactDTO,
  CreateContactDTOCategoryEnum,
} from "../apis/crm/api.ts";

export const contactSchema = z.object({
  name: z.string().min(1).max(255),
  surname: z.string().min(1).max(255),
  ssn: z.string().min(1).max(255).optional(),
  category: z.nativeEnum(CreateContactDTOCategoryEnum),
  addresses: z
    .array(
      z.object({
        city: z.string().min(1).max(255),
        civic: z.string().min(1).max(255),
        postalCode: z.string().min(1).max(255),
        street: z.string().min(1).max(255),
      }),
    )
    .max(100),
  emails: z
    .array(
      z.object({
        email: z.string().email(),
      }),
    )
    .max(100),
  telephones: z
    .array(
      z.object({
        number: z
          .string()
          .regex(/^(\+\d{1,3}( )?)?((\(\d{3}\))|\d{3})[- .]?\d{3}[- .]?\d{4}$/),
      }),
    )
    .max(100),
}) satisfies ZodType<CreateContactDTO>;
