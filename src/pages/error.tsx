import { useRouter } from "next/router";
import styles from "../styles/Error.module.sass";
import Link from "next/link";

export default function ErrorPage({ is404 = false, is500 = false }) {
  const router = useRouter();
  let { code, description, message } = router.query;

  if (is404) {
    message = "Page not found";
    code = "404";
  }

  if (is500) {
    message = "Internal server error";
    code = "500";
  }

  return (
    <div className={styles.container}>
      <h1>{code}</h1>
      <br />
      <p>{message}</p>
      <br />
      <p>{description}</p>
      <br />
      <Link className={styles.button} href="/">return to main page</Link>
    </div>
  );
}
