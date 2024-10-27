import { CreateCustomerDTO } from "../../apis/crm/api.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema } from "../../schemas/customerSchema.ts";

export default function useCustomerForm(defaultCustomer?: CreateCustomerDTO) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateCustomerDTO>({
    defaultValues: defaultCustomer ?? {
      contactId: 0,
    },
    resolver: zodResolver(customerSchema),
  });

  return {
    register,
    handleSubmit,
    control,
    errors,
  };
}
