import {
  CustomerControllerApi,
  CustomerFilters,
  LocationFilter,
} from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import { customersKey } from "../../query/query-keys.ts";
import { useIsLogin } from "../../hooks/useIsLogin.ts";
import { useSearch } from "../../hooks/useSearch.ts";
import { useEffect } from "react";

export default function useCustomersPage() {
  const {
    params: { page, filters },
    setParams,
  } = useSearch({ page: 0, filters: {} } as {
    page: number;
    filters: CustomerFilters;
  });
  const customerApi = new CustomerControllerApi();
  const isLogin = useIsLogin();

  const limit = 10;

  // Fetch customers from the server
  const customers = useQuery({
    queryKey: customersKey({ page, limit, filters }),
    queryFn: async () => {
      const res = await customerApi.getCustomers(page, limit, filters);
      return res.data;
    },
  });

  useEffect(() => {
    if (customers.data?.totalPages != null && customers.data.totalPages < page)
      setParams("page", customers.data.totalPages);
  }, [customers.data]);

  function setPageState(page: number) {
    setParams("page", page - 1);
  }

  function setFilters(filters: CustomerFilters) {
    const newFilters: CustomerFilters = {};

    const loc = (s: keyof LocationFilter) => {
      if (filters.byLocation?.[s]) {
        newFilters["byLocation"] = {};
        newFilters["byLocation"][s] = filters.byLocation[s];
      }
    };

    if (filters.byFullName) newFilters["byFullName"] = filters.byFullName;

    loc("byCity");
    loc("byCivic");
    loc("byCountry");
    loc("byPostalCode");
    loc("byStreet");

    setParams("filters", newFilters);
  }

  return {
    page: page + 1,
    setPage: setPageState,
    limit,
    customers,
    isLogin,
    filters,
    setFilters,
  };
}
