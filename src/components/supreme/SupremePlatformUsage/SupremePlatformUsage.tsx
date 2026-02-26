import React from "react";
import { supremeData } from "../../../data/supremeSchoolsData";
import styles from "./SupremePlatformUsage.module.css";

const SupremePlatformUsage: React.FC = () => {
  const { platformUsage } = supremeData;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <img
                        src="/images/supreme-foundation/icons/platform.png"
                alt={`Platform Icon`}
                width={24}
                height={24}
              />
          </div>
          <h2 className={styles.title}>{platformUsage.title}</h2>
        </div>

        <div className={styles.items}>
          {platformUsage.items.map((item, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemNumber}>{item.number}</div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupremePlatformUsage;
