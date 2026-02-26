import styles from "./ResponsibleProfessionalUse.module.css";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface ResponsibleProfessionalUseProps {
  features: Feature[];
}

export default function ResponsibleProfessionalUse({ features }: ResponsibleProfessionalUseProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Responsible & Professional Use</h2>
        </div>

        <div className={styles.list}>
          {features.map((feature, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemIcon}>
                <img
                  src={feature.icon}
                  alt="Icon"
                  width={32}
                  height={32}
                />
              </div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{feature.title}</h3>
                <p className={styles.itemDescription}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
