import useJobOfferListItem from "./index.hook.ts";
import { CSSProperties } from "react";
import { JobOfferDTO } from "../../apis/crm/api.ts";
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Cancel,
  CheckCircle,
  Checklist,
  Construction,
  OpenInNew,
} from "@mui/icons-material";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export default function JobOfferListItem({
  style,
  jobOffer,
}: {
  style?: CSSProperties;
  jobOffer: JobOfferDTO;
}) {
  const { customerQuery } = useJobOfferListItem(jobOffer);

  const owner = () => {
    if (customerQuery.isPending) return <CircularProgress size={2} />;

    if (customerQuery.isError)
      return <Alert severity="error">{customerQuery.error.message}</Alert>;

    return customerQuery.data.contact.name;
  };

  return (
    <Box style={style}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <JobOfferAvatar jobOffer={jobOffer} />

        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Typography variant="h5">{jobOffer.description}</Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Typography sx={{ flexGrow: 1 }}>Owner: {owner()}</Typography>
            <Typography sx={{ flexGrow: 0 }}>
              {jobOffer.notes
                .reduce(
                  (p, c) =>
                    dayjs(c.logTime).isBefore(p) ? dayjs(c.logTime) : p,
                  dayjs(),
                )
                ?.format("LLL")}
            </Typography>
          </Box>
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
