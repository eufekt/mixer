import { createContext, useContext } from "react";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export default UserContext;
