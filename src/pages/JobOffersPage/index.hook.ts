import { useLocation, useSearchParams } from "react-router-dom";
import { JobOfferControllerApi } from "../../apis/crm/api.ts";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { jobOffersKey } from "../../query/query-keys.ts";

export default function useJobOffersPage() {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const jobOfferApi = new JobOfferControllerApi();
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
  const jobOffers = useQuery({
    queryKey: jobOffersKey({ page: page - 1, limit }),
    queryFn: async () => {
      const res = await jobOfferApi.getJobOffers({ page: page - 1, limit });
      return res.data;
    },
  });

  function setPageState(page: number) {
    setSearchParams({ page: `${page}` });
  }

  return { page, setPage: setPageState, limit, jobOffers };
}
