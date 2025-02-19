import { useQuery } from "@tanstack/react-query";
import { professionalsKey } from "../../query/query-keys.ts";
import {
  JobOfferDTO,
  ProfessionalControllerApi,
  ProfessionalFilters,
  UpdateJobOfferStatusDTO,
  UpdateJobOfferStatusDTOStatusEnum,
} from "../../apis/crm/api.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateJobOfferStatusSchema } from "../../schemas/updateJobOfferStatusSchema.ts";
import { useEffect, useState } from "react";
import { useDebouncing } from "../../hooks/useDebouncing.ts";
import { nextPossibleStatus } from "../../machine/jobOfferStatusStateMachine.ts";

export default function useJobOfferStatusForm(currentJobOffer: JobOfferDTO) {
  const professionalApi = new ProfessionalControllerApi();
  const [professionalName, setProfessionalName] = useState("");
  const professionalNameDebounced = useDebouncing(professionalName, 1000);
  const [currentStatus] = useState(
    currentJobOffer.status satisfies UpdateJobOfferStatusDTOStatusEnum,
  );

  const {
    watch,
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UpdateJobOfferStatusDTO>({
    defaultValues: {
      status: nextPossibleStatus(currentStatus)[0],
    },
    resolver: zodResolver(updateJobOfferStatusSchema),
  });

  // Fetch professionals
  const professionalFilters: ProfessionalFilters = {
    byFullName: professionalNameDebounced,
    byEmploymentState: "Available",
  };

  const professionals = useQuery({
    queryKey: professionalsKey({
      page: 0,
      limit: 10,
      filters: professionalFilters,
    }),
    queryFn: () =>
      professionalApi
        .getProfessionals(0, 10, professionalFilters)
        .then((res) => res.data),
  });

  const status = watch("status");

  // Only set a professional if we are trying to go
  // to a Consolidated state
  useEffect(() => {
    if (status !== "Consolidated") {
      setValue("professionalId", undefined);
    }
  }, [status]);

  return {
    watch,
    register,
    handleSubmit,
    control,
    errors,
    setProfessionalName,
    currentStatus,
    professionals: {
      data:
        professionals.data?.content?.map((p) => ({
          id: p.id,
          label: `${p.contact.name} ${p.contact.surname}`,
        })) ?? [],
      isPending:
        professionals.isPending ||
        professionalName !== professionalNameDebounced,
      error: professionals.error,
    },
    availableStatus: nextPossibleStatus(currentStatus),
  };
}
