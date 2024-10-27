import { CreateContactDTO } from "../../apis/crm/api.ts";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../../schemas/contactSchema.ts";

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
