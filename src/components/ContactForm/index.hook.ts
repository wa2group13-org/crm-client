import { z, ZodType } from "zod";
import {
  CreateContactDTO,
  CreateContactDTOCategoryEnum,
} from "../../apis/crm/api.ts";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

export default function useContactForm(defaultContact?: CreateContactDTO) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateContactDTO>({
    defaultValues: defaultContact ?? { category: "Unknown" },
    resolver: zodResolver(contactSchema),
  });

  const emailFields = useFieldArray({
    control,
    name: "emails",
  });

  const addressFields = useFieldArray({
    control,
    name: "addresses",
  });

  const telephoneFields = useFieldArray({
    control,
    name: "telephones",
  });

  return {
    register,
    handleSubmit,
    errors,
    emailFields,
    addressFields,
    telephoneFields,
    control,
  };
}
