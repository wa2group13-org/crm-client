import useJobOfferForm from "./index.hook.ts";
import { CreateJobOfferDTO, CustomerDTO } from "../../apis/crm/api.ts";
import { SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ErrorText from "../ErrorText";
import { Delete } from "@mui/icons-material";
import { FormAutocompleteField } from "../FormAutocompleteField";

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

export default function JobOfferForm({
  defaultJobOffer,
  customerOwner,
  onSubmit,
  onCancel,
  error,
  isPending,
}: {
  defaultJobOffer?: CreateJobOfferDTO;
  customerOwner?: CustomerDTO;
  onSubmit: SubmitHandler<CreateJobOfferDTO>;
  onCancel?: () => void;
  error?: Error | null;
  isPending?: boolean;
}) {
  const {
    handleSubmit,
    control,
    errors,
    register,
    skillFields,
    customers,
    customersPending,
    onCustomerNameChange,
  } = useJobOfferForm(defaultJobOffer, customerOwner);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          {...register("description")}
          label="Description"
          placeholder="Description"
          error={!!errors.description?.message}
          helperText={errors.description?.message}
          fullWidth
        />

        <TextField
          {...register("duration", { valueAsNumber: true })}
          type="number"
          label="Duration"
          placeholder="Duration"
          error={!!errors.duration?.message}
          helperText={errors.duration?.message}
          slotProps={{
            htmlInput: {
              type: "number",
              min: 0.0,
              step: 0.01,
            },
          }}
          fullWidth
        />

        <FormAutocompleteField
          control={control}
          name="customerId"
          label="Job creator (customer)"
          onInputChange={onCustomerNameChange}
          loading={customersPending}
          options={customers}
          debounceTime={200}
        />

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
      </Box>
    </form>
  );
}
