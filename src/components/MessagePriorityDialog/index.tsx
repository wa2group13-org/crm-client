import useMessagePriorityDialog from "./index.hook.ts";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MessagePriorityForm from "../MessagePriorityForm";
import { CSSProperties } from "react";
import { MessageDTO } from "../../apis/crm/api.ts";

export default function MessagePriorityDialog({
  defaultMessage,
  open,
  style,
  onCancel,
  onSubmit,
}: {
  defaultMessage: MessageDTO;
  open: boolean;
  style?: CSSProperties;
  onCancel?: () => void;
  onSubmit?: () => void;
}) {
  const { isPending, error, onPrioritySubmit } = useMessagePriorityDialog(
    defaultMessage,
    onSubmit ?? (() => {}),
  );

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Update message status</DialogTitle>
      <DialogContent sx={{ minWidth: "500px" }}>
        <DialogContentText sx={{ mb: 2 }}>
          Update the current message priority.
        </DialogContentText>
        <MessagePriorityForm
          defaultMessage={defaultMessage}
          onSubmit={onPrioritySubmit}
          error={error}
          isPending={isPending}
          style={style}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
