import { JobOfferControllerApi } from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import { jobOffersKey } from "../../query/query-keys.ts";
import { useSearch } from "../../hooks/useSearch.ts";

export default function useJobOffersPage() {
  const {
    params: { page },
    setParams,
  } = useSearch({ page: 1 } as { page: number });
  const jobOfferApi = new JobOfferControllerApi();

  const limit = 10;

  // Fetch customers from the server
  const jobOffers = useQuery({
    queryKey: jobOffersKey({ page: page - 1, limit }),
    queryFn: async () => {
      const res = await jobOfferApi.getJobOffers({ page: page - 1, limit });
      return res.data;
    },
  });

  function setPageState(page: number) {
    setParams("page", page);
  }

  return { page, setPage: setPageState, limit, jobOffers };
}
