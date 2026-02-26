import React from "react";
import { basilData } from "../../../data/basilSchoolsData";
import styles from "./BasilForTeachers.module.css";

const BasilForTeachers: React.FC = () => {
  const { forTeachers } = basilData;

  return (
    <section id="teachers" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{forTeachers.badge}</span>
          <h2 className={styles.title}>{forTeachers.title}</h2>
          <p className={styles.description}>{forTeachers.description}</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.features}>
            {forTeachers.features.map((feature, index) => (
              <div key={index} className={styles.feature}>
                <div className={styles.featureIcon}>
                  <img
                    src={feature.icon}
                    alt={`${feature.title} Icon`}
                    width={20}
                    height={20}
                  />
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.imageWrapper}>
            <img
              src="/images/basil/Basil-Schools-Teacher-using-technology.png"
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
        </div>
      </div>
    </section>
  );
};

export default BasilForTeachers;
