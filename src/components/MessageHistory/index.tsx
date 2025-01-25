import useMessageHistory from "./index.hook.ts";
import {
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { CSSProperties } from "react";
import { MessageDTO } from "../../apis/crm/api.ts";
import dayjs from "dayjs";

export default function MessageHistory({
  style,
  message,
}: {
  style?: CSSProperties;
  message: MessageDTO;
}) {
  const { messageHistoryQuery } = useMessageHistory(message);

  if (messageHistoryQuery.isPending)
    return (
      <>
        <Typography>
          Loading message history...
          <CircularProgress />
        </Typography>
      </>
    );

  if (messageHistoryQuery.isError)
    return <Alert severity="error">{messageHistoryQuery.error.message}</Alert>;

  return (
    <Table style={style}>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell align="right">Status</TableCell>
          <TableCell align="right">Comment</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {messageHistoryQuery.data
          .sort((a, b) => dayjs(b.timestamp).unix() - dayjs(a.timestamp).unix())
          .map((item, index) => (
            // TODO: add id when the historyDTO will get one
            <TableRow key={index}>
              <TableCell>
                {dayjs(item.timestamp).format("MMM D, YYYY h:mm A")}
              </TableCell>
              <TableCell align="right">{item.status}</TableCell>
              <TableCell align="right">{item.comment}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
