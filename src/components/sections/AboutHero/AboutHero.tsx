import styles from "./AboutHero.module.css";

interface AboutHeroProps {
  title: string;
  subtitle: string;
}

export default function AboutHero({ title, subtitle }: AboutHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </section>
  );
}
