import { CreateCustomerDTO } from "../../apis/crm/api.ts";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { formatAddress } from "../../utils/formatAddress.ts";
import ErrorText from "../ErrorText";

export default function CustomerReview({
  customer,
  isLoading,
  error,
  onSubmit,
  onCancel,
}: {
  customer: CreateCustomerDTO;
  isLoading?: boolean;
  error?: Error | null;
  onSubmit: () => void;
  onCancel?: () => void;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <OutlinedLabel text={customer.note} label={"Notes"} />

      <OutlinedLabel text={customer.contactInfo?.name ?? ""} label={"Name"} />

      <OutlinedLabel
        text={customer.contactInfo?.surname ?? ""}
        label={"Surname"}
      />

      <OutlinedLabel text={customer.contactInfo?.ssn ?? ""} label={"SSN"} />

      <Typography variant="h6">Emails</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {customer.contactInfo?.emails.map((email, index) => (
          <OutlinedTypography key={index} text={email.email} />
        ))}

        {customer.contactInfo?.emails.length === 0 && (
          <OutlinedTypography text={"-"} />
        )}
      </Box>

      <Typography variant="h6">Telephones</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {customer.contactInfo?.telephones.map((telephones, index) => (
          <OutlinedTypography key={index} text={telephones.number} />
        ))}

        {customer.contactInfo?.telephones.length === 0 && (
          <OutlinedTypography text={"-"} />
        )}
      </Box>

      <Typography variant="h6">Addresses</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {customer.contactInfo?.addresses.map((address, index) => (
          <OutlinedTypography key={index} text={formatAddress(address)} />
        ))}

        {customer.contactInfo?.addresses.length === 0 && (
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
