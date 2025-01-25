import { Location, useLocation, useNavigate } from "react-router-dom";
import {
  CreateEmailDTO,
  EmailControllerApi,
} from "../../apis/communication_manager/api.ts";
import { useMutation } from "@tanstack/react-query";
import { emailKey } from "../../query/query-keys.ts";
import { BaseSyntheticEvent } from "react";

export default function useCreateMessagePage() {
  const emailApi = new EmailControllerApi();
  const location: Location<CreateEmailDTO | undefined> = useLocation();
  const navigate = useNavigate();

  const emailMutation = useMutation({
    mutationKey: emailKey(null),
    mutationFn: (data: CreateEmailDTO) =>
      emailApi.sendEmail(data).then((res) => res.data),
  });

  async function onSubmit(data: CreateEmailDTO, event?: BaseSyntheticEvent) {
    event?.preventDefault();
    await emailMutation.mutateAsync(data);
    navigate(-1);
  }

  function onCancel() {
    navigate(-1);
  }

  return {
    defaultMessage: location.state,
    isPending: emailMutation.isPending,
    error: emailMutation.error,
    onSubmit,
    onCancel,
  };
}
