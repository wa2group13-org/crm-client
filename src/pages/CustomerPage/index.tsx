import useCustomerPage from "./index.hook.ts";
import Loading from "../../components/Loading";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import PersonalInformation from "../../components/PersonalInformation";
import CustomerInformation from "../../components/CustomerInformation";
import CustomerJobOfferInformation from "../../components/CustomerJobOfferInformation";
import { Add } from "@mui/icons-material";

export default function CustomerPage() {
  const { customer, onJobOfferClick, onJobOfferAdd, isLogin, onUpdateClick } =
    useCustomerPage();

  if (customer.isPending) return <Loading />;

  if (customer.isError)
    return <Alert severity="error">{customer.error.message}</Alert>;

  return (
    <Container>
      <Card sx={{ borderRadius: 4, p: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="h4">Customer information</Typography>
            {isLogin && (
              <Button
                onClick={() => onUpdateClick(customer.data)}
                variant="outlined"
              >
                Update information
              </Button>
            )}
          </Box>
          <CustomerInformation customer={customer.data} />

          <Typography variant="h4" sx={{ mt: 4 }}>
            Personal information
          </Typography>
          <PersonalInformation contact={customer.data.contact} />

          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 4 }}>
            <Typography variant="h4">Customer job offerings</Typography>

            {isLogin && (
              <Button
                startIcon={<Add />}
                variant="outlined"
                onClick={onJobOfferAdd}
              >
                Create offer
              </Button>
            )}
          </Box>
          <CustomerJobOfferInformation
            customer={customer.data}
            onItemClick={onJobOfferClick}
          />
        </CardContent>
      </Card>
    </Container>
  );
}
