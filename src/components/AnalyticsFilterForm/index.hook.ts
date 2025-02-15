import { GenericFilterDTO } from "../../apis/crm-analytics/api.ts";
import { useForm } from "react-hook-form";

export default function useAnalyticsFilterForm({
  filters,
}: {
  filters?: GenericFilterDTO;
}) {
  const form = useForm({ defaultValues: filters });

  return { form };
}
