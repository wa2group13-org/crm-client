import NavBar from "../../components/NavBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "../../components/Footer";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Box sx={{ my: 10, minHeight: "100vh" }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

HomePage.displayName = "HomePage";

export default HomePage;
