import { MessageDTO } from "../../apis/crm/api.ts";
import { CSSProperties } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import {
  Drafts,
  Email,
  MarkEmailRead,
  MarkEmailUnread,
  Delete,
  Unsubscribe,
} from "@mui/icons-material";

export default function MessageListItem({
  style,
  message,
}: {
  style?: CSSProperties;
  message: MessageDTO;
}) {
  // const {} = useMessageListItem();

  return (
    <Box style={style}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <MessageAvatar message={message} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
              {message.sender}
            </Typography>

            <Typography sx={{ flexGrow: 0 }}>
              {dayjs(message.date).format("dd MMM YYYY")}
            </Typography>
          </Box>

          <Typography textOverflow="ellipsis">
            {message.subject ?? message.body}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function MessageAvatar({ message }: { message: MessageDTO }) {
  const Icon = (() => {
    switch (message.status) {
      case "Done":
        return Email;
      case "Failed":
        return Unsubscribe;
      case "Discarded":
        return Delete;
      case "Processing":
        return Drafts;
      case "Received":
        return MarkEmailUnread;
      case "Read":
        return MarkEmailRead;
    }
  })();

  return (
    <Avatar>
      <Icon />
    </Avatar>
  );
}
