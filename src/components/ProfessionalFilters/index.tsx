import useProfessionalFilters from "./index.hook.ts";
import {
  ProfessionalFilters,
  ProfessionalFiltersByEmploymentStateEnum,
} from "../../apis/crm/api.ts";
import { Controller, SubmitHandler } from "react-hook-form";
import { Autocomplete, Box, Button, MenuItem, TextField } from "@mui/material";

export default function ProfessionalFiltersForm({
  filters,
  onSubmit,
}: {
  filters: ProfessionalFilters;
  onSubmit: SubmitHandler<ProfessionalFilters>;
}) {
  const { form } = useProfessionalFilters(filters);
  const register = form.register;

  const TField = (props: { name: Parameters<typeof register>[0] }) => {
    return (
      <TextField
        {...register(props.name)}
        label={props.name}
        placeholder={props.name}
        name={props.name}
      />
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Box
        sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}
      >
        <TField name={"byFullName"} />

        <Controller
          control={form.control}
          name="byEmploymentState"
          render={({ field }) => (
            <TextField
              {...field}
              select={true}
              label="byEmploymentState"
              placeholder="byEmploymentState"
            >
              <MenuItem value="">None</MenuItem>
              {Object.values(ProfessionalFiltersByEmploymentStateEnum).map(
                (state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ),
              )}
            </TextField>
          )}
        />

        <Controller
          control={form.control}
          name={"bySkills"}
          render={({ field, fieldState: { error } }) => {
            const { value, onChange, ref, onBlur, name, disabled } = field;

            return (
              <Autocomplete
                options={[]}
                value={value}
                onChange={(_event, value) => onChange(value)}
                onBlur={onBlur}
                disabled={disabled}
                multiple
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputRef={ref}
                    label={"bySkills"}
                    placeholder={"bySkills"}
                    name={name}
                    error={!!error?.message}
                    helperText={error?.message}
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: <>{params.InputProps.endAdornment}</>,
                      },
                    }}
                  />
                )}
              />
            );
          }}
        />

        <TField name={"byLocation.byCity"} />
        <TField name={"byLocation.byCivic"} />
        <TField name={"byLocation.byCountry"} />
        <TField name={"byLocation.byStreet"} />
        <TField name={"byLocation.byPostalCode"} />

        <Button type="submit" variant="contained">
          Filter
        </Button>
      </Box>
    </form>
  );
}
