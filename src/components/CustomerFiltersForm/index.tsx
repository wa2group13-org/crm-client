import useCustomerFiltersForm from "./index.hook.ts";
import { CustomerFilters } from "../../apis/crm/api.ts";
import { SubmitHandler } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";

export default function CustomerFiltersForm({
  filters,
  onSubmit,
}: {
  filters: CustomerFilters;
  onSubmit: SubmitHandler<CustomerFilters>;
}) {
  const { form } = useCustomerFiltersForm(filters);
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
        <TField name={"byLocation.byStreet"} />
        <TField name={"byLocation.byCivic"} />
        <TField name={"byLocation.byCity"} />
        <TField name={"byLocation.byPostalCode"} />
        <TField name={"byLocation.byCountry"} />

        <Button type="submit" variant="contained">
          Filter
        </Button>
      </Box>
    </form>
  );
}
