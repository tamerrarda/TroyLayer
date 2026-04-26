import styles from "./Spinner.module.css";

export default function Spinner({ size = 40 }: { size?: number }) {
  return (
    <div
      className={styles.spinner}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    />
  );
}
