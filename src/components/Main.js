import { Loading } from "../components/Loading";
import { useSession } from "next-auth/react";
import UserContext from "../contexts/UserContext";
import Explorer from "./explorer/Explorer";

export default function Main({ isRoot }) {
    const { data, status } = useSession();
  
    let user = null;
  
    if (status === "loading")
      return <Loading isLoading={true} what={"session"} />;
    if (status === "authenticated") {
        user = data.user;
    }
  

    return (
      <UserContext.Provider value={user}>
        <Explorer isRoot={isRoot} />
      </UserContext.Provider>
    );
  }