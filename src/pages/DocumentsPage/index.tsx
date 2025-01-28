import useDocumentsPage from "./index.hook.ts";
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
import DocumentListItem from "../../components/DocumentListItem";
import { useNavigate } from "react-router-dom";

export default function DocumentsPage() {
  const { documentsQuery, page, setPage } = useDocumentsPage();
  const navigate = useNavigate();

  if (documentsQuery.isPending) return <Loading />;

  if (documentsQuery.isError)
    return (
      <Box sx={{ p: 5 }}>
        <Alert severity="error">{documentsQuery.error.message}</Alert>
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
        {documentsQuery.data.content?.map((document) => (
          <ListItemButton
            key={document.id}
            onClick={() => navigate(`/ui/documents/${document.id}`)}
            sx={{ width: "100%" }}
          >
            <DocumentListItem document={document} style={{ width: "100%" }} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={documentsQuery.data.totalPages}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
        />
      </Box>
    </Container>
  );
}
