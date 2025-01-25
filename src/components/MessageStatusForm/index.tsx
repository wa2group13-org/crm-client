import { useMessageStatusForm } from "./index.hook.ts";
import { ChangeMessageStatusDTO, MessageDTO } from "../../apis/crm/api.ts";
import { Controller, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  TextField,
} from "@mui/material";
import { CSSProperties } from "react";
import ErrorText from "../ErrorText";

export default function MessageStatusForm({
  style,
  defaultMessage,
  onSubmit,
  error,
  isPending,
  onCancel,
}: {
  style?: CSSProperties;
  defaultMessage: MessageDTO;
  onSubmit: SubmitHandler<ChangeMessageStatusDTO>;
  error?: Error | null;
  isPending?: boolean;
  onCancel?: () => void;
}) {
  const { register, errors, handleSubmit, control, availableStatus } =
    useMessageStatusForm(defaultMessage);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={style}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <TextField
              {...field}
              select={true}
              label="Message status"
              placeholder="Message status"
              error={!!errors.status}
              helperText={errors.status?.message}
              fullWidth={true}
            >
              {availableStatus.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <TextField
          {...register("comment")}
          label="Comment"
          placeholder="Comment"
          error={!!errors.comment?.message}
          helperText={errors.comment?.message}
          fullWidth
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
