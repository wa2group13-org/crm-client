import {
  GenericFilterDTO,
  GenericFilterDTOGroupEnum,
  GenericFilterDTOOpEnum,
} from "../../apis/crm-analytics/api.ts";
import { Controller, SubmitHandler } from "react-hook-form";
import useAnalyticsFilterForm from "./index.hook.ts";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function AnalyticsFilterForm({
  filters,
  onSubmit,
}: {
  filters: GenericFilterDTO;
  onSubmit: SubmitHandler<GenericFilterDTO>;
}) {
  const { form } = useAnalyticsFilterForm({ filters });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Box
        sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}
      >
        <Controller
          control={form.control}
          name={"base"}
          render={({ field: { value, onChange, ...others } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...others}
                value={dayjs(value)}
                onChange={(value) => onChange(value?.toISOString())}
              />
            </LocalizationProvider>
          )}
        />

        <Controller
          control={form.control}
          name="op"
          render={({ field }) => (
            <TextField
              {...field}
              select={true}
              label="By operation"
              placeholder="By operation"
              fullWidth
            >
              {Object.values(GenericFilterDTOOpEnum).map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          control={form.control}
          name="group"
          render={({ field }) => (
            <TextField
              {...field}
              select={true}
              label="By operation"
              placeholder="By operation"
              fullWidth
            >
              {Object.values(GenericFilterDTOGroupEnum).map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Button type="submit" variant="contained">
          Filter
        </Button>
      </Box>
    </form>
  );
}
