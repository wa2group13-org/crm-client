import {
  GetMessagesSortByEnum,
  MessageControllerApi,
} from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import { messagesKey } from "../../query/query-keys.ts";
import { useSearch } from "../../hooks/useSearch.ts";

export default function useMessagesPage() {
  const {
    params: { page },
    setParams,
  } = useSearch({ page: 1, sort: GetMessagesSortByEnum.DateDesc } as {
    page: number;
  });
  const messageApi = new MessageControllerApi();

  const limit = 10;

  function setPageParam(page: number) {
    setParams("page", page);
  }

  const messagesQuery = useQuery({
    queryKey: messagesKey({ page: page - 1, limit }),
    queryFn: () =>
      messageApi.getMessages(page - 1, limit).then((res) => res.data),
  });

  return { messagesQuery, page, limit, setPage: setPageParam };
}
