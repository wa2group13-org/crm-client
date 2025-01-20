import { MessageControllerApi, MessageDTO } from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import { messageHistoryKey } from "../../query/query-keys.ts";

export default function useMessageHistory(message: MessageDTO) {
  const messageApi = new MessageControllerApi();

  const messageHistoryQuery = useQuery({
    queryKey: messageHistoryKey(message.id),
    queryFn: () =>
      messageApi.getMessageHistory(message.id).then((res) => res.data),
  });

  return { messageHistoryQuery };
}
