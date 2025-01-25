import { CustomerFilters } from "../../apis/crm/api.ts";
import { useForm } from "react-hook-form";

export default function useCustomerFiltersForm(filters: CustomerFilters) {
  const form = useForm({ defaultValues: filters });

  return { form };
}
