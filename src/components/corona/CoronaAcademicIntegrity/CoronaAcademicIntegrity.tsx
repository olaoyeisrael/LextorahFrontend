import styles from "./CoronaAcademicIntegrity.module.css";

interface Point {
  text: string;
  highlight: string;
  suffix: string;
}

interface CoronaAcademicIntegrityProps {
  title: string;
  points: Point[];
}

export default function CoronaAcademicIntegrity({
  title,
  points,
}: CoronaAcademicIntegrityProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.titleWrapper}>
            <span className={styles.icon}>
                <img
                    src="/images/corona/icons/responsible.png"
                    alt="Responsible Icon"
                    width={24}
                    height={24}
                />
            </span>
            <h2 className={styles.title}>{title}</h2>
          </div>

          <ul className={styles.points}>
            {points.map((point, index) => (
              <li key={index} className={styles.pointItem}>
                <span className={styles.bullet}>
                  <img
                    src="/images/corona/icons/checkmark.png"
                    alt="Checkmark Icon"
                    width={24}
                    height={24}
                  />
                </span>
                <span>
                  {point.text}{" "}
                  <strong>{point.highlight}</strong>
                  {point.suffix && ` ${point.suffix}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
