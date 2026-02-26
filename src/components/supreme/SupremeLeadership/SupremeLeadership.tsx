import React from "react";
import { supremeData } from "../../../data/supremeSchoolsData";
import styles from "./SupremeLeadership.module.css";

const SupremeLeadership: React.FC = () => {
  const { leadership } = supremeData;

  return (
    <section id="leadership" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <img
                        src="/images/supreme-foundation/icons/leadership.png"
                alt={`Leadership Icon`}
                width={24}
                height={24}
              />
          </div>
          <h2 className={styles.title}>{leadership.title}</h2>
          <p className={styles.description}>{leadership.description}</p>
        </div>

        <div className={styles.cards}>
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

export default SupremeLeadership;
