import { Container } from "@mui/material";
import JobOfferForm from "../../components/JobOfferForm";
import CardWrapperForm from "../../components/CardWrapperForm";
import useJobOfferCreatePage from "./index.hook.ts";

export default function JobOfferCreatePage() {
  const {
    customer,
    jobOffer,
    jobOfferMutation,
    onJobOfferSubmit,
    onJobOfferCancel,
  } = useJobOfferCreatePage();

  return (
    <Container maxWidth="md">
      <CardWrapperForm
        title="Create job offers"
        steps={[]}
        currentStepIndex={0}
      >
        <JobOfferForm
          isPending={jobOfferMutation.isPending}
          onSubmit={onJobOfferSubmit}
          onCancel={onJobOfferCancel}
          error={jobOfferMutation.error}
          customerOwner={customer}
          defaultJobOffer={jobOffer}
        />
      </CardWrapperForm>
    </Container>
  );
}
