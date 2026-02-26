import styles from "./WhitesandsForTeachers.module.css";

interface Benefit {
  title: string;
  description: string;
}

interface WhitesandsForTeachersProps {
  title: string;
  subtitle: string;
  benefits: Benefit[];
  image: string;
}

export default function WhitesandsForTeachers({
  title,
  subtitle,
  benefits,
  image,
}: WhitesandsForTeachersProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img
              src={image}
              alt="Teachers using Lextorah AI"
              width={450}
              height={320}
              className={styles.image}
            />
          </div>
          <div className={styles.textContent}>
            <div className={styles.iconWrapper}>
              <img
                src="/images/whitesands/icons/teachers.png"
                alt={`Teacher Icon`}
                width={20}
                height={20}
              />
            </div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
            <ul className={styles.benefits}>
              {benefits.map((benefit, index) => (
                <li key={index} className={styles.benefitItem}>
                  <span className={styles.checkmark}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#16A34A"/>
                    </svg>
                  </span>
                  <div className={styles.benefitContent}>
                    <strong>{benefit.title}</strong>
                    <span>{benefit.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
