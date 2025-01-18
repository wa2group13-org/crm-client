import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseSyntheticEvent, useState } from "react";
import { jobOfferKey } from "../../query/query-keys.ts";
import {
  JobOfferControllerApi,
  UpdateJobOfferStatusDTO,
} from "../../apis/crm/api.ts";

export default function useUpdateStatusJobOfferPage(jobOfferId: number) {
  const queryClient = useQueryClient();
  const [updateStatusOpen, setUpdateStatusOpen] = useState(false);
  const jobOfferApi = new JobOfferControllerApi();

  const updateJobStatusMutation = useMutation({
    mutationKey: jobOfferKey(jobOfferId),
    mutationFn: (data: UpdateJobOfferStatusDTO) =>
      jobOfferApi
        .changeJobOfferStatus(jobOfferId, data)
        .then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(jobOfferKey(jobOfferId), data);
    },
  });

  async function onStatusSubmit(
    update: UpdateJobOfferStatusDTO,
    event?: BaseSyntheticEvent,
  ) {
    event?.preventDefault();
    await updateJobStatusMutation.mutateAsync(update);
    setUpdateStatusOpen(false);
    updateJobStatusMutation.reset();
  }

  function onStatusCancel() {
    setUpdateStatusOpen(false);
    updateJobStatusMutation.reset();
  }

  function openForm() {
    setUpdateStatusOpen(true);
  }

  return {
    onStatusSubmit,
    onStatusCancel,
    updateStatusOpen,
    updateJobStatusMutation,
    openForm,
  };
}
