import useJobOfferPage from "./index.hook.ts";
import Loading from "../../components/Loading";
import ErrorAlert from "../../components/ErrorAlert";
import { Container } from "@mui/material";

export default function JobOfferPage() {
  const { jobOffer, customer, professional } = useJobOfferPage();

  if (
    jobOffer.isPending ||
    customer.isPending ||
    (professional !== null && professional.isPending)
  )
    return <Loading />;

  if (jobOffer.isError) return <ErrorAlert text={jobOffer.error.message} />;

  if (customer.isError) return <ErrorAlert text={customer.error.message} />;

  if (professional !== null && professional.isError)
    return <ErrorAlert text={professional.error.message} />;

  return <Container></Container>;
}
