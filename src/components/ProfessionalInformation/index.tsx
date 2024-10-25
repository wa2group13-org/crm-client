import {
  ProfessionalDTO,
  ProfessionalDTOEmploymentStateEnum,
} from "../../apis/crm/api.ts";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import React from "react";
import { moneyFormat } from "../../utils/moneyFormat.ts";

function colorFromEmploymentState(
  state: ProfessionalDTOEmploymentStateEnum,
): string {
  switch (state) {
    case "Available":
      return "green";
    case "Employed":
      return "yellow";
    case "NotAvailable":
      return "red";
  }
}

export default function ProfessionalInformation({
  professional,
}: {
  professional: ProfessionalDTO;
}) {
  return (
    <Card>
      <CardHeader
        title={<Typography variant={"h4"}>Professional information</Typography>}
      />
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableLabel>Daily rate</TableLabel>
              <TableCell>
                <Typography>{`${moneyFormat.format(professional.dailyRate)} / Day`}</Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableLabel>Current employment state</TableLabel>
              <TableCell>
                <Box sx={{ display: "flex" }}>
                  <CircleIcon
                    sx={{
                      color: colorFromEmploymentState(
                        professional.employmentState,
                      ),
                    }}
                  />{" "}
                  <Typography>{professional.employmentState}</Typography>
                </Box>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableLabel>Skills</TableLabel>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  {[...professional.skills].map((skill) => (
                    <SingleSkill key={skill} skill={skill} />
                  ))}
                </Box>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableLabel>Notes</TableLabel>
              <TableCell>{professional.notes}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function SingleSkill({ skill }: { skill: string }) {
  return (
    <Chip label={skill} variant="outlined" />
    // <Card variant={"outlined"}>
    //     <Card variant="outlined" sx={{margin: "10px"}}>
    //         <CardContent>
    //             <Typography fontWeight={"bold"}>{skill}</Typography>
    //         </CardContent>
    //     </Card>
    // </Card>
  );
}

function TableLabel({ children }: { children: React.ReactNode }) {
  return (
    <TableCell style={{ verticalAlign: "top" }}>
      <Typography>{children}</Typography>
    </TableCell>
  );
}
