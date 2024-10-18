"use strict";

import { useQuery } from "@tanstack/react-query";
import { ProfessionalControllerApi } from "../../apis/crm/api.ts";
import { PROFESSIONAL_KEY } from "../../query/query-keys.ts";

export default function usePersonalInformation(professionalId: number) {
  const professionalApi = new ProfessionalControllerApi();

  const professional = useQuery({
    queryKey: [PROFESSIONAL_KEY, { professionalId }],
    queryFn: async () => {
      const res = await professionalApi.getProfessional(professionalId);
      return res.data;
    },
  });

  return { professional };
}
