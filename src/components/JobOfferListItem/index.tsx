import useJobOfferListItem from "./index.hook.ts";
import { CSSProperties } from "react";
import { JobOfferDTO } from "../../apis/crm/api.ts";
import { Alert, Avatar, Box, Typography, useTheme } from "@mui/material";
import Loading from "../Loading";
import {
  Cancel,
  CheckCircle,
  Checklist,
  Construction,
  OpenInNew,
} from "@mui/icons-material";

export default function JobOfferListItem({
  style,
  jobOffer,
}: {
  style?: CSSProperties;
  jobOffer: JobOfferDTO;
}) {
  const { customerQuery } = useJobOfferListItem(jobOffer);

  const owner = () => {
    if (customerQuery.isPending) return <Loading />;

    if (customerQuery.isError)
      return <Alert severity="error">{customerQuery.error.message}</Alert>;

    return customerQuery.data.contact.name;
  };

  return (
    <Box style={style}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <JobOfferAvatar jobOffer={jobOffer} />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">{jobOffer.description}</Typography>

          <Typography>Owner: {owner()}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

function JobOfferAvatar({ jobOffer }: { jobOffer: JobOfferDTO }) {
  const theme = useTheme();
  const status = jobOffer.status;

  const color = (() => {
    switch (status) {
      case "Created":
        return theme.palette.primary.main;
      case "Done":
        return theme.palette.success.main;
      case "Aborted":
        return theme.palette.error.main;
      case "CandidateProposal":
      case "Consolidated":
      case "SelectionPhase":
        return theme.palette.warning.main;
    }
  })();

  const Icon = (() => {
    switch (status) {
      case "Created":
        return OpenInNew;
      case "Aborted":
        return Cancel;
      case "Done":
        return CheckCircle;
      case "CandidateProposal":
      case "Consolidated":
        return Construction;
      case "SelectionPhase":
        return Checklist;
    }
  })();

  return (
    <Avatar sx={{ bgcolor: color }}>
      <Icon />
    </Avatar>
  );
}
