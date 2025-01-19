import useMessagesPage from "./index.hook.ts";
import {
  Alert,
  Box,
  Container,
  List,
  ListItemButton,
  Pagination,
  Typography,
} from "@mui/material";
import Loading from "../../components/Loading";
import MessageListItem from "../../components/MessageListItem";
import { useNavigate } from "react-router-dom";

export default function MessagesPage() {
  const navigate = useNavigate();
  const { messagesQuery, page, setPage } = useMessagesPage();

  if (messagesQuery.isPending) return <Loading />;

  if (messagesQuery.isError)
    return (
      <Box sx={{ p: 5 }}>
        <Alert severity="error">{messagesQuery.error.message}</Alert>
      </Box>
    );

  return (
    <Container>
      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography variant="h3" sx={{ flexGrow: 1 }}>
          Messages
        </Typography>
      </Box>

      <List sx={{ width: "100%" }}>
        {messagesQuery.data.content?.map((message) => (
          <ListItemButton
            key={message.id}
            onClick={() => navigate(`/ui/messages/${message.id}`)}
            sx={{ width: "100%" }}
          >
            <MessageListItem message={message} style={{ width: "100%" }} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={messagesQuery.data.totalPages}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
        />
      </Box>
    </Container>
  );
}
