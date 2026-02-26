import styles from "./GlobalPartnerships.module.css";

interface Partner {
  icon: string;
  title: string;
  description: string;
}

interface GlobalPartnershipsProps {
  title: string;
  subtitle: string;
  partners: Partner[];
  note: string;
}

export default function GlobalPartnerships({
  title,
  subtitle,
  partners,
  note,
}: GlobalPartnershipsProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.grid}>
          {partners.map((partner, index) => (
            <div key={index} className={styles.card}>
              <div className={index % 2 === 0 ? styles.iconWrapper : `${styles.iconWrapper} ${styles.alternateIconWrapper}`}>
                <img
                  src={partner.icon}
                  alt={`${partner.title} Icon`}
                  width={32}
                  height={32}
                />
              </div>
              <h3 className={styles.cardTitle}>{partner.title}</h3>
              <p className={styles.cardDescription}>{partner.description}</p>
            </div>
          ))}
        </div>

        <p className={styles.note}>{note}</p>
      </div>
    </section>
  );
}
