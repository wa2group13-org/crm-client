import {
  CustomerFilters,
  GetMessagesFilterByStateEnum,
  GetMessagesSortByEnum,
  JobOfferFilters,
  ProfessionalFilters,
} from "../apis/crm/api.ts";

export const PROFESSIONAL_KEY = "professional_key";
export const PROFESSIONALS_KEY = "professionals_key";
export const CUSTOMERS_KEY = "customers_key";
export const CUSTOMER_KEY = "customer_key";
export const JOB_OFFERS_KEY = "job_offers_key";
export const JOB_OFFER_KEY = "job_offer_key";
export const USER_KEY = "user_key";
export const MESSAGES_KEY = "messages_key";
export const MESSAGE_KEY = "message_key";
export const DOCUMENTS_KEY = "documents_key";
export const DOCUMENT_KEY = "document_key";
export const DOCUMENT_DATA_KEY = "document_data_key";
export const DOCUMENT_VERSION_KEY = "document_version_key";
export const DOCUMENT_BLOB_KEY = "document_blob_key";
export const MESSAGE_HISTORY_KEY = "message_history_key";
export const EMAIL_KEY = "email_key";
export const CONTACT_KEY = "contact_key";

export function professionalsKey(keys: {
  page?: number;
  limit?: number;
  filters?: ProfessionalFilters;
}) {
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

export function jobOffersKey(keys: {
  page?: number;
  limit?: number;
  filters?: JobOfferFilters;
}) {
  return [JOB_OFFERS_KEY, keys];
}

export function jobOfferKey(jobOfferId: number | null) {
  return [JOB_OFFER_KEY, jobOfferId];
}

export function userKey() {
  return [USER_KEY];
}

export function messagesKey(keys: {
  page?: number;
  limit?: number;
  sortBy?: GetMessagesSortByEnum;
  filterByState?: GetMessagesFilterByStateEnum;
}) {
  return [MESSAGES_KEY, keys];
}

export function messageKey(keys: { messageId?: number; mailId?: string }) {
  return [MESSAGE_KEY, keys];
}

export function documentsKey(keys: { page?: number; limit?: number }) {
  return [DOCUMENTS_KEY, keys];
}

export function documentKey(keys: { documentId?: number; mailId?: string }) {
  return [DOCUMENT_KEY, keys];
}

export function documentDataKey(keys: { documentMetadataId?: number }) {
  return [DOCUMENT_DATA_KEY, keys];
}

export function documentVersionKey(keys: { documentId?: number }) {
  return [DOCUMENT_VERSION_KEY, keys];
}

export function documentBlobKey(keys: {
  documentId?: number;
  version?: number;
}) {
  return [DOCUMENT_BLOB_KEY, keys];
}

export function messageHistoryKey(messageId: number | null) {
  return [MESSAGE_HISTORY_KEY, messageId];
}

export function emailKey(emailId: number | null) {
  return [EMAIL_KEY, emailId];
}

export function contactKey(keys: { contactId?: number }) {
  return [CONTACT_KEY, keys];
}
