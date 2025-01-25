import { useNavigate, useParams } from "react-router-dom";
import {
  CustomerControllerApi,
  CustomerDTO,
  JobOfferControllerApi,
  ProfessionalControllerApi,
  ProfessionalDTO,
} from "../../apis/crm/api.ts";
import { useQuery } from "@tanstack/react-query";
import {
  customerKey,
  jobOfferKey,
  professionalKey,
} from "../../query/query-keys.ts";
import { useIsLogin } from "../../hooks/useIsLogin.ts";

export default function useJobOfferPage() {
  const { jobOfferId } = useParams();
  if (!jobOfferId) throw new Error("No professionalId provided");

  const jobOfferIdNumber = Number.parseInt(jobOfferId);

  const jobOfferApi = new JobOfferControllerApi();
  const professionalApi = new ProfessionalControllerApi();
  const customerApi = new CustomerControllerApi();

  const navigate = useNavigate();
  const isLogin = useIsLogin();

  const jobOffer = useQuery({
    queryKey: jobOfferKey(jobOfferIdNumber),
    queryFn: async () => {
      const res = await jobOfferApi.getJobOfferById(jobOfferIdNumber);
      return res.data;
    },
  });

  const professionalId = jobOffer.data?.professionalId;

  const professional = useQuery({
    queryKey: professionalKey(professionalId ?? null),
    queryFn: async () => {
      if (professionalId == null) return null;

      const res = await professionalApi.getProfessional(professionalId);
      return res.data;
    },
    enabled: !jobOffer.isPending,
  });

  const customerId = jobOffer.data?.customerId;

  const customer = useQuery({
    queryKey: customerKey(customerId!),
    queryFn: async () => {
      const res = await customerApi.getCustomerById(customerId!);
      return res.data;
    },
    enabled: !!customerId,
  });

  function onProfessionalClick(professional: ProfessionalDTO) {
    navigate(`/ui/professionals/${professional.id}`);
  }

  function onCustomerClick(customer: CustomerDTO) {
    navigate(`/ui/customers/${customer.id}`);
  }

  return {
    jobOfferId: jobOfferIdNumber,
    jobOffer,
    professional,
    customer,
    onProfessionalClick,
    onCustomerClick,
    isLogin,
  };
}
