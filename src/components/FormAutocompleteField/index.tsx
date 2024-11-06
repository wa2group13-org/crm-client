import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

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
}: UseControllerProps<TFieldValues, TName> & {
  options: TOption[];
  loading?: boolean;
  label?: string;
  onInputChange?: (input: string) => void;
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
            onChange={(_event, value) => onChange(value?.id)}
            disabled={disabled}
            loading={loading}
            onInputChange={(_event, value) => onInputChange?.(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={ref}
                onBlur={onBlur}
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
