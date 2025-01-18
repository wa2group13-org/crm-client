import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import {
  Autocomplete,
  CircularProgress,
  debounce,
  TextField,
} from "@mui/material";

export function FormAutocompleteField<
  TOption extends { id: string | number; label: string },
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  options,
  loading,
  label,
  onInputChange,
  debounceTime,
}: UseControllerProps<TFieldValues, TName> & {
  options: TOption[];
  loading?: boolean;
  label?: string;
  onInputChange?: (input: string) => void;
  debounceTime?: number;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const { value, onChange, ref, onBlur, name, disabled } = field;

        return (
          <Autocomplete
            options={options}
            value={options.find((option) => option.id === value) ?? null}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_event, value) => onChange(value?.id)}
            disabled={disabled}
            loading={loading}
            onInputChange={debounce(
              (_event, value) => onInputChange?.(value),
              debounceTime,
            )}
            onBlur={onBlur}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={ref}
                label={label}
                placeholder={label}
                name={name}
                error={!!error?.message}
                helperText={error?.message}
                slotProps={{
                  input: {
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  },
                }}
              />
            )}
          />
        );
      }}
    />
  );
}
