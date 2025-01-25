import useJobOfferPage from "./index.hook.ts";
import Loading from "../../components/Loading";
import ErrorAlert from "../../components/ErrorAlert";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";
import JobOfferHistory from "../../components/JobOfferHistory";
import { UseQueryResult } from "@tanstack/react-query";
import {
  CustomerDTO,
  JobOfferDTO,
  ProfessionalDTO,
  UpdateJobOfferStatusDTO,
} from "../../apis/crm/api.ts";
import { OpenInNew, Settings } from "@mui/icons-material";
import { SubmitHandler } from "react-hook-form";
import JobOfferStatusForm from "../../components/JobOfferStatusForm";
import useUpdateStatusJobOfferPage from "./updateStatus.hook.ts";
import JobStateChip from "../../components/JobStateChip";

export default function JobOfferPage() {
  const {
    jobOfferId,
    jobOffer,
    customer,
    professional,
    onProfessionalClick,
    onCustomerClick,
    isLogin,
  } = useJobOfferPage();

  const {
    updateStatusOpen,
    onStatusSubmit,
    onStatusCancel,
    updateJobStatusMutation,
    openForm,
  } = useUpdateStatusJobOfferPage(jobOfferId);

  if (jobOffer.isPending) return <Loading />;

  if (jobOffer.isError) return <ErrorAlert text={jobOffer.error.message} />;

  if (customer.isError) return <ErrorAlert text={customer.error.message} />;

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h4">Job description</Typography>
        <Typography variant="h5" sx={{ m: 2, fontWeight: "bold" }}>
          {jobOffer.data.description}
        </Typography>

        <Divider />

        <Typography variant="h4">Job status</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <JobStateChip
            status={jobOffer.data.status}
            variant="h5"
            style={{ margin: 5, padding: 20, fontWeight: "bold" }}
          />

          {isLogin && (
            <Button
              variant="outlined"
              disabled={jobOffer.data.status === "Aborted"}
              onClick={openForm}
              startIcon={<Settings />}
            >
              Change
            </Button>
          )}
        </Box>

        <Divider />

        <ChangeStatus
          currentJobOffer={jobOffer.data}
          onCancel={onStatusCancel}
          onSubmit={onStatusSubmit}
          open={updateStatusOpen}
          isPending={updateJobStatusMutation.isPending}
          error={updateJobStatusMutation.error}
        />

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

        <Divider />

        <Typography variant="h4" sx={{ mt: 4 }}>
          Changes history
        </Typography>
        <JobOfferHistory
          history={jobOffer.data.notes}
          onProfessionalClick={onProfessionalClick}
        />
      </Box>
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

function ChangeStatus({
  onCancel,
  onSubmit,
  error,
  isPending,
  open,
  currentJobOffer,
}: {
  onCancel: () => void;
  onSubmit: SubmitHandler<UpdateJobOfferStatusDTO>;
  error?: Error | null;
  isPending?: boolean;
  open: boolean;
  currentJobOffer: JobOfferDTO;
}) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Update job offer status</DialogTitle>
      <DialogContent sx={{ minWidth: "500px" }}>
        <JobOfferStatusForm
          currentJobOffer={currentJobOffer}
          onCancel={onCancel}
          onSubmit={onSubmit}
          error={error}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
