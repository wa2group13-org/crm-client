import {
  ChangeMessagePriorityDTO,
  MessageControllerApi,
  MessageDTO,
} from "../../apis/crm/api.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messageHistoryKey, messageKey } from "../../query/query-keys.ts";
import { BaseSyntheticEvent } from "react";

export default function useMessagePriorityDialog(
  message: MessageDTO,
  onSubmit: () => void,
) {
  const messageApi = new MessageControllerApi();
  const queryClient = useQueryClient();

  const messagePriorityMutation = useMutation({
    mutationKey: messageKey(message.id),
    mutationFn: (data: ChangeMessagePriorityDTO) =>
      messageApi
        .changeMessagePriority(message.id, data)
        .then((res) => res.data),
    onSuccess: async (data) => {
      queryClient.setQueryData(messageKey(message.id), data);
      await queryClient.invalidateQueries({
        queryKey: messageHistoryKey(message.id),
      });
    },
  });

  async function onPrioritySubmit(
    update: ChangeMessagePriorityDTO,
    event?: BaseSyntheticEvent,
  ) {
    event?.preventDefault();
    await messagePriorityMutation.mutateAsync(update);
    messagePriorityMutation.reset();
    onSubmit();
  }

  return {
    error: messagePriorityMutation.error,
    isPending: messagePriorityMutation.isPending,
    onPrioritySubmit,
  };
}
