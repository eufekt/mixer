import styles from "@/src/styles/Loading.module.sass";

export function Loading({ isLoading, what="" }) {
  return isLoading ? <div className={styles.loading}>{`Loading ${what}`}</div> : null;
}
