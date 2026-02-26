import styles from "./ChrislandForTeachers.module.css";

interface ChrislandForTeachersProps {
  badge: string;
  title: string;
  benefits: string[];
  image: string;
}

export default function ChrislandForTeachers({
  badge,
  title,
  benefits,
  image,
}: ChrislandForTeachersProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img
              src={image}
              alt="Teachers using Lextorah AI"
              width={400}
              height={280}
              className={styles.image}
            />
          </div>
          <div className={styles.textContent}>
            <span className={styles.badge}>{badge}</span>
            <h2 className={styles.title}>{title}</h2>
            <ul className={styles.benefits}>
              {benefits.map((benefit, index) => (
                <li key={index} className={styles.benefitItem}>
                  <span className={styles.checkmark}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#F9A825"/>
                      <path d="M9 12L11 14L15 10" stroke="#1B5E20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
