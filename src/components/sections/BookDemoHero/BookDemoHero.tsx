import styles from "./BookDemoHero.module.css";

interface BookDemoHeroProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function BookDemoHero({
  title,
  subtitle,
  description,
}: BookDemoHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <img
            src="/icons/demo.png"
            alt="Demo Icon"
            width={32}
            height={32}
          />
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
}
