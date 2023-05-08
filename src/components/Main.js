import { Loading } from "../components/Loading";
import { useSession } from "next-auth/react";
import UserContext from "../contexts/UserContext";
import useHasWindow from "../hooks/useHasWindow";

export default function Main({ children }) {
  const { data, status } = useSession();
  const hasWindow = useHasWindow();

  let user = null;

  if (status === "loading")
    return <Loading isLoading={true} what={"session"} type={"fullScreen"} />;
  if (status === "authenticated") {
    user = data.user;
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
