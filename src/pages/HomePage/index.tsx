import NavBar from "../../components/NavBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const HomePage = () => {
  return (
    <Box>
      <NavBar />
      <Box sx={{ my: 10 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

HomePage.displayName = "HomePage";

export default HomePage;
