import { useUser } from "../../contexts/userContext.tsx";

export default function useProfilePage() {
  const user = useUser();

  return { user };
}
