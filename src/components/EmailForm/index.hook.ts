import { useForm } from "react-hook-form";
import { CreateEmailDTO } from "../../apis/communication_manager/api.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEmailSchema } from "../../schemas/createEmailSchema.ts";

export default function useEmailForm(defaultMessage?: CreateEmailDTO) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateEmailDTO>({
    defaultValues: defaultMessage,
    resolver: zodResolver(createEmailSchema),
  });

  return { register, errors, handleSubmit, control };
}
