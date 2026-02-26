import styles from "./CoronaHero.module.css";

interface CoronaHeroProps {
  schoolName: string;
  title: string;
  highlight: string;
  subtitle: string;
  badge: string;
  description: string;
  subDescription: string;
}

export default function CoronaHero({
  title,
  highlight,
  subtitle,
  badge,
  description,
  subDescription,
}: CoronaHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {title} <span className={styles.highlight}>{highlight}</span> AI
          <br />
          <span className={styles.subtitle}>{subtitle}</span>
        </h1>
        <span className={styles.badge}>{badge}</span>
        <p className={styles.description} dangerouslySetInnerHTML ={{ __html: description }} />
        <p className={styles.subDescription}>{subDescription}</p>
      </div>
    </section>
  );
}
