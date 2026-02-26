import {
  ChrislandCommitment
} from "../../../components/chrisland";

import {
  chrislandCommitmentData,
} from "../../../data/chrislandSchoolsData";

import styles from "./ChrislandSupport.module.css";

interface SupportOption {
  icon: string;
  title: string;
}

interface ChrislandSupportProps {
  title: string;
  description: string;
  options: SupportOption[];
}

function SupportIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    teacher: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#F97316"/>
      </svg>
    ),
    coordinator: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="#F97316"/>
      </svg>
    ),
    help: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z" fill="#F97316"/>
      </svg>
    ),
  };

  return <span className={styles.optionIcon}>{icons[icon] || icons.help}</span>;
}

export default function ChrislandSupport({
  title,
  description,
  options,
}: ChrislandSupportProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.optionsGrid}>
          {options.map((option, index) => (
            <div key={index} className={styles.optionCard}>
              <div className={styles.iconWrapper}>
                <img
                  src={option.icon}
                  alt={`${option.title} Icon`}
                  width={24}
                  height={24}
                  />
              </div>
              <p className={styles.optionTitle}>{option.title}</p>
            </div>
          ))}
        </div>
        <ChrislandCommitment text={chrislandCommitmentData.text} />
      </div>
    </section>
  );
}
