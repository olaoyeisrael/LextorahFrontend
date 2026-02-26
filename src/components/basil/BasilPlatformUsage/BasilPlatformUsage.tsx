import React from "react";
import { basilData } from "../../../data/basilSchoolsData";
import styles from "./BasilPlatformUsage.module.css";

const BasilPlatformUsage: React.FC = () => {
  const { platformUsage } = basilData;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{platformUsage.badge}</span>
          <h2 className={styles.title}>{platformUsage.title}</h2>
        </div>

        <div className={styles.cardsGrid}>
          {platformUsage.cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardIcon}>
                <img
                  src={card.icon}
                  alt={`${card.title} Icon`}
                  width={16}
                  height={16}
                />
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BasilPlatformUsage;
