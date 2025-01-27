import {
  ContactDTO,
  CreateContactDTO,
  CreateProfessionalDTO,
  ProfessionalControllerApi,
  ProfessionalDTO,
} from "../../apis/crm/api.ts";
import { useMutation } from "@tanstack/react-query";
import { PROFESSIONAL_KEY } from "../../query/query-keys.ts";
import useMultipleForm from "../../hooks/useMultipleForm.ts";
import { BaseSyntheticEvent, useState } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";

export const ProfessionalFormStepsEnum = {
  Contact: "Contact",
  Professional: "Professional",
  Review: "Review",
} as const;

export type ProfessionalFormStepsEnum =
  (typeof ProfessionalFormStepsEnum)[keyof typeof ProfessionalFormStepsEnum];

function stepLabel(step: ProfessionalFormStepsEnum): string {
  switch (step) {
    case "Contact":
      return "Contact information";
    case "Professional":
      return "Professional information";
    case "Review":
      return "Review information";
  }
}

const stepsWithLabels = Object.values(ProfessionalFormStepsEnum).map((s) => ({
  step: s,
  label: stepLabel(s),
}));

interface LocationState {
  contact?: ContactDTO;
  professional?: ProfessionalDTO;
  fromMessage?: boolean;
}

interface LocationStatePresent extends LocationState {
  contact: ContactDTO;
  fromMessage: true;
}

interface LocationStateAbsent extends LocationState {
  contact?: ContactDTO;
  fromMessage?: false;
}

export type CreateProfessionalLocationType =
  | LocationStatePresent
  | LocationStateAbsent;

export default function useCreateProfessionalPage() {
  const professionalApi = new ProfessionalControllerApi();
  const { state }: Location<CreateProfessionalLocationType | null> =
    useLocation();

  const [contact, setContact] = useState<CreateContactDTO | undefined>(
    state?.contact,
  );
  const [professional, setProfessional] = useState<
    CreateProfessionalDTO | undefined
  >(
    state?.professional && {
      ...state.professional,
      notes: state.professional.notes ?? "",
      contactId: 0,
    },
  );
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: CreateProfessionalDTO) => {
      const res = await professionalApi.createProfessional(data);
      return res.data;
    },
    mutationKey: [PROFESSIONAL_KEY],
  });

  const steps = useMultipleForm<ProfessionalFormStepsEnum>({
    elements: Object.values(ProfessionalFormStepsEnum),
    firstState: state?.fromMessage ? "Professional" : undefined,
  });

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

    if (state?.fromMessage) {
      professional.contactId = state.contact.id;
    } else {
      professional.contactInfo = contact;
    }

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
    // Prevent change the contact when converting a message contact to a professional
    if (state?.fromMessage) return navigate(-1);
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
    currentStepIndex: steps.index,
    stepsWithLabels,
    onContactSubmit,
    onContactCancel,
    onProfessionalSubmit,
    onProfessionalCancel,
    onReviewSubmit,
    onReviewCancel,
  };
}
