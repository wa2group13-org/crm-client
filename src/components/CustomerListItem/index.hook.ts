import { CustomerDTO } from "../../apis/crm/api.ts";

export default function useCustomerListItem(customer: CustomerDTO) {
  function avatarString(name: string) {
    return `${name
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase())
      .slice(0, 3)
      .join("")}`;
  }

  return {
    avatarString: avatarString(
      `${customer.contact.name} ${customer.contact.surname}`,
    ),
  };
}
