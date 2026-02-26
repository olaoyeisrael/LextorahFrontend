import React from "react";
import { Link } from "react-router-dom";
import { supremeData } from "../../../data/supremeSchoolsData";
import styles from "./SupremeHero.module.css";

const SupremeHero: React.FC = () => {
  const { hero } = supremeData;

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
            <img
                src="/images/supreme-foundation/icons/powered-by.png"
                alt="Supreme Foundation Schools Logo"
                width={16}
                height={16}
                
              />
            <span>{hero.poweredBy}</span>
          </div>

          <p className={styles.description}>{hero.description}</p>

          <div className={styles.buttons}>
            <Link to={hero.primaryButton.href} className={styles.primaryButton}>
              <img
                src="/images/supreme-foundation/icons/login.png"
                alt="Supreme Foundation Schools Logo"
                width={16}
                height={16}
                
              />
              {hero.primaryButton.text}
            </Link>
            <Link to={hero.secondaryButton.href} className={styles.secondaryButton}>
              <img
                src="/images/supreme-foundation/icons/get-help.png"
                alt="Supreme Foundation Schools Logo"
                width={16}
                height={16}
                
              />
              {hero.secondaryButton.text}
            </Link>
          </div>
        </div>

        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <img
              src={hero.image}
              alt="Students in classroom"
              width={480}
              height={320}
              className={styles.image}
            />
            <div className={styles.stats}>
              {hero.stats.map((stat, index) => (
                <div key={index} className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>     
        </div>
      </div>
    </section>
  );
};

export default SupremeHero;
