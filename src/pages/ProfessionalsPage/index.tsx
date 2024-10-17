import useProfessionalsPage from "./index.hooks.ts";
import { Container, List, ListItemButton, Pagination } from "@mui/material";
import ProfessionalItem from "../../components/ProfessionalItem";
import { useNavigate } from "react-router-dom";

export default function ProfessionalsPage() {
  const navigate = useNavigate();
  const { page, setPage, professionals } = useProfessionalsPage();

  if (professionals.isPending) return <span>Loading...</span>;

  if (professionals.isError)
    return <span>Error: {professionals.error.message}</span>;

  return (
    <Container>
      <List sx={{ width: "100%" }}>
        {professionals.data.content?.map((p) => (
          <ListItemButton
            key={p.id}
            onClick={() => navigate(`/ui/professionals/${p.id}`)}
            sx={{ width: "100%" }}
          >
            <ProfessionalItem professional={p} style={{ width: "100%" }} />
          </ListItemButton>
        ))}
      </List>

      <Pagination
        count={professionals.data.totalPages}
        page={page}
        onChange={(_, newPage) => setPage(newPage)}
      />
    </Container>
  );
}
