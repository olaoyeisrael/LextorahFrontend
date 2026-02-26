import { Link } from "react-router-dom";
import { ctaSection } from "../../../data/parentsData";
import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{ctaSection.title}</h2>
          <p className={styles.description}>{ctaSection.description}</p>

          <div className={styles.buttons}>
            {ctaSection.buttons.map((button, index) => (
              <Link
                key={index}
                to={button.href}
                className={`btn ${
                  button.variant === "primary" ? styles.btnPrimary : styles.btnSecondary
                } ${styles.btn}`}
              >
                {button.label}
              </Link>
            ))}
          </div>

          <p className={styles.note}>{ctaSection.note}</p>
        </div>
      </div>
    </section>
  );
}
