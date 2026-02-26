import { Link } from "react-router-dom";
import styles from "./LegalCTA.module.css";

interface LegalCTAProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
}

export default function LegalCTA({
  title,
  subtitle,
  buttonText,
  buttonHref,
}: LegalCTAProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        <Link to={buttonHref} className={styles.button}>
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
