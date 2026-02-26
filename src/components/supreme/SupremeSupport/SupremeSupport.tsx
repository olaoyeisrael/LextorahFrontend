import React from "react";
import { supremeData } from "../../../data/supremeSchoolsData";
import styles from "./SupremeSupport.module.css";

interface CardIconProps {
  type: string;
}

const CardIcon: React.FC<CardIconProps> = ({ type }) => {
  const icons: Record<string, React.ReactNode> = {
    teacher: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    class: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    help: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15848 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 17H12.01" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="10" stroke="#22C55E" strokeWidth="2"/>
      </svg>
    ),
  };

  return <>{icons[type] || icons.teacher}</>;
};

const SupremeSupport: React.FC = () => {
  const { support } = supremeData;

  return (
    <section id="support" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <img
                        src="/images/supreme-foundation/icons/support.png"
                alt={`Support Icon`}
                width={24}
                height={24}
              />
          </div>
          <h2 className={styles.title}>{support.title}</h2>
          <p className={styles.description}>{support.description}</p>
        </div>

        <div className={styles.cards}>
          {support.cards.map((card, index) => (
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

        <div className={styles.banner}>
          <p dangerouslySetInnerHTML={{ __html: support.banner }} />
        </div>
      </div>
    </section>
  );
};

export default SupremeSupport;
