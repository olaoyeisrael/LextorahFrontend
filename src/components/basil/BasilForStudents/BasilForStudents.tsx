import React from "react";
import { basilData } from "../../../data/basilSchoolsData";
import styles from "./BasilForStudents.module.css";

const BasilForStudents: React.FC = () => {
  const { forStudents } = basilData;

  const colorMap: Record<string, string> = {
    help: "#EC4899",
    explanations: "#8B5CF6",
    practice: "#EC4899",
    weakAreas: "#F59E0B",
  };

  return (
    <section id="students" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{forStudents.badge}</span>
          <h2 className={styles.title}>{forStudents.title}</h2>
          <p className={styles.description}>{forStudents.description}</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            <img
              src="/images/basil/Basil-Schools-Students-learning-with-technology.png"
              alt="Students at Lagoon Schools"
              width={500}
              height={400}
              className={styles.image}
              
            />
            <div className={styles.supportBadge}>
              <div className={styles.supportIcon}>
                <img
                          src="/images/basil/icons/subjects.png"
                  alt={`Subjects Icon`}
                  width={24}
                  height={24}
                />
              </div>
              <div className={styles.supportText}>
                <span className={styles.supportLabel}>24/7</span>
                <span className={styles.supportValue}>Learning Support</span>
              </div>
            </div>
          </div>

          <div className={styles.cards}>
            {forStudents.cards.map((card, index) => (
              <div key={index} className={styles.card}>
                <div
                  className={styles.cardIcon}
                  style={{ backgroundColor: `${colorMap[card.icon]}15` }}
                >
                  <img
                    src={card.icon}
                    alt={`${card.title} Icon`}
                    width={16}
                    height={16}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDescription}>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasilForStudents;
