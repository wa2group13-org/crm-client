import useJobOfferStatusForm from "./index.hook.ts";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  TextField,
} from "@mui/material";
import { FormAutocompleteField } from "../FormAutocompleteField";
import ErrorText from "../ErrorText";
import { Controller, SubmitHandler } from "react-hook-form";
import { JobOfferDTO, UpdateJobOfferStatusDTO } from "../../apis/crm/api.ts";

export default function JobOfferStatusForm({
  currentJobOffer,
  error,
  isPending,
  onCancel,
  onSubmit,
}: {
  currentJobOffer: JobOfferDTO;
  error?: Error | null;
  isPending?: boolean;
  onCancel: () => void;
  onSubmit: SubmitHandler<UpdateJobOfferStatusDTO>;
}) {
  const {
    watch,
    register,
    errors,
    handleSubmit,
    control,
    setProfessionalName,
    professionals,
    availableStatus,
    currentStatus,
  } = useJobOfferStatusForm(currentJobOffer);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          {...register("note")}
          label="Notes"
          placeholder="Notes"
          error={!!errors.note?.message}
          helperText={errors.note?.message}
          fullWidth
        />

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <TextField
              {...field}
              select={true}
              label="Employment state"
              placeholder="Employment state"
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

        {currentStatus === "CandidateProposal" &&
          watch("status") === "Consolidated" && (
            <FormAutocompleteField
              control={control}
              name="professionalId"
              options={professionals.data}
              loading={professionals.isPending}
              label="Assigned professional"
              onInputChange={setProfessionalName}
            />
          )}

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
