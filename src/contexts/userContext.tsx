import { createContext, ReactNode, useContext } from "react";
import { HomeControllerApi, UserDTO } from "../apis/api-gateway/api.ts";
import { useQuery } from "@tanstack/react-query";
import { USER_KEY } from "../query/query-keys.ts";

export const UserContext = createContext<UserDTO | null>(null);

export function useUser() {
  return useContext(UserContext);
}

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const homeApi = new HomeControllerApi();

  const user = useQuery({
    queryKey: [USER_KEY],
    queryFn: async () => {
      const res = await homeApi.user("");
      return res.data;
    },
  });

  return (
    <UserContext.Provider value={user.data ?? null}>
      {children}
    </UserContext.Provider>
  );
}
