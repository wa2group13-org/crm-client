import { ProfessionalControllerApi } from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import { professionalKey } from "../../query/query-keys.ts";
import { useParams } from "react-router-dom";

export default function useProfessionalPage() {
  const { professionalId } = useParams();
  if (!professionalId) throw new Error("No professionalId provided");
  const professionalIdNumber = Number.parseInt(professionalId);

  const professionalApi = new ProfessionalControllerApi();

  const professional = useQuery({
    queryKey: professionalKey(professionalIdNumber),
    queryFn: async () => {
      const res = await professionalApi.getProfessional(professionalIdNumber);
      return res.data;
    },
  });

  return { professionalId: professionalIdNumber, professional };
}
