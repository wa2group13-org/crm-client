import useEmailForm from "./index.hook.ts";
import { CreateEmailDTO } from "../../apis/communication_manager/api.ts";
import { SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import ErrorText from "../ErrorText";

export default function EmailForm({
  defaultEmail,
  onSubmit,
  onCancel,
  error,
  isPending,
}: {
  onSubmit: SubmitHandler<CreateEmailDTO>;
  defaultEmail?: CreateEmailDTO;
  onCancel?: () => void;
  isPending?: boolean;
  error?: Error | null;
}) {
  const { register, errors, handleSubmit } = useEmailForm(defaultEmail);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          {...register("recipient")}
          label="Recipient"
          placeholder="Recipient"
          type="email"
          error={!!errors.recipient?.message}
          helperText={errors.recipient?.message}
          fullWidth
        />

        <TextField
          {...register("subject")}
          label="Subject"
          placeholder="Subject"
          error={!!errors.subject?.message}
          helperText={errors.subject?.message}
          fullWidth
        />

        <TextField
          {...register("body")}
          label="Body"
          placeholder="Body"
          error={!!errors.body?.message}
          helperText={errors.body?.message}
          fullWidth
          multiline
          rows={10}
        />

        <Divider />

        <ErrorText text={error?.message} />

        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>

          <Button type="submit" variant="contained" disabled={isPending}>
            Submit {isPending && <CircularProgress />}
          </Button>
        </Box>
      </Box>
    </form>
  );
}
