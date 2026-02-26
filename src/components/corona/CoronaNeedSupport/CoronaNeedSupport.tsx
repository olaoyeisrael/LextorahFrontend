import styles from "./CoronaNeedSupport.module.css";

interface SupportOption {
  icon: string;
  title: string;
}

interface CoronaNeedSupportProps {
  title: string;
  description: string;
  options: SupportOption[];
}

export default function CoronaNeedSupport({
  title,
  description,
  options,
}: CoronaNeedSupportProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <span className={styles.icon}>
              <img
                src="/images/corona/icons/support.png"
                alt={`Support Icon`}
                width={24}
                height={24}
                />
            </span>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.optionsGrid}>
          {options.map((option, index) => (
            <div key={index} className={styles.optionCard}>
              <div className={styles.iconWrapper}>
                <img
                    src={option.icon}
                    alt={`${option.title} Icon`}
                    width={26}
                    height={26}
                />
              </div>
              <p className={styles.optionTitle}>{option.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
