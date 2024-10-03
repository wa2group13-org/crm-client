import { z } from "zod";
import {
  CreateContactDTO,
  CreateContactDTOCategoryEnum,
} from "../../apis/crm/api.ts";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  ssn: z.string().min(1).nullable(),
  category: z.nativeEnum(CreateContactDTOCategoryEnum),
  addresses: z.array(
    z.object({
      city: z.string().min(1),
      civic: z.string().min(1),
      postalCode: z.string().min(1),
      street: z.string().min(1),
    }),
  ),
  emails: z.array(
    z.object({
      email: z.string().email(),
    }),
  ),
  telephones: z.array(
    z.object({
      number: z.string(),
    }),
  ),
});

export default function useContactForm(defaultContact?: CreateContactDTO) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateContactDTO>({
    defaultValues: defaultContact ?? {
      category: "Unknown",
      name: "",
      ssn: "",
      surname: "",
      telephones: [],
      addresses: [],
      emails: [],
    },
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
