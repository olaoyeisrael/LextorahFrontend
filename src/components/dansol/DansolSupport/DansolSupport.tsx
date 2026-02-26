import React from "react";
import { Link } from "react-router-dom";
import { dansolData } from "../../../data/dansolSchoolsData";
import styles from "./DansolSupport.module.css";

const DansolSupport: React.FC = () => {
  const { support } = dansolData;
  return (
    <section id="support" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <img
              src="/images/dansol/icons/support-.png"
              alt={`Support Icon`}
              width={16}
              height={16}
            />
          </div>
          <h2 className={styles.title}>{support.title}</h2>
          <p className={styles.description}>{support.description}</p>
        </div>

        <div className={styles.cardsGrid}>
          {support.cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <div 
                className={styles.cardIcon}
              >
                <img
                  src={card.icon}
                  alt={`${card.title} Icon`}
                  width={24}
                  height={24}
                />
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
              <Link 
                to={card.buttonHref} 
                className={`${styles.cardBtn}`}
              >
                {card.buttonText}
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.commitment}>
          <img
            src="/images/dansol/icons/achievement.png"
            alt={`Achievement Icon`}
            width={44}
            height={44}
          />
          <h3 className={styles.commitmentTitle}>{support.commitment.title}</h3>
          <p className={styles.commitmentDescription}>{support.commitment.description}</p>
        </div>
      </div>
    </section>
  );
};

export default DansolSupport;
