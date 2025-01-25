import { useForm } from "react-hook-form";
import { ProfessionalFilters } from "../../apis/crm/api.ts";

export default function useProfessionalFilters(filters: ProfessionalFilters) {
  const form = useForm<ProfessionalFilters>({
    defaultValues: { ...filters },
  });

  return { form };
}
