import { ProfessionalControllerApi } from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import { professionalsKey } from "../../query/query-keys.ts";
import { useSearch } from "../../hooks/useSearch.ts";
import { useIsLogin } from "../../hooks/useIsLogin.ts";

export default function useProfessionalsPage() {
  const isLogin = useIsLogin();
  const {
    params: { page },
    setParams,
  } = useSearch({ page: 1 } as { page: number });
  const professionalApi = new ProfessionalControllerApi();

  const limit = 10;

  function setPageState(page: number) {
    setParams("page", page);
  }

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

  return { page, setPage: setPageState, limit, professionals, isLogin };
}
