import ContactForm from "../../components/ContactForm";
import useCreateProfessionalPage from "./index.hook.ts";
import ProfessionalForm from "../../components/ProfessionalForm";
import { Container } from "@mui/material";
import ProfessionalReview from "../../components/ProfessionalReview";
import CardWrapperForm from "../../components/CardWrapperForm";

export default function CreateProfessionalPage() {
  const {
    currentStep,
    currentStepIndex,
    stepsWithLabels,
    contact,
    professional,
    mutation,
    isPending,
    error,
    onContactSubmit,
    onContactCancel,
    onProfessionalSubmit,
    onProfessionalCancel,
    onReviewSubmit,
    onReviewCancel,
  } = useCreateProfessionalPage();

  return (
    <Container maxWidth="md">
      <CardWrapperForm
        title="Create professional"
        currentStepIndex={currentStepIndex}
        steps={stepsWithLabels}
      >
        {currentStep === "Contact" && (
          <ContactForm
            defaultContact={contact}
            onCancel={onContactCancel}
            onSubmit={onContactSubmit}
          />
        )}

        {currentStep === "Professional" && (
          <ProfessionalForm
            defaultProfessional={professional}
            onSubmit={onProfessionalSubmit}
            onCancel={onProfessionalCancel}
            isPending={mutation.isPending}
            error={mutation.error}
          />
        )}

        {currentStep === "Review" && professional && (
          <ProfessionalReview
            professional={professional}
            contact={contact}
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
