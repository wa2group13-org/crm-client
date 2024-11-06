import { useLocation, useNavigate } from "react-router-dom";
import {
  CreateJobOfferDTO,
  CustomerDTO,
  JobOfferControllerApi,
} from "../../apis/crm/api.ts";
import { useMutation } from "@tanstack/react-query";
import { jobOfferKey } from "../../query/query-keys.ts";
import { BaseSyntheticEvent, useState } from "react";

export default function useJobOfferCreatePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { customer }: { customer?: CustomerDTO } = state;
  const [jobOffer, setJobOffer] = useState<CreateJobOfferDTO | undefined>();
  const jobOfferApi = new JobOfferControllerApi();

  const jobOfferMutation = useMutation({
    mutationKey: jobOfferKey(null),
    mutationFn: async (data: CreateJobOfferDTO) => {
      const res = await jobOfferApi.createJobOffer(data);
      return res.data;
    },
  });

  async function onJobOfferSubmit(
    jobOffer: CreateJobOfferDTO,
    event?: BaseSyntheticEvent,
  ) {
    event?.preventDefault();

    setJobOffer(jobOffer);

    await jobOfferMutation.mutateAsync(jobOffer);

    navigate(-1);
  }

  function onJobOfferCancel() {
    navigate(-1);
  }

  return {
    customer,
    jobOfferMutation,
    jobOffer,
    onJobOfferSubmit,
    onJobOfferCancel,
  };
}
