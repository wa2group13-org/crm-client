import { CustomerDTO } from "../../apis/crm/api.ts";
import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

export default function CustomerInformation({
  customer,
}: {
  customer: CustomerDTO;
}) {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableLabel>Notes</TableLabel>
          <TableValue>{customer.note}</TableValue>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function TableLabel({ children }: { children: ReactNode }) {
  return (
    <TableCell style={{ verticalAlign: "top" }}>
      <Typography>{children}</Typography>
    </TableCell>
  );
}

function TableValue({ children }: { children: ReactNode }) {
  return (
    <TableCell>
      <Typography>{children}</Typography>
    </TableCell>
  );
}
