import {
  ContactControllerApi,
  ContactDTO,
  CreateContactDTO,
  CreateCustomerDTO,
  CustomerControllerApi,
  CustomerDTO,
} from "../../apis/crm/api.ts";
import { BaseSyntheticEvent, useState } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { contactKey, customerKey } from "../../query/query-keys.ts";
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

interface LocationState {
  contact?: ContactDTO;
  customer?: CustomerDTO;
  fromMessage?: boolean;
  update?: boolean;
}

interface LocationFromMessage extends LocationState {
  contact: ContactDTO;
  fromMessage: true;
  update?: false;
}

interface LocationUpdate extends LocationState {
  contact: ContactDTO;
  customer: CustomerDTO;
  update: true;
}

export type CustomerLocationType = LocationFromMessage | LocationUpdate;

export default function useCreateCustomerPage() {
  const contactApi = new ContactControllerApi();
  const customerApi = new CustomerControllerApi();
  const { state }: Location<CustomerLocationType | null> = useLocation();

  const [contact, setContact] = useState<CreateContactDTO | undefined>(
    state?.contact,
  );
  const [customer, setCustomer] = useState<CreateCustomerDTO | undefined>(
    state?.customer && {
      note: state.customer.note ?? "",
      contactId: state.customer.contact.id,
    },
  );
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: customerKey(null),
    mutationFn: async (data: CreateCustomerDTO) =>
      customerApi.createCustomer(data).then((res) => res.data),
  });

  const updateContact = useMutation({
    mutationKey: contactKey({ contactId: state?.contact?.id }),
    mutationFn: (data: { contactId: number; contact: CreateContactDTO }) =>
      contactApi
        .updateContact(data.contactId, data.contact)
        .then((res) => res.data),
  });

  const updateCustomer = useMutation({
    mutationKey: customerKey(state?.customer?.id ?? null),
    mutationFn: (data: { customerId: number; customer: CreateCustomerDTO }) =>
      customerApi
        .updateCustomerNote(data.customerId, { note: data.customer.note })
        .then((res) => res.data),
  });

  const steps = useMultipleForm<CustomerFormStepsEnum>({
    elements: Object.values(CustomerFormStepsEnum),
    firstState: state?.fromMessage ? "Customer" : undefined,
  });

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

    if (state?.fromMessage) {
      customer.contactId = state.contact.id;
    } else {
      customer.contactInfo = contact;
    }

    setCustomer(customer);
    steps.nextStep();
  }

  async function onReviewSubmit() {
    if (!customer) return;
    if (!contact) return;

    if (state?.update) {
      await Promise.all([
        updateContact.mutateAsync({ contactId: state.contact.id, contact }),
        updateCustomer.mutateAsync({ customerId: state.customer.id, customer }),
      ]);
    } else {
      await mutation.mutateAsync(customer);
    }

    // When finished go to the previous page.
    navigate(-1);
  }

  function onContactCancel() {
    navigate(-1);
  }

  function onCustomerCancel() {
    // Prevent change the contact when converting a message contact to a customer
    if (state?.fromMessage) return navigate(-1);
    steps.prevStep();
  }

  function onReviewCancel() {
    steps.prevStep();
  }

  return {
    mutation,
    isPending:
      mutation.isPending || updateCustomer.isPending || updateContact.isPending,
    error: mutation.error || updateCustomer.error || updateContact.error,
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
