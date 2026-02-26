import React from "react";
import { supremeData } from "../../../data/supremeSchoolsData";
import styles from "./SupremeForStudents.module.css";

const SupremeForStudents: React.FC = () => {
  const { forStudents } = supremeData;

  return (
    <section id="students" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <img
                        src="/images/supreme-foundation/icons/student.png"
                alt={`Student Icon`}
                width={24}
                height={24}
              />
          </div>
          <h2 className={styles.title}>{forStudents.title}</h2>
        </div>

        <div className={styles.cards}>
          {forStudents.cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <div
                className={styles.cardIcon}
              >
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

export default SupremeForStudents;
