import React from "react";
import { dansolData } from "../../../data/dansolSchoolsData";
import styles from "./DansolPlatformUsage.module.css";

const DansolPlatformUsage: React.FC = () => {
  const { platformUsage } = dansolData;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badgeIcon}>
            <img
              src="/images/dansol/icons/platform.png"
              alt={`Platform Icon`}
              width={16}
              height={16}
            />
          </div>
          <h2 className={styles.title}>{platformUsage.title}</h2>
        </div>

        <div className={styles.cardsGrid}>
          {platformUsage.cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardIcon}>
                <img
                  src={card.icon}
                  alt={`${card.title} Icon`}
                  width={32}
                  height={32}
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

export default DansolPlatformUsage;
