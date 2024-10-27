import {
  CreateContactDTO,
  CreateCustomerDTO,
  CustomerControllerApi,
} from "../../apis/crm/api.ts";
import { BaseSyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { PROFESSIONAL_KEY } from "../../query/query-keys.ts";
import useMultipleForm from "../../hooks/useMultipleForm.ts";

const CustomerFormStepsEnum = {
  Contact: "Contact",
  Customer: "Customer",
  Review: "Review",
} as const;

type CustomerFormStepsEnum =
  (typeof CustomerFormStepsEnum)[keyof typeof CustomerFormStepsEnum];

function stepLabel(step: CustomerFormStepsEnum): string {
  switch (step) {
    case "Contact":
      return "Contact information";
    case "Customer":
      return "Customer information";
    case "Review":
      return "Review information";
  }
}

const stepsWithLabels = Object.values(CustomerFormStepsEnum).map((s) => ({
  step: s,
  label: stepLabel(s),
}));

export default function useCreateCustomerPage() {
  const customerApi = new CustomerControllerApi();
  const [contact, setContact] = useState<CreateContactDTO | undefined>();
  const [customer, setCustomer] = useState<CreateCustomerDTO | undefined>();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: CreateCustomerDTO) => {
      const res = await customerApi.createCustomer(data);
      return res.data;
    },
    mutationKey: [PROFESSIONAL_KEY],
  });

  const steps = useMultipleForm<CustomerFormStepsEnum>(
    Object.values(CustomerFormStepsEnum),
  );

  async function onContactSubmit(
    contact: CreateContactDTO,
    event?: BaseSyntheticEvent,
  ) {
    event?.preventDefault();
    setContact(contact);
    steps.nextStep();
  }

  async function onCustomerSubmit(
    customer: CreateCustomerDTO,
    event?: BaseSyntheticEvent,
  ) {
    event?.preventDefault();
    customer.contactInfo = contact;
    setCustomer(customer);
    steps.nextStep();
  }

  async function onReviewSubmit() {
    if (!customer) return;

    await mutation.mutateAsync(customer);

    // When finished go to the previous page.
    navigate(-1);
  }

  function onContactCancel() {
    navigate(-1);
  }

  function onCustomerCancel() {
    steps.prevStep();
  }

  function onReviewCancel() {
    steps.prevStep();
  }

  return {
    mutation,
    contact,
    customer,
    currentStep: steps.current,
    currentStepIndex: steps.index,
    stepsWithLabels,
    onContactSubmit,
    onContactCancel,
    onCustomerSubmit,
    onCustomerCancel,
    onReviewSubmit,
    onReviewCancel,
  };
}
