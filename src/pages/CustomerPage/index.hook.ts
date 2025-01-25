import { useNavigate, useParams } from "react-router-dom";
import { CustomerControllerApi, JobOfferDTO } from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import { customerKey } from "../../query/query-keys.ts";
import { useIsLogin } from "../../hooks/useIsLogin.ts";

export default function useCustomerPage() {
  const { customerId } = useParams();
  if (!customerId) throw new Error("No customerId provided");
  const customerIdNumber = Number.parseInt(customerId);
  const navigate = useNavigate();
  const isLogin = useIsLogin();

  const customerApi = new CustomerControllerApi();

  const customer = useQuery({
    queryKey: customerKey(customerIdNumber),
    queryFn: async () => {
      const res = await customerApi.getCustomerById(customerIdNumber);
      return res.data;
    },
  });

  function onJobOfferClick(jobOffer: JobOfferDTO) {
    navigate(`/ui/jobs/${jobOffer.id}`);
  }

  function onJobOfferAdd() {
    navigate("/ui/jobs/create", { state: { customer: customer.data } });
  }

  return {
    customerId: customerIdNumber,
    customer,
    onJobOfferClick,
    onJobOfferAdd,
    isLogin,
  };
}
