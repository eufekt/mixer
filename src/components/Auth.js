import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import styles from "@/src/styles/Auth.module.sass";

export default function Auth() {
  const { data, status } = useSession();

  return (
    <div className={styles.Auth}>
      {status == "authenticated" && <Authenticated user={data.user} />}
      {status == "unauthenticated" && <Unauthenticated />}
      {status == "loading" && <div>loading authentication</div>}
    </div>
  );
}

function Authenticated({ user }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.auth}>
        Authenticated
      </span>
      @{user.name}
      <button className={styles.button} onClick={() => signOut("arena")}>sign out</button>
    </div>
  );
}

function Unauthenticated() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.unauth}>
        Unauthenticated
      </span>
      <button className={styles.button} onClick={() => signIn("arena")}>sign in</button>
    </div>
  );
}
