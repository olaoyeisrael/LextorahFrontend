import React from "react";
import { dansolData } from "../../../data/dansolSchoolsData";
import styles from "./DansolLeadership.module.css";

const DansolLeadership: React.FC = () => {
  const { leadership } = dansolData;

  return (
    <section id="leadership" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badgeWrapper}>
            <div className={styles.badgeIcon}>
              <img
                src="/images/dansol/icons/leadership.png"
                alt={`Safe Icon`}
                width={16}
                height={16}
              />
            </div>
          </div>
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

export default DansolLeadership;
