import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MessageStatusForm from "../MessageStatusForm";
import { CSSProperties } from "react";
import { MessageDTO } from "../../apis/crm/api.ts";
import useMessageStatusDialog from "./index.hook.ts";

export default function MessageStatusDialog({
  defaultMessage,
  onCancel,
  onSubmit,
  style,
  open,
}: {
  open: boolean;
  style?: CSSProperties;
  onCancel?: () => void;
  onSubmit?: () => void;
  defaultMessage: MessageDTO;
}) {
  const { isPending, error, onStatusSubmit } = useMessageStatusDialog(
    defaultMessage,
    onSubmit ?? (() => {}),
  );

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Update message status</DialogTitle>
      <DialogContent sx={{ minWidth: "500px" }}>
        <DialogContentText sx={{ mb: 2 }}>
          Update the current message status.
        </DialogContentText>
        <MessageStatusForm
          defaultMessage={defaultMessage}
          onSubmit={onStatusSubmit}
          error={error}
          isPending={isPending}
          style={style}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
