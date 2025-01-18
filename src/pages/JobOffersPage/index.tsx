import useJobOffersPage from "./index.hook.ts";
import {
  Alert,
  Box,
  Button,
  Container,
  List,
  ListItemButton,
  Pagination,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import JobOfferListItem from "../../components/JobOfferListItem";

export default function JobOffersPage() {
  const navigate = useNavigate();
  const { page, setPage, jobOffers } = useJobOffersPage();

  if (jobOffers.isPending) return <Loading />;

  if (jobOffers.isError)
    return (
      <Box sx={{ p: 5 }}>
        <Alert severity="error">{jobOffers.error.message}</Alert>
      </Box>
    );

  return (
    <Container>
      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography variant="h3" sx={{ flexGrow: 1 }}>
          Job offers
        </Typography>
        <Button
          variant="contained"
          sx={{ flexGrow: 0 }}
          onClick={() => navigate("/ui/jobs/create")}
        >
          Add job offer
        </Button>
      </Box>

      <List sx={{ width: "100%" }}>
        {jobOffers.data.content?.map((job) => (
          <ListItemButton
            key={job.id}
            onClick={() => navigate(`/ui/jobs/${job.id}`)}
            sx={{ width: "100%" }}
          >
            <JobOfferListItem jobOffer={job} style={{ width: "100%" }} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={jobOffers.data.totalPages}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
        />
      </Box>
    </Container>
  );
}
