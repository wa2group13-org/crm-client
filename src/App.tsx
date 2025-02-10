import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import MessagesPage from "./pages/MessagesPage";
import MessagePage from "./pages/MessagePage";
import MessageCreatePage from "./pages/MessageCreatePage";
import DocumentsPage from "./pages/DocumentsPage";
import DocumentPage from "./pages/DocumentPage";
import DocumentCreatePage from "./pages/DocumentCreatePage";
import Page404 from "./pages/Page404";

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
                    path="professionals/:professionalId/update"
                    element={<CreateProfessionalPage />}
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
                    path="customers/:customerId/update"
                    element={<CreateCustomerPage />}
                  />
                  <Route
                    path="customers/create"
                    element={<CreateCustomerPage />}
                  />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="jobs" element={<JobOffersPage />} />
                  <Route path="jobs/:jobOfferId" element={<JobOfferPage />} />
                  <Route path="jobs/create" element={<JobOfferCreatePage />} />
                  <Route path="messages" element={<MessagesPage />} />
                  <Route path="messages/:messageId" element={<MessagePage />} />
                  <Route
                    path="messages/create"
                    element={<MessageCreatePage />}
                  />
                  <Route path="documents" element={<DocumentsPage />} />
                  <Route
                    path="documents/:documentId"
                    element={<DocumentPage />}
                  />
                  <Route
                    path="documents/create"
                    element={<DocumentCreatePage />}
                  />
                  <Route path="*" element={<Page404 />} />
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
