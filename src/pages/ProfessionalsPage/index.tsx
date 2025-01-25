import useProfessionalsPage from "./index.hooks.ts";
import {
  Box,
  Button,
  Container,
  List,
  ListItemButton,
  Pagination,
  Popover,
  Typography,
} from "@mui/material";
import ProfessionalItem from "../../components/ProfessionalItem";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorAlert from "../../components/ErrorAlert";
import { ProfessionalFilters } from "../../apis/crm/api.ts";
import { useState } from "react";
import { FilterList } from "@mui/icons-material";
import ProfessionalFiltersForm from "../../components/ProfessionalFilters";

export default function ProfessionalsPage() {
  const navigate = useNavigate();
  const { page, setPage, professionals, isLogin, filters, setFilters } =
    useProfessionalsPage();

  if (professionals.isPending) return <Loading />;

  if (professionals.isError)
    return <ErrorAlert text={professionals.error.message} />;

  return (
    <Container>
      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography variant="h3" sx={{ flexGrow: 1 }}>
          Professionals
        </Typography>

        <ProfessionalFiltersButton filters={filters} setFilters={setFilters} />

        {isLogin && (
          <Button
            variant="contained"
            sx={{ flexGrow: 0 }}
            onClick={() => navigate("/ui/professionals/create")}
          >
            Add professional
          </Button>
        )}
      </Box>
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

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={professionals.data.totalPages}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
        />
      </Box>
    </Container>
  );
}

function ProfessionalFiltersButton({
  filters,
  setFilters,
}: {
  filters: ProfessionalFilters;
  setFilters: (filter: ProfessionalFilters) => void;
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
        startIcon={<FilterList />}
      >
        Filter
      </Button>

      <Popover open={open} onClose={() => setOpen(false)} anchorEl={anchorEl}>
        <Box sx={{ m: 2, maxWidth: "500px" }}>
          <Typography>Professional filters</Typography>
          <ProfessionalFiltersForm
            filters={filters}
            onSubmit={(filters, event) => {
              event?.preventDefault();
              setFilters(filters);
            }}
          />
        </Box>
      </Popover>
    </>
  );
}
