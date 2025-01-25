import { useForm } from "react-hook-form";
import { ChangeMessageStatusDTO, MessageDTO } from "../../apis/crm/api.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeMessageStatusSchema } from "../../schemas/changeMessageStatusSchema.ts";
import { nextMessageStatus } from "../../machine/messageStatusStateMachine.ts";

export function useMessageStatusForm(message: MessageDTO) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChangeMessageStatusDTO>({
    defaultValues: {
      status: nextMessageStatus(message.status)[0],
    },
    resolver: zodResolver(changeMessageStatusSchema),
  });

  return {
    register,
    handleSubmit,
    errors,
    control,
    availableStatus: nextMessageStatus(message.status),
  };
}
