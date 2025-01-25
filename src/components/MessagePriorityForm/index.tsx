import useMessagePriorityForm from "./index.hook.ts";
import {
  ChangeMessagePriorityDTO,
  CreateMessageDTOPriorityEnum,
  MessageDTO,
} from "../../apis/crm/api.ts";
import { Controller, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  TextField,
} from "@mui/material";
import ErrorText from "../ErrorText";
import { CSSProperties } from "react";

export default function MessagePriorityForm({
  defaultMessage,
  onSubmit,
  onCancel,
  isPending,
  error,
  style,
}: {
  defaultMessage: MessageDTO;
  onSubmit: SubmitHandler<ChangeMessagePriorityDTO>;
  onCancel?: () => void;
  error?: Error | null;
  isPending?: boolean;
  style?: CSSProperties;
}) {
  const { errors, handleSubmit, control } =
    useMessagePriorityForm(defaultMessage);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={style}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Controller
          control={control}
          name="priority"
          render={({ field }) => (
            <TextField
              {...field}
              select={true}
              label="Message priority"
              placeholder="Message priority"
              error={!!errors.priority}
              helperText={errors.priority?.message}
              fullWidth={true}
            >
              {Object.values(CreateMessageDTOPriorityEnum).map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          )}
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
