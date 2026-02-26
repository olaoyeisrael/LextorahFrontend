import React from "react";
import { basilData } from "../../../data/basilSchoolsData";
import styles from "./BasilLeadership.module.css";

const BasilLeadership: React.FC = () => {
  const { leadership } = basilData;

  return (
    <section id="leadership" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{leadership.badge}</span>
          <h2 className={styles.title}>{leadership.title}</h2>
          <p className={styles.description}>{leadership.description}</p>
        </div>

        <div className={styles.cardsGrid}>
          {leadership.cards.map((card, index) => (
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

export default BasilLeadership;
