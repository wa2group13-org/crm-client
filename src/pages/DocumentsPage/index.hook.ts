import { DocumentControllerApi } from "../../apis/document_store/api.ts";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "../../hooks/useSearch.ts";
import { documentsKey } from "../../query/query-keys.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useDocumentsPage() {
  const {
    params: { page },
    setParams,
  } = useSearch({ page: 0 } as { page: number });
  const navigate = useNavigate();
  const documentApi = new DocumentControllerApi();

  const limit = 10;

  const documentsQuery = useQuery({
    queryKey: documentsKey({ page, limit }),
    queryFn: async () =>
      documentApi.getAllDocuments(page, limit).then((res) => res.data),
  });

  useEffect(() => {
    if (
      documentsQuery.data?.totalPages != null &&
      documentsQuery.data.totalPages < page
    )
      setParams("page", documentsQuery.data.totalPages);
  }, [documentsQuery.data]);

  function setPage(page: number) {
    setParams("page", page - 1);
  }

  function onAddClick() {
    navigate(`/ui/documents/create`);
  }

  return { documentsQuery, page: page + 1, limit, setPage, onAddClick };
}
