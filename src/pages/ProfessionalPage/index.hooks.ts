import {
  ProfessionalControllerApi,
  ProfessionalDTO,
} from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import { professionalKey } from "../../query/query-keys.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useIsLogin } from "../../hooks/useIsLogin.ts";
import { CreateProfessionalLocationType } from "../CreateProfessionalPage/index.hook.ts";

export default function useProfessionalPage() {
  const { professionalId } = useParams();
  const isLogin = useIsLogin();
  const navigate = useNavigate();
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

  function onUpdateClick(professional: ProfessionalDTO) {
    const state: CreateProfessionalLocationType = {
      professional: professional,
      contact: professional.contact,
      update: true,
    };

    navigate(`/ui/professionals/${professional.id}/update`, { state });
  }

  return {
    professionalId: professionalIdNumber,
    professional,
    isLogin,
    onUpdateClick,
  };
}
