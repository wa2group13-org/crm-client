import useMessagesPage from "./index.hook.ts";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  List,
  ListItemButton,
  Pagination,
  Popover,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Loading from "../../components/Loading";
import MessageListItem from "../../components/MessageListItem";
import { useNavigate } from "react-router-dom";
import { GetMessagesSortByEnum } from "../../apis/crm/api.ts";
import { useState } from "react";
import { Sort } from "@mui/icons-material";

export default function MessagesPage() {
  const navigate = useNavigate();
  const { messagesQuery, page, setPage, setSortBy, sortBy } = useMessagesPage();

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
        <SortMessages sortBy={sortBy} setSort={setSortBy} />
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

function SortMessages({
  sortBy,
  setSort,
}: {
  sortBy: GetMessagesSortByEnum;
  setSort: (s: GetMessagesSortByEnum) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={(e) => {
          setOpen(true);
          setAnchorEl(e.currentTarget);
        }}
        startIcon={<Sort />}
      >
        Sort
      </Button>
      <Popover open={open} onClose={() => setOpen(false)} anchorEl={anchorEl}>
        <Box sx={{ m: 2 }}>
          <Typography>Sort messages</Typography>
          <FormControl>
            <RadioGroup
              row
              value={sortBy}
              onChange={(event, value) => {
                event?.preventDefault();
                setSort(value as typeof sortBy);
                setOpen(false);
              }}
            >
              {Object.values(GetMessagesSortByEnum).map((sort) => (
                <FormControlLabel
                  key={sort}
                  value={sort}
                  control={<Radio />}
                  label={sort}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </Popover>
    </>
  );
}
