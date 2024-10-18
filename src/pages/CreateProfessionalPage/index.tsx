import ContactForm from "../../components/ContactForm";
import useCreateProfessionalPage from "./index.hook.ts";
import ProfessionalForm from "../../components/ProfessionalForm";
import { Container } from "@mui/material";

export default function CreateProfessionalPage() {
  const {
    currentStep,
    contact,
    mutation,
    onContactSubmit,
    onContactCancel,
    onProfessionalSubmit,
    onProfessionalCancel,
  } = useCreateProfessionalPage();

  return (
    <Container>
      {currentStep === "Contact" && (
        <ContactForm
          defaultContact={contact}
          onCancel={onContactCancel}
          onSubmit={onContactSubmit}
        />
      )}

      {currentStep === "Professional" && (
        <ProfessionalForm
          onSubmit={onProfessionalSubmit}
          onCancel={onProfessionalCancel}
          isPending={mutation.isPending}
          error={mutation.error}
        />
      )}
    </Container>
  );
}
