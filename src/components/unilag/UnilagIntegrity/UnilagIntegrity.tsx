import styles from "./UnilagIntegrity.module.css";

interface IntegrityItem {
  icon: string;
  text: string;
}

interface UnilagIntegrityProps {
  title: string;
  items: IntegrityItem[];
}

export default function UnilagIntegrity({
  title,
  items,
}: UnilagIntegrityProps) {
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
                  alt={`${item.text} Icon`}
                  width={20}
                  height={20}
                />
              </div>
              <p className={styles.itemDescription}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
