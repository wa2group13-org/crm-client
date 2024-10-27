import useCustomerForm from "./index.hook.ts";
import { CreateCustomerDTO } from "../../apis/crm/api.ts";
import { SubmitHandler } from "react-hook-form";
import { Box, Button, Divider, TextField } from "@mui/material";
import ErrorAlert from "../ErrorAlert";

export default function CustomerForm({
  onSubmit,
  onCancel,
  defaultCustomer,
  error,
}: {
  onSubmit: SubmitHandler<CreateCustomerDTO>;
  onCancel?: () => void;
  isPending?: boolean;
  error?: Error | null;
  defaultCustomer?: CreateCustomerDTO;
}) {
  const { errors, register, handleSubmit } = useCustomerForm(defaultCustomer);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          {...register("note")}
          multiline
          label="Notes"
          placeholder="Notes"
          error={!!errors.note?.message}
          helperText={errors.note?.message}
          fullWidth
        />

        <Divider />

        <ErrorAlert text={error?.message} />

        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
}
