import React from "react";
import { supremeData } from "../../../data/supremeSchoolsData";
import styles from "./SupremeForTeachers.module.css";

const SupremeForTeachers: React.FC = () => {
  const { forTeachers } = supremeData;

  return (
    <section id="teachers" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img
            src={forTeachers.image}
            alt="Teacher helping students"
            width={500}
            height={400}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.headerIcon}>
            <img
                        src="/images/supreme-foundation/icons/teachers.png"
                alt={`Student Icon`}
                width={24}
                height={24}
              />
          </div>

          <h2 className={styles.title}>{forTeachers.title}</h2>

          <div className={styles.features}>
            {forTeachers.features.map((feature, index) => (
              <div key={index} className={styles.feature}>
                <div className={styles.featureIcon}>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupremeForTeachers;
