import { useUser } from "../contexts/userContext.tsx";

export function useIsLogin(): boolean {
  const user = useUser();
  return user?.principal != null;
}
