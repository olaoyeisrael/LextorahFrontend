import styles from "./GrangeSupport.module.css";

interface SupportItem {
  icon: string;
  title: string;
  description: string;
}

interface GrangeSupportProps {
  title: string;
  subtitle: string;
  items: SupportItem[];
  ctaText: string;
  ctaLink: string;
}

export default function GrangeSupport({
  title,
  subtitle,
  items,
  ctaText,
  ctaLink,
}: GrangeSupportProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <img
              src="/images/whitesands/icons/support.png"
              alt={`$Leadership Icon`}
              width={24}
              height={24}
            />
          </div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.itemsGrid}>
          {items.map((item, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.iconWrapper}>
                <img
                  src={item.icon}
                  alt={`${item.title} Icon`}
                  width={24}
                  height={24}
                />
              </div>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.ctaWrapper}>
          <a href={ctaLink} className={styles.ctaButton}>
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
