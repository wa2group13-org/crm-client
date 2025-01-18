import { createContext, ReactNode, useContext } from "react";
import { HomeControllerApi, UserDTO } from "../apis/api-gateway/api.ts";
import { useQuery } from "@tanstack/react-query";
import { userKey } from "../query/query-keys.ts";

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
    queryKey: userKey(),
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
