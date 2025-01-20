import { ChangeMessagePriorityDTO, MessageDTO } from "../../apis/crm/api.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messagePrioritySchema } from "../../schemas/changeMessagePrioritySchema.ts";

export default function useMessagePriorityForm(defaultMessage: MessageDTO) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChangeMessagePriorityDTO>({
    defaultValues: {
      priority: defaultMessage.priority,
    },
    resolver: zodResolver(messagePrioritySchema),
  });

  return { register, handleSubmit, errors, control };
}
