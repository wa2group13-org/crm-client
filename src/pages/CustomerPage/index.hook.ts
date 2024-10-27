import { useNavigate, useParams } from "react-router-dom";
import { CustomerControllerApi, JobOfferDTO } from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import { CUSTOMER_KEY } from "../../query/query-keys.ts";

export default function useCustomerPage() {
  const { customerId } = useParams();
  if (!customerId) throw new Error("No customerId provided");
  const customerIdNumber = Number.parseInt(customerId);
  const navigate = useNavigate();

  const customerApi = new CustomerControllerApi();

  const customer = useQuery({
    queryKey: [CUSTOMER_KEY, { customerIdNumber }],
    queryFn: async () => {
      const res = await customerApi.getCustomerById(customerIdNumber);
      return res.data;
    },
  });

  function onJobOfferClick(jobOffer: JobOfferDTO) {
    navigate(`jobs/${jobOffer.id}`);
  }

  return { customerId: customerIdNumber, customer, onJobOfferClick };
}
