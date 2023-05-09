import { signIn, signOut } from "next-auth/react";
import styles from "../styles/Auth.module.sass";
import { Session } from "next-auth";

export default function Auth({ data, status } : { data: Session | null, status: string }) {
  return (
    <div className={styles.Auth}>
      {status == "loading" && <div>loading authentication</div>}
      {status == "unauthenticated" && <Unauthenticated />}
      {status == "authenticated" && data && <Authenticated user={data.user} />}
    </div>
  );
}

function Authenticated({ user }: { user: Session["user"]}) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.auth}>Authenticated</span>@{user.name}
      <button
        className={styles.button}
        onClick={() => signOut({ redirect: false })}
      >
        sign out
      </button>
    </div>
  );
}

function Unauthenticated() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.unauth}>Unauthenticated</span>
      <button className={styles.button} onClick={() => signIn("arena")}>
        sign in
      </button>
    </div>
  );
}
