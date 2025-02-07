import {
  JobOfferFilters,
  JobOfferFiltersByStatusEnum,
} from "../../apis/crm/api.ts";
import useJobOfferFiltersForm from "./index.hook.ts";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Controller, SubmitHandler } from "react-hook-form";

export default function JobOfferFiltersForm({
  filters,
  onSubmit,
}: {
  filters?: JobOfferFilters;
  onSubmit: SubmitHandler<JobOfferFilters>;
}) {
  const { form } = useJobOfferFiltersForm({ filters });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Box
        sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}
      >
        <Controller
          control={form.control}
          name="byStatus"
          render={({ field }) => (
            <TextField
              {...field}
              select={true}
              label="byStatus"
              placeholder="byStatus"
              fullWidth
            >
              <MenuItem value="">None</MenuItem>
              {Object.values(JobOfferFiltersByStatusEnum).map((state) => (
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
