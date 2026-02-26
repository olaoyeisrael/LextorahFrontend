import styles from "./WhoWeServe.module.css";

interface Audience {
  icon: string;
  title: string;
}

interface WhoWeServeProps {
  title: string;
  subtitle: string;
  audiences: Audience[];
}

export default function WhoWeServe({ title, subtitle, audiences }: WhoWeServeProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.grid}>
          {audiences.map((audience, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <img
                  src={audience.icon}
                  alt={`${audience.title} Icon`}
                  width={32}
                  height={32}
                />
              </div>
              <p className={styles.cardTitle}>{audience.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
