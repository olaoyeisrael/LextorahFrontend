import React from "react";
import { basilData } from "../../../data/basilSchoolsData";
import styles from "./BasilSupport.module.css";

const BasilSupport: React.FC = () => {
  const { support } = basilData;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{support.badge}</span>
          <h2 className={styles.title}>{support.title}</h2>
          <p className={styles.description}>{support.description}</p>
        </div>

        <div className={styles.cardsGrid}>
          {support.cards.map((card, index) => (
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

        <div className={styles.banner}>
          <span className={styles.bannerText}>{support.banner}</span>
        </div>
      </div>
    </section>
  );
};

export default BasilSupport;
