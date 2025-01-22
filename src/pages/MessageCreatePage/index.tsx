import useMessageCreatePage from "./index.hook.ts";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import EmailForm from "../../components/EmailForm";

export default function CreateMessagePage() {
  const { isPending, defaultMessage, error, onSubmit, onCancel } =
    useMessageCreatePage();

  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader
          title={
            <Typography variant="h3" sx={{ textAlign: "center", margin: 2 }}>
              Send e-mail
            </Typography>
          }
        />
        <CardContent>
          <EmailForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            isPending={isPending}
            error={error}
            defaultEmail={defaultMessage}
          />
        </CardContent>
      </Card>
    </Container>
  );
}
