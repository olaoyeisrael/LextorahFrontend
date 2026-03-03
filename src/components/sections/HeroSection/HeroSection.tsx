import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import styles from "./HeroSection.module.css";

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

export default function HeroSection({
  title,
  subtitle,
  badge,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  backgroundImage = "/images/parent-hero.png",
  align = "left",
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.backgroundImage}>
        <img
          src={backgroundImage}
          alt="Hero background"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        <div className={styles.overlay}></div>
      </div>
      <div className={`${styles.container} ${align === "center" ? styles.containerCenter : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className={`${styles.content} ${align === "center" ? styles.contentCenter : ""}`}
        >
          {badge && <span className={styles.badge}>{badge}</span>}
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <div className={styles.buttons}>
            {align === "center" ? (
              <>
                {secondaryButtonText && secondaryButtonHref && (
                  <Link to={secondaryButtonHref} className={`btn btn-secondary ${styles.secondaryBtn}`}>
                    {secondaryButtonText}
                  </Link>
                )}
                <Link to={primaryButtonHref} className={`btn btn-primary ${styles.primaryBtn}`}>
                  {primaryButtonText}
                </Link>
              </>
            ) : (
              <>
                <Link to={primaryButtonHref} className={`btn btn-primary ${styles.primaryBtn}`}>
                  {primaryButtonText}
                </Link>
                {secondaryButtonText && secondaryButtonHref && (
                  <Link to={secondaryButtonHref} className={`btn btn-secondary ${styles.secondaryBtn}`}>
                    {secondaryButtonText}
                  </Link>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
