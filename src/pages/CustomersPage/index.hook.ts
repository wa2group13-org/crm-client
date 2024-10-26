import { useLocation, useSearchParams } from "react-router-dom";
import { CustomerControllerApi } from "../../apis/crm/api.ts";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CUSTOMERS_KEY } from "../../query/query-keys.ts";

export default function useCustomersPage() {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const customerApi = new CustomerControllerApi();
  const location = useLocation();

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

  // Fetch customers from the server
  const customers = useQuery({
    queryKey: [CUSTOMERS_KEY, { page }],
    queryFn: async () => {
      const res = await customerApi.getCustomers(page, limit);
      return res.data;
    },
  });

  function setPageState(page: number) {
    setSearchParams({ page: `${page}` });
  }

  return { page, setPage: setPageState, limit, customers };
}
