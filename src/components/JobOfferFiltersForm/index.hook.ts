import { useForm } from "react-hook-form";
import { JobOfferFilters } from "../../apis/crm/api.ts";

export default function useJobOfferFiltersForm({
  filters,
}: {
  filters?: JobOfferFilters;
}) {
  const form = useForm({
    defaultValues: filters,
  });

  return { form };
}
