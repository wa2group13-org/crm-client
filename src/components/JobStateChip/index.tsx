import { JobOfferDTOStatusEnum } from "../../apis/crm/api.ts";
import { OverridableStringUnion } from "@mui/types";
import { Variant } from "@mui/material/styles/createTypography";
import { TypographyPropsVariantOverrides } from "@mui/material/Typography/Typography";
import {
  Cancel,
  CheckCircle,
  Checklist,
  Construction,
  OpenInNew,
} from "@mui/icons-material";
import { Chip, Typography } from "@mui/material";
import { CSSProperties } from "react";

export default function JobStateChip({
  status,
  variant,
  style,
}: {
  status: JobOfferDTOStatusEnum;
  variant?: OverridableStringUnion<
    Variant | "inherit",
    TypographyPropsVariantOverrides
  >;
  style?: CSSProperties;
}) {
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

  return (
    <Chip
      style={style}
      color={color}
      icon={<Icon />}
      label={<Typography variant={variant}>{status}</Typography>}
    />
  );
}
