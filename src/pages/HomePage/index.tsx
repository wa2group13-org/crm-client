import NavBar from "../../components/NavBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const HomePage = () => {
  return (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  );
};

HomePage.displayName = "HomePage";

export default HomePage;
