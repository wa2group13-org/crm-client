import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateJobOfferDTO,
  CustomerControllerApi,
  CustomerDTO,
} from "../../apis/crm/api.ts";
import {
  JobOfferSchema,
  jobOfferSchema,
  jobOfferToSchema,
  schemaToJobOffer,
} from "../../schemas/jobOfferSchema.ts";
import { useState } from "react";
import { useDebouncing } from "../../hooks/useDebouncing.ts";
import { useQuery } from "@tanstack/react-query";
import { customersKey } from "../../query/query-keys.ts";

export default function useJobOfferForm(
  defaultJobOffer?: CreateJobOfferDTO,
  customerOwner?: CustomerDTO,
) {
  const customerApi = new CustomerControllerApi();
  const [customerName, setCustomerName] = useState(
    customerOwner &&
      `${customerOwner.contact.name} ${customerOwner.contact.surname}`,
  );
  const customerNameDebounced = useDebouncing(customerName, 1000);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<JobOfferSchema>({
    defaultValues: (defaultJobOffer && jobOfferToSchema(defaultJobOffer)) || {
      status: "Created",
      customerId: customerOwner?.id,
    },
    resolver: zodResolver(jobOfferSchema),
  });

  const skillFields = useFieldArray({
    control,
    name: "skills",
  });

  const customersQuery = useQuery({
    queryKey: customersKey({
      page: 0,
      limit: 10,
      filters: { byFullName: customerNameDebounced },
    }),
    queryFn: async () => {
      const res = await customerApi.getCustomers(0, 10, {
        byFullName: customerNameDebounced,
      });
      return res.data;
    },
  });

  function handleSubmitConvert(onSubmit: SubmitHandler<CreateJobOfferDTO>) {
    return handleSubmit(
      async (data, event) => await onSubmit(schemaToJobOffer(data), event),
    );
  }

  function onCustomerNameChange(name: string) {
    setCustomerName(name);
  }

  return {
    register,
    handleSubmit: handleSubmitConvert,
    control,
    watch,
    errors,
    customers: customersQuery.data?.content?.map((c) => ({
      id: c.id,
      label: `${c.contact.name} ${c.contact.surname}`,
    })),
    customersPending:
      customersQuery.isPending || customerName !== customerNameDebounced,
    skillFields,
    onCustomerNameChange,
  };
}
