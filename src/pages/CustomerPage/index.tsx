import useCustomerPage from "./index.hook.ts";
import Loading from "../../components/Loading";
import { Alert, Card, CardContent, Container, Typography } from "@mui/material";
import PersonalInformation from "../../components/PersonalInformation";
import CustomerInformation from "../../components/CustomerInformation";
import CustomerJobOfferInformation from "../../components/CustomerJobOfferInformation";

export default function CustomerPage() {
  const { customer, onJobOfferClick } = useCustomerPage();

  if (customer.isPending) return <Loading />;

  if (customer.isError)
    return <Alert severity="error">{customer.error.message}</Alert>;

  return (
    <Container>
      <Card sx={{ borderRadius: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h4">Customer information</Typography>
          <CustomerInformation customer={customer.data} />

          <Typography variant="h4" sx={{ mt: 4 }}>
            Personal information
          </Typography>
          <PersonalInformation contact={customer.data.contact} />

          <Typography variant="h4" sx={{ mt: 4 }}>
            Customer job offerings
          </Typography>
          <CustomerJobOfferInformation
            customer={customer.data}
            onItemClick={onJobOfferClick}
          />
        </CardContent>
      </Card>
    </Container>
  );
}
