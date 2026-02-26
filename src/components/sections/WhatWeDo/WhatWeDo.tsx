import styles from "./WhatWeDo.module.css";

interface WhatWeDoItem {
  icon: string;
  title: string;
  description: string;
}

interface WhatWeDoProps {
  title: string;
  subtitle: string;
  items: WhatWeDoItem[];
}

export default function WhatWeDo({ title, subtitle, items }: WhatWeDoProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.grid}>
          {items.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={index % 2 === 0 ? styles.iconWrapper : `${styles.iconWrapper} ${styles.alternateIconWrapper}`}>
                <img
                  src={item.icon}
                  alt={`${item.title} Icon`}
                  width={32}
                  height={32}
                />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
