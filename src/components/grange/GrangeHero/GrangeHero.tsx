import { Link } from "react-router-dom";
import styles from "./GrangeHero.module.css";

interface GrangeHeroProps {
  title: string;
  highlight: string;
  subtitle: string;
  badge: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
}

export default function GrangeHero({
  title,
  highlight,
  subtitle,
  badge,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
}: GrangeHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {title} <span className={styles.highlight}>{highlight}</span>
          <br />
          <span className={styles.subtitle}>{subtitle}</span>
        </h1>
        <span className={styles.badge}>{badge}</span>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttons}>
          <Link to={primaryButtonHref} className={styles.primaryBtn}>
            {primaryButtonText}
          </Link>
          <Link to={secondaryButtonHref} className={styles.secondaryBtn}>
            {secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
