import useJobOfferPage from "./index.hook.ts";
import Loading from "../../components/Loading";
import ErrorAlert from "../../components/ErrorAlert";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import JobOfferHistory from "../../components/JobOfferHistory";
import { UseQueryResult } from "@tanstack/react-query";
import { CustomerDTO, ProfessionalDTO } from "../../apis/crm/api.ts";
import { OpenInNew } from "@mui/icons-material";

export default function JobOfferPage() {
  const {
    jobOffer,
    customer,
    professional,
    onProfessionalClick,
    onCustomerClick,
  } = useJobOfferPage();

  if (jobOffer.isPending) return <Loading />;

  if (jobOffer.isError) return <ErrorAlert text={jobOffer.error.message} />;

  if (customer.isError) return <ErrorAlert text={customer.error.message} />;

  return (
    <Container>
      <Typography variant="h4">Job description</Typography>
      <Typography variant="h5" sx={{ m: 2, fontWeight: "bold" }}>
        {jobOffer.data.description}
      </Typography>

      <Grid2 container spacing={2} sx={{ mt: 4 }}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title={"Job owner"} />
            <CardContent>
              <CustomerOwner customer={customer} onClick={onCustomerClick} />
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title={"Assigned professional"} />
            <CardContent>
              <ProfessionalAssigned
                professional={professional}
                onClick={onProfessionalClick}
              />
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Typography variant="h4" sx={{ mt: 4 }}>
        Changes history
      </Typography>
      <JobOfferHistory history={jobOffer.data.notes} />
    </Container>
  );
}

function ProfessionalAssigned({
  professional,
  onClick,
}: {
  professional: UseQueryResult<ProfessionalDTO | null, Error>;
  onClick: (professional: ProfessionalDTO) => void;
}) {
  if (professional.isPending) return <CircularProgress />;

  if (professional.isError)
    return <ErrorAlert text={professional.error.message} />;

  if (professional.data === null)
    return <Typography>No professional assigned</Typography>;

  return (
    <Button onClick={() => onClick(professional.data!)} endIcon={<OpenInNew />}>
      {`${professional.data.contact.name} ${professional.data.contact.surname}`}
    </Button>
  );
}

function CustomerOwner({
  customer,
  onClick,
}: {
  customer: UseQueryResult<CustomerDTO, Error>;
  onClick: (customer: CustomerDTO) => void;
}) {
  if (customer.isPending) return <CircularProgress />;

  if (customer.isError) return <ErrorAlert text={customer.error.message} />;

  return (
    <Button onClick={() => onClick(customer.data)} endIcon={<OpenInNew />}>
      {`${customer.data.contact.name} ${customer.data.contact.surname}`}
    </Button>
  );
}
