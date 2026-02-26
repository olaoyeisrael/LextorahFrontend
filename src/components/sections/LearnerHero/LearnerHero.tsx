import { Link } from "react-router-dom";
import styles from "../HeroSection/HeroSection.module.css";
import heroStyles from "./LearnerHero.module.css";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  backgroundImage?: string;
  align?: "left" | "center";
}

export default function LearnerHero({
  title,
  subtitle,
  badge,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  backgroundImage = "/images/student-hero.png",
  align = "left",
}: HeroSectionProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundImage}>
        <img
          src={backgroundImage}
          alt="Hero background"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        <div className={styles.overlay}></div>
      </div>
      <div className={`${styles.container} ${align === "center" ? styles.containerCenter : ""}`}>
        <div className={`${styles.content} ${align === "center" ? styles.contentCenter : ""}`}>
          {badge && <span className={styles.badge}>{badge}</span>}
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <div className={styles.buttons}>
            <Link to={primaryButtonHref} className={`btn btn-primary ${styles.primaryBtn}`}>
              {primaryButtonText}
            </Link>
            {secondaryButtonText && secondaryButtonHref && (
              <Link to={secondaryButtonHref} className={`btn btn-secondary ${styles.secondaryBtn} ${heroStyles.secondaryBtn}`}>
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
