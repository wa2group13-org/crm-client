import { MessageControllerApi } from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { messagesKey } from "../../query/query-keys.ts";

export default function useMessagesPage() {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const location = useLocation();
  const messageApi = new MessageControllerApi();

  function getPage() {
    const page = Number.parseInt(searchParams.get("page") || "1");

    if (isNaN(page)) {
      return 1;
    }

    return page;
  }

  const [page, setPage] = useState(getPage());
  const limit = 10;

  // When the URL updates, also updated the page
  useEffect(() => {
    setPage(getPage());
  }, [location]);

  function setPageParam(page: number) {
    setSearchParams({ page: `${page}` });
  }

  const messagesQuery = useQuery({
    queryKey: messagesKey({ page: page - 1, limit }),
    queryFn: () =>
      messageApi.getMessages(page - 1, limit).then((res) => res.data),
  });

  return { messagesQuery, page, limit, setPage: setPageParam };
}
