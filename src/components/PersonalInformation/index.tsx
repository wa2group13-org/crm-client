import { ContactDTO } from "../../apis/crm/api.ts";
import {
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { CSSProperties } from "react";

export default function PersonalInformation({
  contact,
  style,
}: {
  contact: ContactDTO;
  style?: CSSProperties;
}) {
  return (
    <Table style={style}>
      <TableBody>
        <TableRow>
          <TableLabel label={"Name"} />
          <TableCell>{contact.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableLabel label={"Surname"} />
          <TableCell>{contact.surname}</TableCell>
        </TableRow>
        <TableRow>
          <TableLabel label={"SSN"} />
          <TableCell>{contact.ssn}</TableCell>
        </TableRow>
        <TableRow>
          <TableLabel label={"Addresses"} />
          <TableCell>
            <List>
              {contact.addresses.map((address) => (
                <ListItem key={address.id}>
                  {`${address.street} ${address.civic}, ${address.city} ${address.postalCode}`}
                </ListItem>
              ))}
            </List>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableLabel label={"Telephone contacts"} />
          <TableCell>
            <List>
              {contact.telephones.map((telephone) => (
                <ListItem key={telephone.id}>
                  <Link href={`tel:${telephone.number}`}>
                    {telephone.number}
                  </Link>
                </ListItem>
              ))}
            </List>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableLabel label={"Emails"} />
          <TableCell>
            <List>
              {contact.emails.map((email) => (
                <ListItem key={email.id}>
                  <Link href={`mailto:${email.email}`}>{email.email}</Link>
                </ListItem>
              ))}
            </List>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function TableLabel({ label }: { label: string }) {
  return (
    <TableCell style={{ verticalAlign: "top" }}>
      <Typography>{label}</Typography>
    </TableCell>
  );
}
