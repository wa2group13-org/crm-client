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

  const pages: { name: string; navigate: () => void }[] = [
    {
      name: "Professionals",
      navigate: () => navigate("/ui/professionals"),
    },
    {
      name: "Customers",
      navigate: () => navigate("/ui/customers"),
    },
    {
      name: "Job offers",
      navigate: () => navigate("/ui/jobs"),
    },
  ];

  const menuSettings = [
    {
      label: "Profile",
      onClick: () => navigate("/ui/profile"),
    },
    {
      label: "Messages",
      onClick: () => navigate("/ui/messages"),
    },
    {
      label: "Documents",
      onClick: () => navigate("/ui/documents"),
    },
    {
      label: "Analytics",
      onClick: () => navigate("/ui/analytics"),
    },
  ];

  return { user, onLogin, pages, menuSettings };
}
