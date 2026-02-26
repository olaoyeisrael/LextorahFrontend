import styles from "./ChrislandCommitment.module.css";

interface ChrislandCommitmentProps {
  text: string;
}

export default function ChrislandCommitment({ text }: ChrislandCommitmentProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.text}>{text}</p>
      </div>
    </section>
  );
}
