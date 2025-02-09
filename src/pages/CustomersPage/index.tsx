import {
  Alert,
  Box,
  Button,
  Container,
  List,
  ListItemButton,
  Pagination,
  Popover,
  Typography,
} from "@mui/material";
import useCustomersPage from "./index.hook.ts";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import CustomerListItem from "../../components/CustomerListItem";
import { CustomerFilters } from "../../apis/crm/api.ts";
import { useState } from "react";
import CustomerFiltersForm from "../../components/CustomerFiltersForm";
import { FilterList } from "@mui/icons-material";

export default function CustomersPage() {
  const navigate = useNavigate();
  const { page, setPage, customers, isLogin, filters, setFilters } =
    useCustomersPage();

  if (customers.isPending) return <Loading />;

  if (customers.isError)
    return (
      <Box sx={{ p: 5 }}>
        <Alert severity="error">{customers.error.message}</Alert>
      </Box>
    );

  return (
    <Container>
      <Box sx={{ display: "flex", mb: 2, gap: 2 }}>
        <Typography variant="h3" sx={{ flexGrow: 1 }}>
          Customers
        </Typography>

        <CustomersFiltersButton filters={filters} setFilters={setFilters} />

        {isLogin && (
          <Button
            variant="contained"
            sx={{ flexGrow: 0 }}
            onClick={() => navigate("/ui/customers/create")}
          >
            Add customer
          </Button>
        )}
      </Box>

      <List sx={{ width: "100%" }}>
        {customers.data.content?.map((customer) => (
          <ListItemButton
            key={customer.id}
            onClick={() => navigate(`/ui/customers/${customer.id}`)}
            sx={{ width: "100%" }}
          >
            <CustomerListItem customer={customer} style={{ width: "100%" }} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={customers.data.totalPages}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
        />
      </Box>
    </Container>
  );
}

function CustomersFiltersButton({
  filters,
  setFilters,
}: {
  filters: CustomerFilters;
  setFilters: (filters: CustomerFilters) => void;
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
          <Typography>Customers filters</Typography>
          <CustomerFiltersForm
            filters={filters}
            onSubmit={(filters, event) => {
              event?.preventDefault();
              setFilters(filters);
              setOpen(false);
            }}
          />
        </Box>
      </Popover>
    </>
  );
}
