import ContactForm from "../../components/ContactForm";
import useCreateProfessionalPage, {
  ProfessionalFormStepsEnum,
} from "./index.hook.ts";
import ProfessionalForm from "../../components/ProfessionalForm";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import ProfessionalReview from "../../components/ProfessionalReview";

export default function CreateProfessionalPage() {
  const {
    currentStep,
    contact,
    professional,
    mutation,
    onContactSubmit,
    onContactCancel,
    onProfessionalSubmit,
    onProfessionalCancel,
    onReviewSubmit,
    onReviewCancel,
  } = useCreateProfessionalPage();

  return (
    <Container maxWidth="md">
      <CardWrapperForm title="Create professional" currentStep={currentStep}>
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
            isLoading={mutation.isPending}
            error={mutation.error}
            onSubmit={onReviewSubmit}
            onCancel={onReviewCancel}
          />
        )}
      </CardWrapperForm>
    </Container>
  );
}

function CardWrapperForm({
  title,
  currentStep,
  children,
}: {
  title?: string;
  currentStep: ProfessionalFormStepsEnum;
  children: ReactNode;
}) {
  const steps = Object.values(ProfessionalFormStepsEnum);

  function isCompleted(index: number): boolean {
    return steps.indexOf(currentStep) > index;
  }

  function stepLabel(step: ProfessionalFormStepsEnum): string {
    switch (step) {
      case "Contact":
        return "Contact information";
      case "Professional":
        return "Professional information";
      case "Review":
        return "Review information";
    }
  }

  function getIndex(currentStep: ProfessionalFormStepsEnum): number {
    return Object.values(ProfessionalFormStepsEnum).indexOf(currentStep);
  }

  return (
    <Card>
      <CardHeader
        title={
          title && (
            <Typography variant="h3" sx={{ textAlign: "center", margin: 2 }}>
              {title}
            </Typography>
          )
        }
      />
      <CardContent>
        <Stepper sx={{ margin: 5 }} activeStep={getIndex(currentStep)}>
          {steps.map((step, index) => (
            <Step key={step} completed={isCompleted(index)}>
              <StepLabel>{stepLabel(step)}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {children}
      </CardContent>
    </Card>
  );
}
