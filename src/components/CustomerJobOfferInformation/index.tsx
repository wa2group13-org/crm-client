import {
  CustomerDTO,
  JobOfferDTO,
  JobOfferDTOStatusEnum,
} from "../../apis/crm/api.ts";
import {
  Box,
  Chip,
  Divider,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { CSSProperties, Fragment } from "react";
import {
  CheckCircle,
  Cancel,
  OpenInNew,
  Construction,
  Checklist,
} from "@mui/icons-material";

export default function CustomerJobOfferInformation({
  customer,
  onItemClick,
  style,
}: {
  style?: CSSProperties;
  customer: CustomerDTO;
  onItemClick: (jobOffer: JobOfferDTO) => void;
}) {
  return (
    <List style={style}>
      {customer.jobOffers.map((job) => (
        <Fragment key={job.id}>
          <ListItemButton
            onClick={() => onItemClick(job)}
            sx={{ display: "flex" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                flexGrow: 1,
              }}
            >
              <Typography>{job.description}</Typography>
              <StateChip status={job.status} />
            </Box>

            <OpenInNew sx={{ flexGrow: 0 }} />
          </ListItemButton>
          <Divider component="li" />
        </Fragment>
      ))}
    </List>
  );
}

function StateChip({ status }: { status: JobOfferDTOStatusEnum }) {
  const color = (() => {
    switch (status) {
      case "Created":
        return "primary";
      case "Done":
        return "success";
      case "Aborted":
        return "error";
      case "CandidateProposal":
      case "Consolidated":
      case "SelectionPhase":
        return "warning";
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

  return <Chip color={color} icon={<Icon />} label={status} />;
}
