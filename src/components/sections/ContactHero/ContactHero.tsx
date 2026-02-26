import styles from "./ContactHero.module.css";

interface ContactHeroProps {
  title: string;
  subtitle: string;
}

export default function ContactHero({ title, subtitle }: ContactHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </section>
  );
}
