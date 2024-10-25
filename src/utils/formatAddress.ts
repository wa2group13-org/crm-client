import { CreateAddressDTO } from "../apis/crm/api.ts";

export function formatAddress(address: CreateAddressDTO): string {
  return `${address.street}, ${address.civic}; ${address.postalCode} ${address.city}`;
}
