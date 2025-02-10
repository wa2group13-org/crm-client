import { Container } from "@mui/material";
import CardWrapperForm from "../../components/CardWrapperForm";
import useCreateCustomerPage from "./index.hook.ts";
import ContactForm from "../../components/ContactForm";
import CustomerForm from "../../components/CustomerForm";
import CustomerReview from "../../components/CustomerReview";

export default function CreateCustomerPage() {
  const {
    currentStep,
    currentStepIndex,
    stepsWithLabels,
    contact,
    customer,
    mutation,
    isPending,
    error,
    onContactSubmit,
    onContactCancel,
    onCustomerSubmit,
    onCustomerCancel,
    onReviewSubmit,
    onReviewCancel,
  } = useCreateCustomerPage();

  return (
    <Container maxWidth="md">
      <CardWrapperForm
        title={"Create customer"}
        steps={stepsWithLabels}
        currentStepIndex={currentStepIndex}
      >
        {currentStep === "Contact" && (
          <ContactForm
            defaultContact={contact}
            onCancel={onContactCancel}
            onSubmit={onContactSubmit}
          />
        )}

        {currentStep === "Customer" && (
          <CustomerForm
            defaultCustomer={customer}
            onSubmit={onCustomerSubmit}
            onCancel={onCustomerCancel}
            isPending={mutation.isPending}
            error={mutation.error}
          />
        )}

        {currentStep === "Review" && (
          <CustomerReview
            customer={
              customer ??
              (() => {
                throw Error("Some customer information is missing!");
              })()
            }
            isLoading={isPending}
            error={error}
            onSubmit={onReviewSubmit}
            onCancel={onReviewCancel}
          />
        )}
      </CardWrapperForm>
    </Container>
  );
}
