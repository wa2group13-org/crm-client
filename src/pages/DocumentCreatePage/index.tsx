import { Container } from "@mui/material";
import useDocumentCreatePage from "./index.hook.ts";
import DocumentForm from "../../components/DocumentForm";
import CardWrapperForm from "../../components/CardWrapperForm";

export default function DocumentCreatePage() {
  const { isPending, error, onSubmit, onCancel } = useDocumentCreatePage();

  return (
    <Container maxWidth="md">
      <CardWrapperForm
        title="Upload new document."
        steps={[]}
        currentStepIndex={0}
      >
        <DocumentForm
          isPending={isPending}
          onSubmit={onSubmit}
          error={error}
          onCancel={onCancel}
        />
      </CardWrapperForm>
    </Container>
  );
}
