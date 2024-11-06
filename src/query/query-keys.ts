import { CustomerFilters } from "../apis/crm/api.ts";

export const PROFESSIONAL_KEY = "professional_key";
export const PROFESSIONALS_KEY = "professionals_key";
export const CUSTOMERS_KEY = "customers_key";
export const CUSTOMER_KEY = "customer_key";
export const JOB_OFFERS_KEY = "job_offers_key";
export const JOB_OFFER_KEY = "job_offer_key";
export const USER_KEY = "user_key";

export function professionalsKey(keys: { page?: number; limit?: number }) {
  return [PROFESSIONALS_KEY, keys];
}

export function professionalKey(professionalId: number | null) {
  return [PROFESSIONAL_KEY, professionalId];
}

export function customersKey(keys: {
  page?: number;
  limit?: number;
  filters?: CustomerFilters;
}) {
  return [CUSTOMERS_KEY, keys];
}

export function customerKey(customerId: number | null) {
  return [CUSTOMER_KEY, customerId];
}

export function jobOffersKey(keys: { page?: number; limit?: number }) {
  return [JOB_OFFERS_KEY, keys];
}

export function jobOfferKey(jobOfferId: number | null) {
  return [JOB_OFFER_KEY, jobOfferId];
}

export function userKey() {
  return [USER_KEY];
}
