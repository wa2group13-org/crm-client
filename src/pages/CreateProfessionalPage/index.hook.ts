import {
  CreateContactDTO,
  CreateProfessionalDTO,
  ProfessionalControllerApi,
} from "../../apis/crm/api.ts";
import { useMutation } from "@tanstack/react-query";
import { PROFESSIONAL_KEY } from "../../query/query-keys.ts";
import useMultipleForm from "../../hooks/useMultipleForm.ts";
import { BaseSyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormSteps = {
  Contact: "Contact",
  Professional: "Professional",
} as const;

type FormStepsEnum = (typeof FormSteps)[keyof typeof FormSteps];

export default function useCreateProfessionalPage() {
  const professionalApi = new ProfessionalControllerApi();
  const [contact, setContact] = useState<CreateContactDTO | undefined>();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: CreateProfessionalDTO) => {
      const res = await professionalApi.createProfessional(data);
      return res.data;
    },
    mutationKey: [PROFESSIONAL_KEY],
  });

  const steps = useMultipleForm<FormStepsEnum>(Object.values(FormSteps));

  async function onContactSubmit(
    contact: CreateContactDTO,
    event?: BaseSyntheticEvent,
  ) {
    event?.preventDefault();
    setContact(contact);
    steps.nextStep();
  }

  async function onProfessionalSubmit(
    professional: CreateProfessionalDTO,
    event?: BaseSyntheticEvent,
  ) {
    event?.preventDefault();
    professional.contactInfo = contact;
    await mutation.mutateAsync(professional);

    // When finished go to the previous page.
    navigate(-1);
  }

  function onContactCancel() {
    navigate(-1);
  }

  function onProfessionalCancel() {
    steps.prevStep();
  }

  return {
    mutation,
    contact,
    currentStep: steps.current,
    onContactSubmit,
    onContactCancel,
    onProfessionalSubmit,
    onProfessionalCancel,
  };
}
