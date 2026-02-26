import styles from "./GrangeIntegrity.module.css";

interface IntegrityItem {
  icon: string;
  title: string;
  description: string;
}

interface GrangeIntegrityProps {
  title: string;
  items: IntegrityItem[];
}

export default function GrangeIntegrity({
  title,
  items,
}: GrangeIntegrityProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.itemsGrid}>
          {items.map((item, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.iconWrapper}>
                <img
                  src={item.icon}
                  alt={`${item.title} Icon`}
                  width={20}
                  height={20}
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
