import {
  ContactControllerApi,
  CustomerControllerApi,
  GenericFilterDTO,
  JobOfferControllerApi,
  MessageControllerApi,
  ProfessionalControllerApi,
} from "../../apis/crm-analytics/api.ts";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "../../hooks/useSearch.ts";
import dayjs from "dayjs";

type SearchParams = {
  filters: GenericFilterDTO;
};

export default function useAnalyticsPage() {
  const baseFilter: GenericFilterDTO = {
    base: dayjs().subtract(1, "year").toISOString(),
    group: "Day",
    op: "c",
  };

  const { params, setParams } = useSearch<SearchParams, object>({
    filters: baseFilter,
  });

  const messageApi = new MessageControllerApi();
  const professionalApi = new ProfessionalControllerApi();
  const contactApi = new ContactControllerApi();
  const jobOfferApi = new JobOfferControllerApi();
  const customerApi = new CustomerControllerApi();

  const message = useQuery({
    queryKey: ["analytics-message", params.filters],
    queryFn: () =>
      Promise.all([
        messageApi.getAllByFilter1(params.filters).then((res) => res.data),
        messageApi
          .getAllByOperation1(params.filters.op)
          .then((res) => res.data),
      ]),
  });

  const professional = useQuery({
    queryKey: ["analytics-professional", params.filters],
    queryFn: () =>
      Promise.all([
        professionalApi.getAllByFilter(params.filters).then((res) => res.data),
        professionalApi
          .getAllByOperation(params.filters.op)
          .then((res) => res.data),
      ]),
  });

  const contact = useQuery({
    queryKey: ["analytics-contact", params.filters],
    queryFn: () =>
      Promise.all([
        contactApi.getAllByFilter4(params.filters).then((res) => res.data),
        contactApi
          .getAllByOperation4(params.filters.op)
          .then((res) => res.data),
      ]),
  });

  const jobOffer = useQuery({
    queryKey: ["analytics-job-offer", params.filters],
    queryFn: () =>
      Promise.all([
        jobOfferApi.getAllByFilter2(params.filters).then((res) => res.data),
        jobOfferApi
          .getAllByOperation2(params.filters.op)
          .then((res) => res.data),
      ]),
  });

  const customer = useQuery({
    queryKey: ["analytics-customer", params.filters],
    queryFn: () =>
      Promise.all([
        customerApi.getAllByFilter3(params.filters).then((res) => res.data),
        customerApi
          .getAllByOperation3(params.filters.op)
          .then((res) => res.data),
      ]),
  });

  function setFilters(filters: GenericFilterDTO) {
    setParams("filters", filters);
  }

  return {
    professional,
    customer,
    contact,
    message,
    jobOffer,
    /* They are all the same, so assigning the first one will do the trick. */
    filters: params.filters,
    setFilters,
  };
}
