import { JobOfferHistoryDTO, ProfessionalDTO } from "../../apis/crm/api.ts";
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import useJobOfferHistory from "./index.hook.ts";
import dayjs from "dayjs";
import { UseQueryResult } from "@tanstack/react-query";
import ErrorAlert from "../ErrorAlert";
import { OpenInNew } from "@mui/icons-material";

export default function JobOfferHistory({
  history,
  onProfessionalClick,
}: {
  history: JobOfferHistoryDTO[];
  onProfessionalClick: (professional: ProfessionalDTO) => void;
}) {
  const { getProfessional } = useJobOfferHistory(history);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell align="right">Status</TableCell>
          <TableCell align="right">Assigned professional</TableCell>
          <TableCell align="right">Notes</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {history.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              {dayjs(item.logTime).format("MMM D, YYYY h:mm A")}
            </TableCell>
            <TableCell align="right">{item.currentStatus}</TableCell>
            <TableCell align="right">
              <ProfessionalCell
                id={item.assignedProfessional ?? null}
                getProfessional={getProfessional}
                onProfessionalClick={onProfessionalClick}
              />
            </TableCell>
            <TableCell align="right">{item.note}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ProfessionalCell({
  id,
  getProfessional,
  onProfessionalClick,
}: {
  id: number | null;
  getProfessional: (id: number) => UseQueryResult<ProfessionalDTO, Error>;
  onProfessionalClick: (professional: ProfessionalDTO) => void;
}) {
  if (id === null) return <>-</>;

  const professional = getProfessional(id);

  if (professional.isPending) return <CircularProgress />;

  if (professional.isError)
    return <ErrorAlert text={professional.error.message} />;

  return (
    <Button
      onClick={() => onProfessionalClick(professional.data)}
      endIcon={<OpenInNew />}
    >
      {`${professional.data.contact.name} ${professional.data.contact.surname}`}
    </Button>
  );
}
