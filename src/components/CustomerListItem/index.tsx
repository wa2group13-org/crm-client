import { Avatar, Box, Typography } from "@mui/material";
import { CSSProperties } from "react";
import { CustomerDTO } from "../../apis/crm/api.ts";
import useCustomerListItem from "./index.hook.ts";

export default function CustomerListItem({
  style,
  customer,
}: {
  style?: CSSProperties;
  customer: CustomerDTO;
}) {
  const { avatarString } = useCustomerListItem(customer);

  return (
    <Box style={style}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Avatar sx={{ mt: 1 }}>{avatarString}</Avatar>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">{`${customer.contact.name} ${customer.contact.surname}`}</Typography>

          <Typography>Job offerings: {customer.jobOffers.length}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
