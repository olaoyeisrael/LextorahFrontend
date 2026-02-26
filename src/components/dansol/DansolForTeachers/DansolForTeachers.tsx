import React from "react";
import { dansolData } from "../../../data/dansolSchoolsData";
import styles from "./DansolForTeachers.module.css";

const DansolForTeachers: React.FC = () => {
  const { forTeachers } = dansolData;

  return (
    <section id="teachers" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.features}>
            <div className={styles.header}>
              <span className={styles.badge}>{forTeachers.badge}</span>
              <h2 className={styles.title}>{forTeachers.title}</h2>
              <p className={styles.description}>{forTeachers.description}</p>
            </div>
        {forTeachers.features.map((feature, index) => {
              return (
                <div key={index} className={styles.feature}>
                  <div 
                    className={styles.featureIcon}
                  >
                    <img
                      src={feature.icon}
                      alt={`${feature.title} Icon`}
                      width={16}
                      height={16}
                    />
                  </div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.imageWrapper}>
            <img
              src="/images/dansol/Dansol-Schools-Teacher-with-Technology.png"
              alt="Student learning"
              width={500}
              height={400}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DansolForTeachers;
