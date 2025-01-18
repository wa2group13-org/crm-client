import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useApp } from "./App.hooks.ts";
import ProfessionalPage from "./pages/ProfessionalPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfessionalsPage from "./pages/ProfessionalsPage";
import CreateProfessionalPage from "./pages/CreateProfessionalPage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { crmTheme } from "./theme/theme.ts";
import UserContextProvider from "./contexts/userContext.tsx";
import ProfilePage from "./pages/ProfilePage";
import CustomersPage from "./pages/CustomersPage";
import CreateCustomerPage from "./pages/CreateCustomerPage";
import CustomerPage from "./pages/CustomerPage";
import JobOfferCreatePage from "./pages/JobOfferCreatePage";
import JobOfferPage from "./pages/JobOfferPage";
import JobOffersPage from "./pages/JobOffersPage";

const queryClient = new QueryClient();

export function App() {
  useApp();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={crmTheme}>
        <CssBaseline>
          <UserContextProvider>
            <Router>
              <Routes>
                <Route path="/ui" element={<HomePage />}>
                  <Route path="professionals" element={<ProfessionalsPage />} />
                  <Route
                    path="professionals/:professionalId"
                    element={<ProfessionalPage />}
                  />
                  <Route
                    path="professionals/create"
                    element={<CreateProfessionalPage />}
                  />
                  <Route path="customers" element={<CustomersPage />} />
                  <Route
                    path="customers/:customerId"
                    element={<CustomerPage />}
                  />
                  <Route
                    path="customers/create"
                    element={<CreateCustomerPage />}
                  />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="jobs" element={<JobOffersPage />} />
                  <Route path="jobs/:jobOfferId" element={<JobOfferPage />} />
                  <Route path="jobs/create" element={<JobOfferCreatePage />} />
                </Route>
              </Routes>
            </Router>
          </UserContextProvider>
        </CssBaseline>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
