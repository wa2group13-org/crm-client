"use strict";

import { useUser } from "../../contexts/userContext.tsx";
import { useNavigate } from "react-router-dom";

export default function useNavBar() {
  const user = useUser();
  const navigate = useNavigate();

  function onLogin() {
    if (!user) return;
    window.location.href = user.loginUrl;
  }

  const pages = [
    {
      name: "Professionals",
      navigate: () => navigate("/ui/professionals"),
    },
    {
      name: "Customers",
      navigate: () => navigate("/ui/customers"),
    },
  ];

  const menuSettings = [
    {
      label: "Profile",
      onClick: () => navigate("/ui/profile"),
    },
  ];

  return { user, onLogin, pages, menuSettings };
}
