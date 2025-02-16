import { JobOfferControllerApi, JobOfferFilters } from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import { jobOffersKey } from "../../query/query-keys.ts";
import { useSearch } from "../../hooks/useSearch.ts";
import { useIsLogin } from "../../hooks/useIsLogin.ts";

export default function useJobOffersPage() {
  const {
    params: { page, filters },
    setParams,
  } = useSearch({ page: 0, filters: {} } as {
    page: number;
    filters: JobOfferFilters;
  });
  const jobOfferApi = new JobOfferControllerApi();
  const isLogin = useIsLogin();

  const limit = 10;

  // Fetch customers from the server
  const jobOffers = useQuery({
    queryKey: jobOffersKey({ page, limit, filters }),
    queryFn: async () => {
      const res = await jobOfferApi.getJobOffers({
        page,
        limit,
        filters,
      });
      return res.data;
    },
  });

  function setPageState(page: number) {
    setParams("page", page - 1);
  }

  function setFilters(filters: JobOfferFilters) {
    const newFilters: JobOfferFilters = {};

    if (filters.byStatus) newFilters.byStatus = filters.byStatus;

    setParams("filters", newFilters);
  }

  return {
    page: page + 1,
    setPage: setPageState,
    limit,
    jobOffers,
    isLogin,
    filters,
    setFilters,
  };
}
