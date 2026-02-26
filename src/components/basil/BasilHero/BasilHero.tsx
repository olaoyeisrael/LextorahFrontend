import React from "react";
import { Link } from "react-router-dom";
import { basilData } from "../../../data/basilSchoolsData";
import styles from "./BasilHero.module.css";

const BasilHero: React.FC = () => {
  const { hero } = basilData;

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {hero.title}{" "}
            <span className={styles.schoolName}>{hero.schoolName}</span>{" "}
            <span className={styles.highlight}>{hero.highlight}</span>
          </h1>

          <div className={styles.poweredBy}>
            <span>{hero.poweredBy}</span>
          </div>

          <p className={styles.description}>{hero.description}</p>

          <div className={styles.buttons}>
            <Link to={hero.primaryButton.href} className={styles.primaryButton}>
              {hero.primaryButton.text}
            </Link>
            <Link to={hero.secondaryButton.href} className={styles.secondaryButton}>
              {hero.secondaryButton.text}
            </Link>
          </div>
        </div>

        <div className={styles.featuresGrid}>
          {hero.features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <img
                  src={feature.icon}
                  alt={`${feature.value} Icon`}
                  width={16}
                  height={16}
                />
              </div>
              <div className={styles.featureText}>
                <span className={styles.featureValue}>{feature.value}</span>
                <span className={styles.featureLabel}>{feature.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.wave}>
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default BasilHero;
