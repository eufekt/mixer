import styles from "@/src/styles/Loading.module.sass";

export function Loading({ isLoading }) {
  return isLoading ? <div className={styles.loading}>Loading</div> : null;
}
