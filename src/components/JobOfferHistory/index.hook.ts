import {
  JobOfferHistoryDTO,
  ProfessionalControllerApi,
} from "../../apis/crm/api.ts";
import { useQueries } from "@tanstack/react-query";
import { professionalKey } from "../../query/query-keys.ts";

export default function useJobOfferHistory(history: JobOfferHistoryDTO[]) {
  const professionalApi = new ProfessionalControllerApi();
  const professionalIds = history
    .filter((item) => item.assignedProfessional != null)
    .map((item) => item.assignedProfessional!);

  const idsIndex = professionalIds.reduce(
    (p: { [key: number]: number }, c, index) => {
      p[c] = index;
      return p;
    },
    {},
  );

  const professionals = useQueries({
    queries: professionalIds.map((id) => ({
      queryKey: professionalKey(id),
      queryFn: () =>
        professionalApi.getProfessional(id).then((res) => res.data),
    })),
  });

  function getProfessional(professionalId: number) {
    return professionals[idsIndex[professionalId]];
  }

  return { getProfessional };
}
