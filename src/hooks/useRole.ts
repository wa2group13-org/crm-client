import { useUser } from "../contexts/userContext.tsx";

type UserRole = "OPERATOR" | "ADMIN";

export function useRole() {
  const user = useUser();

  const claims = user?.principal?.claims as
    | {
        realm_access?: { roles: UserRole[] };
      }
    | undefined;

  return claims?.realm_access?.roles;
}
