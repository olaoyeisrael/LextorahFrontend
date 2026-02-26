import styles from "./LegalHero.module.css";

interface LegalHeroProps {
  title: string;
  lastUpdated: string;
}

export default function LegalHero({ title, lastUpdated }: LegalHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lastUpdated}>{lastUpdated}</p>
      </div>
    </section>
  );
}
