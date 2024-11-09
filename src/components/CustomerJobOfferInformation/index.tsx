import { CustomerDTO, JobOfferDTO } from "../../apis/crm/api.ts";
import { Box, Divider, List, ListItemButton, Typography } from "@mui/material";
import { CSSProperties, Fragment } from "react";
import { OpenInNew } from "@mui/icons-material";
import JobStateChip from "../JobStateChip";

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
              <JobStateChip status={job.status} />
            </Box>

            <OpenInNew sx={{ flexGrow: 0 }} />
          </ListItemButton>
          <Divider component="li" />
        </Fragment>
      ))}
    </List>
  );
}
