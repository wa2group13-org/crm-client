import { useState } from "react";
import { ProfessionalControllerApi } from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";

export default function useProfessionalsPage() {
  const professionalApi = new ProfessionalControllerApi();

  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch professionals from the server
  const professionals = useQuery({
    queryKey: ["test", { page }],
    queryFn: async () => {
      const res = await professionalApi.getProfessionals(page - 1, limit, {});
      return res.data;
    },
  });

  return { page, setPage, limit, professionals };
}
