import { JobOfferControllerApi, JobOfferFilters } from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import { jobOffersKey } from "../../query/query-keys.ts";
import { useSearch } from "../../hooks/useSearch.ts";
import { useIsLogin } from "../../hooks/useIsLogin.ts";

export default function useJobOffersPage() {
  const {
    params: { page, filters },
    setParams,
  } = useSearch({ page: 1, filters: {} } as {
    page: number;
    filters: JobOfferFilters;
  });
  const jobOfferApi = new JobOfferControllerApi();
  const isLogin = useIsLogin();

  const limit = 10;

  // Fetch customers from the server
  const jobOffers = useQuery({
    queryKey: jobOffersKey({ page: page - 1, limit, filters }),
    queryFn: async () => {
      const res = await jobOfferApi.getJobOffers({
        page: page - 1,
        limit,
        filters,
      });
      return res.data;
    },
  });

  function setPageState(page: number) {
    setParams("page", page);
  }

  function setFilters(filters: JobOfferFilters) {
    const newFilters: JobOfferFilters = {};

    if (filters.byStatus) newFilters.byStatus = filters.byStatus;

    setParams("filters", newFilters);
  }

  return {
    page,
    setPage: setPageState,
    limit,
    jobOffers,
    isLogin,
    filters,
    setFilters,
  };
}
