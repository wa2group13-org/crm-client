import { ContactControllerApi, CreateContactDTO } from "../../apis/crm/api.ts";
import { useMutation } from "@tanstack/react-query";
import { PROFESSIONAL_KEY } from "../../query/query-keys.ts";

export default function useCreateProfessionalPage() {
  const contactApi = new ContactControllerApi();

  const mutation = useMutation({
    mutationFn: async (data: CreateContactDTO) => {
      const res = await contactApi.createContact(data);
      return res.data;
    },
    mutationKey: [PROFESSIONAL_KEY],
  });

  return { mutation };
}
