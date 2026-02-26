import styles from "./LagoonSupport.module.css";

interface SupportItem {
  icon: string;
  title: string;
  description: string;
}

interface LagoonSupportProps {
  badge: string;
  title: string;
  subtitle: string;
  items: SupportItem[];
  footerText: string;
}

export default function LagoonSupport({
  badge,
  title,
  subtitle,
  items,
  footerText,
}: LagoonSupportProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>
            <img
                        src="/images/lagoon/icons/support.png"
                alt={`Support Icon`}
                width={20}
                height={20}
              />
              {badge}
            </span>
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
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText} dangerouslySetInnerHTML={{ __html: footerText }} />
        </div>
      </div>
    </section>
  );
}
