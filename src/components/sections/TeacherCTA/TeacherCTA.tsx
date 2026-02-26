import { Link } from "react-router-dom";
import styles from "./TeacherCTA.module.css";

interface Button {
  label: string;
  href: string;
  variant: string;
}

interface TeacherCTAProps {
  title: string;
  description: string;
  buttons: Button[];
}

export default function TeacherCTA({ title, description, buttons }: TeacherCTAProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>

          <div className={styles.buttons}>
            {buttons.map((button, index) => (
              <Link
                key={index}
                to={button.href}
                className={`${styles.btn} ${
                  button.variant === "secondary" ? styles.btnSecondary : styles.btnOutline
                }`}
              >
                {button.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
