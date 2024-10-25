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

export const ProfessionalFormStepsEnum = {
  Contact: "Contact",
  Professional: "Professional",
  Review: "Review",
} as const;

export type ProfessionalFormStepsEnum =
  (typeof ProfessionalFormStepsEnum)[keyof typeof ProfessionalFormStepsEnum];

export default function useCreateProfessionalPage() {
  const professionalApi = new ProfessionalControllerApi();
  const [contact, setContact] = useState<CreateContactDTO | undefined>();
  const [professional, setProfessional] = useState<
    CreateProfessionalDTO | undefined
  >();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: CreateProfessionalDTO) => {
      const res = await professionalApi.createProfessional(data);
      return res.data;
    },
    mutationKey: [PROFESSIONAL_KEY],
  });

  const steps = useMultipleForm<ProfessionalFormStepsEnum>(
    Object.values(ProfessionalFormStepsEnum),
  );

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
    setProfessional(professional);
    steps.nextStep();
  }

  async function onReviewSubmit() {
    if (!professional) return;

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

  function onReviewCancel() {
    steps.prevStep();
  }

  return {
    mutation,
    contact,
    professional,
    currentStep: steps.current,
    onContactSubmit,
    onContactCancel,
    onProfessionalSubmit,
    onProfessionalCancel,
    onReviewSubmit,
    onReviewCancel,
  };
}
