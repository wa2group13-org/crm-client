import {
  GetMessagesSortByEnum,
  MessageControllerApi,
} from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import { messagesKey } from "../../query/query-keys.ts";
import { useSearch } from "../../hooks/useSearch.ts";

export default function useMessagesPage() {
  const {
    params: { page, sortBy },
    setParams,
  } = useSearch({ page: 1, sortBy: GetMessagesSortByEnum.DateDesc } as {
    page: number;
    sortBy: GetMessagesSortByEnum;
  });
  const messageApi = new MessageControllerApi();

  const limit = 10;

  const messagesQuery = useQuery({
    queryKey: messagesKey({ page: page - 1, limit, sortBy }),
    queryFn: () =>
      messageApi.getMessages(page - 1, limit, sortBy).then((res) => res.data),
  });

  function setPageParam(page: number) {
    setParams("page", page);
  }

  function setSortBy(sort: GetMessagesSortByEnum) {
    setParams("sortBy", sort);
  }

  return {
    messagesQuery,
    page,
    limit,
    sortBy,
    setSortBy,
    setPage: setPageParam,
  };
}
