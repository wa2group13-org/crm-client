import {
  CreateProfessionalDTO,
  CreateProfessionalDTOEmploymentStateEnum,
} from "../../apis/crm/api.ts";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const professionalSchema = z.object({
  dailyRate: z.number().min(0.0),
  notes: z.string().min(1).max(5000),
  skills: z
    .array(
      z.object({
        value: z.string().min(1).max(255),
      }),
    )
    .min(1)
    .max(100),
  employmentState: z.nativeEnum(CreateProfessionalDTOEmploymentStateEnum),
  contactId: z.number().min(0),
});

type ProfessionalSchema = z.infer<typeof professionalSchema>;

function professionalToZod(from: CreateProfessionalDTO): ProfessionalSchema {
  return {
    ...from,
    skills: [...from.skills].map((skill) => ({ value: skill })),
  };
}

function zodToProfessional(from: ProfessionalSchema): CreateProfessionalDTO {
  return {
    ...from,
    skills: new Set(from.skills.map((skill) => skill.value)),
  };
}

export default function useProfessionalForm(
  defaultProfessional?: CreateProfessionalDTO,
) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfessionalSchema>({
    defaultValues: (defaultProfessional &&
      professionalToZod(defaultProfessional)) ?? {
      contactId: 0,
      employmentState: "Available",
      skills: [{ value: "" }],
    },
    resolver: zodResolver(professionalSchema),
  });

  const skillFields = useFieldArray({
    control,
    name: "skills",
  });

  return {
    register,
    handleSubmit,
    zodToProfessional,
    control,
    errors,
    skillFields,
  };
}
