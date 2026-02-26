import styles from "./ResponsibleUseBanner.module.css";

interface ResponsibleUseBannerProps {
  items: string[];
}

export default function ResponsibleUseBanner({ items }: ResponsibleUseBannerProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Responsible Use & Support</h2>
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={index} className={styles.item}>
              <span className={styles.bullet}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
