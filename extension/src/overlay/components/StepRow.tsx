import styles from "../styles/gateway.module.css";

export default function StepRow({
  done,
  active,
  trLabel,
  enLabel,
}: {
  done: boolean;
  active: boolean;
  trLabel: string;
  enLabel: string;
}) {
  return (
    <div className={styles.stepRow}>
      <span
        className={`${styles.stepIcon} ${done ? styles.stepDone : ""} ${active && !done ? styles.stepActive : ""}`}
      >
        {done ? "✓" : "○"}
      </span>
      <div>
        <p
          className={`${styles.stepLabel} ${done ? styles.stepLabelDone : ""} ${active && !done ? styles.stepLabelActive : ""}`}
        >
          {trLabel}
        </p>
        <p className={styles.stepLabelEn}>{enLabel}</p>
      </div>
    </div>
  );
}
