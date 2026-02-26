import styles from "./UnilagForTeachers.module.css";

interface Benefit {
  title: string;
  description: string;
}

interface UnilagForTeachersProps {
  title: string;
  description: string;
  benefits: Benefit[];
  image: string;
}

export default function UnilagForTeachers({
  title,
  description,
  benefits,
  image,
}: UnilagForTeachersProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img
            src={image}
            alt="Teachers teaching"
            width={500}
            height={400}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <img
              src="/images/unilag/icons/teacher.png"
              alt={`Student Icon`}
              width={20}
              height={20}
            />
          </div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{description}</p>

          <ul className={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <li key={index} className={styles.benefitItem}>
                <div className={styles.checkIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#059669"/>
                  </svg>
                </div>
                <div>
                  <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                  <p className={styles.benefitDescription}>{benefit.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}