import styles from "./LagoonIntegrity.module.css";

interface IntegrityItem {
  icon: string;
  description: string;
}

interface LagoonIntegrityProps {
  title: string;
  subtitle: string;
  items: IntegrityItem[];
}

export default function LagoonIntegrity({
  title,
  subtitle,
  items,
}: LagoonIntegrityProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <img
                        src="/images/lagoon/icons/responsible.png"
                alt={`Responsible Icon`}
                width={36}
                height={36}
              />
          </div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.itemsGrid}>
          {items.map((item, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.iconWrapper}>
                <img
                            src={item.icon}
                    alt={`${item.description} Icon`}
                    width={28}
                    height={28}
                  />
              </div>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
