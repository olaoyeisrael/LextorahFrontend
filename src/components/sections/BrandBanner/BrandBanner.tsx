import styles from "./BrandBanner.module.css";

interface BrandBannerProps {
  title: string;
  tagline: string;
}

export default function BrandBanner({ title, tagline }: BrandBannerProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.tagline}>{tagline}</p>
      </div>
    </section>
  );
}
