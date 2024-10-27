import PersonalInformation from "../../components/PersonalInformation";
import ProfessionalInformation from "../../components/ProfessionalInformation";
import { Alert, Card, CardContent, Container, Typography } from "@mui/material";
import Loading from "../../components/Loading";
import useProfessionalPage from "./index.hooks.ts";

export default function ProfessionalPage() {
  const { professional } = useProfessionalPage();

  if (professional.isPending) return <Loading />;

  if (professional.isError)
    return <Alert severity="error">{professional.error.message}</Alert>;

  return (
    <Container>
      <Card sx={{ borderRadius: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h4">Professional information</Typography>
          <ProfessionalInformation professional={professional.data} />

          <Typography variant="h4" sx={{ mt: 4 }}>
            Personal information
          </Typography>
          <PersonalInformation contact={professional.data.contact} />
        </CardContent>
      </Card>
    </Container>
  );
}
