import { Loading } from "./Loading";
import { useSession } from "next-auth/react";
import UserContext from "../contexts/UserContext";

export default function Main({ children }: { children: React.ReactNode }) {
  const { data, status } = useSession();

  let user = null;

  if (status === "loading")
    return <Loading isLoading={true} what={"session"} type={"fullScreen"} />;
  if (status === "authenticated") {
    user = data.user;
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
  
