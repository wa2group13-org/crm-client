import useProfessionalForm from "./index.hook.ts";
import {
  CreateProfessionalDTO,
  CreateProfessionalDTOEmploymentStateEnum,
} from "../../apis/crm/api.ts";
import { Controller, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import ErrorText from "../ErrorText";

const slotProps = (onClick: () => void) => ({
  input: {
    endAdornment: (
      <InputAdornment position={"end"}>
        <IconButton onClick={onClick}>
          <Delete />
        </IconButton>
      </InputAdornment>
    ),
  },
});

export default function ProfessionalForm({
  onSubmit,
  onCancel,
  defaultProfessional,
  isPending,
  error,
}: {
  onSubmit: SubmitHandler<CreateProfessionalDTO>;
  onCancel?: () => void;
  isPending?: boolean;
  error?: Error | null;
  defaultProfessional?: CreateProfessionalDTO;
}) {
  const {
    handleSubmit,
    control,
    errors,
    register,
    skillFields,
    zodToProfessional,
  } = useProfessionalForm(defaultProfessional);

  return (
    <form
      onSubmit={handleSubmit(
        async (data, event) => await onSubmit(zodToProfessional(data), event),
      )}
      style={{ display: "flex", flexDirection: "column", gap: 18 }}
    >
      <TextField
        {...register("notes")}
        label="Notes"
        placeholder="Notes"
        type="text"
        multiline
        error={!!errors.notes}
        helperText={errors.notes?.message}
        fullWidth={true}
      />

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <TextField
            {...register("dailyRate", { valueAsNumber: true })}
            label="Daily Rate"
            placeholder="Daily Rate"
            type="number"
            slotProps={{
              htmlInput: {
                type: "number",
                min: 0.0,
                step: 0.01,
              },
            }}
            error={!!errors.dailyRate}
            helperText={errors.dailyRate?.message}
            fullWidth={true}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          <Controller
            control={control}
            name="employmentState"
            render={({ field }) => (
              <TextField
                {...field}
                select={true}
                label="Employment state"
                placeholder="Employment state"
                error={!!errors.employmentState}
                helperText={errors.employmentState?.message}
                fullWidth={true}
                disabled
              >
                {Object.values(CreateProfessionalDTOEmploymentStateEnum).map(
                  (state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ),
                )}
              </TextField>
            )}
          />
        </Grid2>
      </Grid2>

      <Typography variant="h6">Skills</Typography>
      <Divider />
      <ErrorText text={errors.skills?.root?.message} />
      <Grid2 container spacing={2}>
        {skillFields.fields.map((field, index) => (
          <Grid2 key={field.id} size={6}>
            <TextField
              {...register(`skills.${index}.value` as const)}
              label="Skill"
              placeholder="Skill"
              error={!!errors.skills?.[index]?.value}
              helperText={errors.skills?.[index]?.value?.message}
              slotProps={slotProps(() => skillFields.remove(index))}
              fullWidth
            />
          </Grid2>
        ))}
      </Grid2>

      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          onClick={() =>
            skillFields.append({
              value: "",
            })
          }
        >
          Add skill
        </Button>
      </Box>

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
    </form>
  );
}
