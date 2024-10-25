import { CreateProfessionalDTO } from "../../apis/crm/api.ts";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { moneyFormatter } from "../../utils/moneyFormat.ts";
import { formatAddress } from "../../utils/formatAddress.ts";
import ErrorText from "../ErrorText";

export default function ProfessionalReview({
  professional,
  isLoading,
  error,
  onSubmit,
  onCancel,
}: {
  professional: CreateProfessionalDTO;
  isLoading?: boolean;
  error?: Error | null;
  onSubmit: () => void;
  onCancel?: () => void;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <OutlinedLabel text={professional.notes} label={"Notes"} />

      <OutlinedLabel
        text={moneyFormatter(professional.dailyRate)}
        label={"Daily rate"}
      />

      <OutlinedLabel
        text={professional.employmentState}
        label={"Employment state"}
      />

      <Typography variant="h6">Skills</Typography>
      {[...professional.skills].map((skill, index) => (
        <OutlinedTypography key={index} text={skill} />
      ))}

      <OutlinedLabel
        text={professional.contactInfo?.name ?? ""}
        label={"Name"}
      />

      <OutlinedLabel
        text={professional.contactInfo?.surname ?? ""}
        label={"Surname"}
      />

      <OutlinedLabel text={professional.contactInfo?.ssn ?? ""} label={"SSN"} />

      <Typography variant="h6">Emails</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {professional.contactInfo?.emails.map((email, index) => (
          <OutlinedTypography key={index} text={email.email} />
        ))}

        {professional.contactInfo?.emails.length === 0 && (
          <OutlinedTypography text={"-"} />
        )}
      </Box>

      <Typography variant="h6">Telephones</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {professional.contactInfo?.telephones.map((telephones, index) => (
          <OutlinedTypography key={index} text={telephones.number} />
        ))}

        {professional.contactInfo?.telephones.length === 0 && (
          <OutlinedTypography text={"-"} />
        )}
      </Box>

      <Typography variant="h6">Addresses</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {professional.contactInfo?.addresses.map((address, index) => (
          <OutlinedTypography key={index} text={formatAddress(address)} />
        ))}

        {professional.contactInfo?.addresses.length === 0 && (
          <OutlinedTypography text={"-"} />
        )}
      </Box>

      <Divider />

      <ErrorText text={error?.message} />

      <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
        <Button variant="outlined" onClick={onCancel}>
          Back
        </Button>
        <Button variant="contained" onClick={onSubmit} disabled={isLoading}>
          Submit {isLoading && <CircularProgress />}
        </Button>
      </Box>
    </Box>
  );
}

function OutlinedTypography({ text }: { text: string }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 5,
        width: "fit-content",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ m: 2 }}>{text}</Typography>
    </Paper>
  );
}

function OutlinedLabel({ text, label }: { text: string; label: string }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">{label}</Typography>
      <OutlinedTypography text={text} />
    </Box>
  );
}