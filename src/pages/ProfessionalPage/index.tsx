import PersonalInformation from "../../components/PersonalInformation";
import ProfessionalInformation from "../../components/ProfessionalInformation";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import Loading from "../../components/Loading";
import useProfessionalPage from "./index.hooks.ts";

export default function ProfessionalPage() {
  const { professional, isLogin, onUpdateClick } = useProfessionalPage();

  if (professional.isPending) return <Loading />;

  if (professional.isError)
    return <Alert severity="error">{professional.error.message}</Alert>;

  return (
    <Container>
      <Card sx={{ borderRadius: 4, p: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="h4">Professional information</Typography>
            {isLogin && (
              <Button
                variant="outlined"
                onClick={() => onUpdateClick(professional.data)}
              >
                Update information
              </Button>
            )}
          </Box>
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
