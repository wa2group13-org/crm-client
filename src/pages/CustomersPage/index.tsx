import {
  Alert,
  Box,
  Button,
  Container,
  List,
  ListItemButton,
  Pagination,
  Typography,
} from "@mui/material";
import useCustomersPage from "./index.hook.ts";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import CustomerListItem from "../../components/CustomerListItem";

export default function CustomersPage() {
  const navigate = useNavigate();
  const { page, setPage, customers } = useCustomersPage();

  if (customers.isPending) return <Loading />;

  if (customers.isError)
    return (
      <Box sx={{ p: 5 }}>
        <Alert severity="error">{customers.error.message}</Alert>
      </Box>
    );

  return (
    <Container>
      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography variant="h3" sx={{ flexGrow: 1 }}>
          Professionals
        </Typography>
        <Button
          variant="contained"
          sx={{ flexGrow: 0 }}
          onClick={() => navigate("/ui/professionals/create")}
        >
          Add professional
        </Button>
      </Box>

      <List sx={{ width: "100%" }}>
        {customers.data.content?.map((customer) => (
          <ListItemButton
            key={customer.id}
            onClick={() => navigate(`/ui/professionals/${customer.id}`)}
            sx={{ width: "100%" }}
          >
            <CustomerListItem customer={customer} style={{ width: "100%" }} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ display: "flex", justContent: "center" }}>
        <Pagination
          count={customers.data.totalPages}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
        />
      </Box>
    </Container>
  );
}
