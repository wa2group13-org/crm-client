import { CustomerControllerApi, JobOfferDTO } from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import { customerKey } from "../../query/query-keys.ts";

export default function useJobOfferListItem(jobOffer: JobOfferDTO) {
  const customerApi = new CustomerControllerApi();

  const customerQuery = useQuery({
    queryKey: customerKey(jobOffer.customerId),
    queryFn: async () =>
      customerApi.getCustomerById(jobOffer.customerId).then((res) => res.data),
  });

  return { customerQuery };
}
