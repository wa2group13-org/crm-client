import { CreateProfessionalDTO } from "../../apis/crm/api.ts";
import { useForm } from "react-hook-form";
import { z } from "zod";

const professionalSchema = z.object({
  dailyRate: z.number(),
  contactId: z.string(),
} satisfies CreateProfessionalDTO);

export default function useProfessionalForm(
  defaultValues?: CreateProfessionalDTO,
) {
  const {} = useForm();

  return {};
}
