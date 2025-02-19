"use strict";

import { useUser } from "../../contexts/userContext.tsx";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../hooks/useRole.ts";

export default function useNavBar() {
  const user = useUser();
  const roles = useRole();
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
      enabled: true,
    },
    {
      label: "Messages",
      onClick: () => navigate("/ui/messages"),
      enabled: true,
    },
    {
      label: "Documents",
      onClick: () => navigate("/ui/documents"),
      enabled: true,
    },
    {
      label: "Analytics",
      onClick: () => navigate("/ui/analytics"),
      enabled: roles?.includes("ADMIN"),
    },
  ];

  return { user, onLogin, pages, menuSettings };
}
