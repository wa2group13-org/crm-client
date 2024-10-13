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
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";

const slotProps = (onClick: () => void) => ({
  input: {
    endAdornment: (
      <InputAdornment position={"end"}>
        <IconButton onClick={onClick}>
          <RemoveCircle />
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
        error={!!errors.notes}
        helperText={errors.notes?.message}
        fullWidth={true}
      />

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

      {errors.skills && <p>{errors.skills?.message}</p>}
      <Box sx={{ display: "flex" }}>
        {skillFields.fields.map((field, index) => (
          <TextField
            {...register(`skills.${index}.value` as const)}
            key={field.id}
            label="Skill"
            placeholder="Skill"
            error={!!errors.skills?.[index]?.value}
            helperText={errors.skills?.[index]?.value?.message}
            slotProps={slotProps(() => skillFields.remove(index))}
          />
        ))}
      </Box>

      <Button
        onClick={() =>
          skillFields.append({
            value: "",
          })
        }
      >
        Add skill
      </Button>

      {error && <p>{error.message}</p>}

      <Button onClick={onCancel} variant="contained">
        Cancel
      </Button>

      <Button type="submit" variant="contained" disabled={isPending}>
        Submit {isPending && <CircularProgress />}
      </Button>
    </form>
  );
}
