import styles from "./CoronaForTeachers.module.css";

interface Benefit {
  text: string;
  highlight: string;
  suffix: string;
}

interface CoronaForTeachersProps {
  title: string;
  subtitle: string;
  benefits: Benefit[];
  image: string;
}

export default function CoronaForTeachers({
  title,
  subtitle,
  benefits,
  image,
}: CoronaForTeachersProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img
              src={image}
              alt="Teachers using Lextorah AI"
              width={450}
              height={300}
              className={styles.image}
            />
          </div>
          <div className={styles.textContent}>
            <div className={styles.titleWrapper}>
              <span className={styles.icon}>
                <img
                    src="/images/corona/icons/teachers.png"
                    alt="Teachers Icon"
                    width={24}
                    height={24}
                />
              </span>
              <h2 className={styles.title}>{title}</h2>
            </div>
            <p className={styles.subtitle}>{subtitle}</p>
            <ul className={styles.benefits}>
              {benefits.map((benefit, index) => (
                <li key={index} className={styles.benefitItem}>
                  <span className={styles.checkmark}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#0D9488"/>
                    </svg>
                  </span>
                  <span>
                    {benefit.text}{" "}
                    <strong>{benefit.highlight}</strong>
                    {benefit.suffix && ` ${benefit.suffix}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
