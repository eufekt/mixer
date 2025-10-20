import styles from "../styles/Error.module.sass";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <br />
      <p>Page not found</p>
      <br />
      <Link className={styles.button} href="/">
        return to main page
      </Link>
    </div>
  );
}
