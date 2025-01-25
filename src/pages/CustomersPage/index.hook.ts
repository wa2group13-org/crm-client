import { useLocation, useSearchParams } from "react-router-dom";
import { CustomerControllerApi } from "../../apis/crm/api.ts";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { customersKey } from "../../query/query-keys.ts";
import { useIsLogin } from "../../hooks/useIsLogin.ts";

export default function useCustomersPage() {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const customerApi = new CustomerControllerApi();
  const location = useLocation();
  const isLogin = useIsLogin();

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
    queryKey: customersKey({ page, limit }),
    queryFn: async () => {
      const res = await customerApi.getCustomers(page - 1, limit, {});
      return res.data;
    },
  });

  function setPageState(page: number) {
    setSearchParams({ page: `${page}` });
  }

  return { page, setPage: setPageState, limit, customers, isLogin };
}
