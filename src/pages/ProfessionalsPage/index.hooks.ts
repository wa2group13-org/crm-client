import { useEffect, useState } from "react";
import { ProfessionalControllerApi } from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import { professionalsKey } from "../../query/query-keys.ts";
import { useLocation, useSearchParams } from "react-router-dom";

export default function useProfessionalsPage() {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const professionalApi = new ProfessionalControllerApi();
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

  // Fetch professionals from the server
  const professionals = useQuery({
    queryKey: professionalsKey({ page, limit }),
    queryFn: async () => {
      const res = await professionalApi.getProfessionals(page - 1, limit, {});
      // Too bad JSON only has arrays, from the web request the skills
      // need to be cast again to a `Set`, this is because the field
      // is an array :(
      res.data.content?.forEach((p) => (p.skills = new Set(p.skills)));
      return res.data;
    },
  });

  function setPageState(page: number) {
    setSearchParams({ page: `${page}` });
  }

  return { page, setPage: setPageState, limit, professionals };
}
