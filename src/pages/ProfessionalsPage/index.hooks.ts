import {
  LocationFilter,
  ProfessionalControllerApi,
  ProfessionalFilters,
} from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import { professionalsKey } from "../../query/query-keys.ts";
import { useSearch } from "../../hooks/useSearch.ts";
import { useIsLogin } from "../../hooks/useIsLogin.ts";
import { useEffect } from "react";

export default function useProfessionalsPage() {
  const isLogin = useIsLogin();
  const {
    params: { page, filters },
    setParams,
  } = useSearch({ page: 0, filters: {} } as {
    page: number;
    filters: ProfessionalFilters;
  });
  const professionalApi = new ProfessionalControllerApi();

  const limit = 10;

  function setPageState(page: number) {
    setParams("page", page - 1);
  }

  function setFilters(filters: ProfessionalFilters) {
    const newFilters: ProfessionalFilters = {};

    const loc = (s: keyof LocationFilter) => {
      if (filters.byLocation?.[s]) {
        newFilters["byLocation"] = {};
        newFilters["byLocation"][s] = filters.byLocation[s];
      }
    };

    if (filters.bySkills?.length !== 0)
      newFilters["bySkills"] = filters.bySkills;

    if (filters.byEmploymentState)
      newFilters["byEmploymentState"] = filters.byEmploymentState;

    if (filters.byFullName) newFilters["byFullName"] = filters.byFullName;

    loc("byCity");
    loc("byCivic");
    loc("byCountry");
    loc("byPostalCode");
    loc("byStreet");

    setParams("filters", newFilters);
  }

  // Fetch professionals from the server
  const professionals = useQuery({
    queryKey: professionalsKey({ page, limit, filters }),
    queryFn: async () => {
      const res = await professionalApi.getProfessionals(page, limit, filters);
      // Too bad JSON only has arrays, from the web request the skills
      // need to be cast again to a `Set`, this is because the field
      // is an array :(
      res.data.content?.forEach((p) => (p.skills = new Set(p.skills)));
      return res.data;
    },
  });

  useEffect(() => {
    if (
      professionals.data?.totalPages != null &&
      professionals.data.totalPages < page
    )
      setParams("page", professionals.data.totalPages);
  }, [professionals.data]);

  return {
    page: page + 1,
    setPage: setPageState,
    limit,
    professionals,
    isLogin,
    filters,
    setFilters,
  };
}
