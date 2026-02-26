import styles from "./ChrislandIntegrity.module.css";

interface ChrislandIntegrityProps {
  title: string;
  points: { title: string; icon: string }[];
}

export default function ChrislandIntegrity({
  title,
  points,
}: ChrislandIntegrityProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>{title}</h2>
          <ul className={styles.points}>
            {points.map((point, index) => (
              <li key={index} className={styles.pointItem}>
                <span className={styles.iconWrapper}>
                  <img
                    src={point.icon}
                    alt={`${point.title} Icon`}
                    width={20}
                    height={20}
                  />
                </span>
                <span>{point.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
