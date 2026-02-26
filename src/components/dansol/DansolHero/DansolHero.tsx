import React from "react";
import { Link } from "react-router-dom";
import { dansolData } from "../../../data/dansolSchoolsData";
import styles from "./DansolHero.module.css";

const DansolHero: React.FC = () => {
  const { hero } = dansolData;

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              {hero.title}
              <span className={styles.schoolName}>{hero.schoolName}</span>
              <span className={styles.highlight}>{hero.highlight}</span>
            </h1>
            <div className={styles.poweredBy}>
              {hero.poweredBy}
            </div>
            <p className={styles.description}>{hero.description}</p>
            <div className={styles.buttons}>
              <Link to={hero.primaryButton.href} className={styles.primaryBtn}>
                {hero.primaryButton.text}
              </Link>
              <Link to={hero.secondaryButton.href} className={styles.secondaryBtn}>
                {hero.secondaryButton.text}
              </Link>
            </div>
          </div>

          <div className={styles.rightContent}>
            <div className={styles.featuresGrid}>
              {hero.features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  {index === 3 ? (
                    <div className={styles.featureIcon}>
                        <img
                    src="/images/dansol/icons/safe.png"
                      alt={`Safe Icon`}
                      width={36}
                      height={36}
                    />
                    {feature.label && <span className={styles.featureLabel}>{feature.label}</span>}
                    </div>
                  ) : (
                    <div className={styles.featureText}>
                      <span className={styles.featureValue}>{feature.value}</span>
                      {feature.label && <span className={styles.featureLabel}>{feature.label}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DansolHero;
