import {
  ChangeMessageStatusDTO,
  MessageControllerApi,
  MessageDTO,
} from "../../apis/crm/api.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messageHistoryKey, messageKey } from "../../query/query-keys.ts";
import { BaseSyntheticEvent } from "react";

export default function useMessageStatusDialog(
  message: MessageDTO,
  onSubmit: () => void,
) {
  const messageApi = new MessageControllerApi();
  const queryClient = useQueryClient();

  const messageStatusMutation = useMutation({
    mutationKey: messageKey(message.id),
    mutationFn: (data: ChangeMessageStatusDTO) =>
      messageApi.changeMessageStatus(message.id, data).then((res) => res.data),
    onSuccess: async (data) => {
      queryClient.setQueryData(messageKey(message.id), data);
      await queryClient.invalidateQueries({
        queryKey: messageHistoryKey(message.id),
      });
    },
  });

  async function onStatusSubmit(
    update: ChangeMessageStatusDTO,
    event?: BaseSyntheticEvent,
  ) {
    event?.preventDefault();
    await messageStatusMutation.mutateAsync(update);
    messageStatusMutation.reset();
    onSubmit();
  }

  return {
    error: messageStatusMutation.error,
    isPending: messageStatusMutation.isPending,
    onStatusSubmit,
  };
}
