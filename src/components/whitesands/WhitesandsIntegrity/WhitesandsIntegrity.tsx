import styles from "./WhitesandsIntegrity.module.css";

interface IntegrityItem {
  icon: string;
  title: string;
  description: string;
}

interface WhitesandsIntegrityProps {
  title: string;
  subtitle: string;
  items: IntegrityItem[];
}

export default function WhitesandsIntegrity({
  title,
  items,
}: WhitesandsIntegrityProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>

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
