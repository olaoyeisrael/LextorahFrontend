import styles from "./ChrislandHero.module.css";

interface ChrislandHeroProps {
  title: string;
  highlight: string;
  subtitle: string;
  badge: string;
  description: string;
  schoolNameBold: string;
  subDescription: string;
}

export default function ChrislandHero({
  title,
  highlight,
  subtitle,
  badge,
  description,
  schoolNameBold,
  subDescription,
}: ChrislandHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {title} <span className={styles.highlight}>{highlight}</span>
          <br />
          <span className={styles.subtitle}>{subtitle}</span>
        </h1>
        <span className={styles.badge}>{badge}</span>
        <p className={styles.description}>
          {description} <strong>{schoolNameBold}</strong>.
        </p>
        <p className={styles.subDescription}>{subDescription}</p>
      </div>
    </section>
  );
}
