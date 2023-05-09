import { Session } from "next-auth";
import { createContext, useContext } from "react";

const UserContext = createContext<Session["user"]|null>(null);

export function useUserContext() {
  return useContext(UserContext);
}

export default UserContext;
