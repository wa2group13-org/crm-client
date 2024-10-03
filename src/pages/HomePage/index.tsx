import NavBar from "../../components/NavBar";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <p>Hello from Home!</p>
      <Outlet />
    </div>
  );
};

HomePage.displayName = "HomePage";

export default HomePage;
