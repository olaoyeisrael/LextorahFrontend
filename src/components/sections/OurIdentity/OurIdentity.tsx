import styles from "./OurIdentity.module.css";

interface OurIdentityProps {
  title: string;
  description: string;
  statement: string;
  brandName: string;
  tagline: string;
}

export default function OurIdentity({
  title,
  description,
  statement,
  brandName,
  tagline,
}: OurIdentityProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <p className={styles.statement}>{statement}</p>
        <div className={styles.brand}>
          <h3 className={styles.brandName}>{brandName}</h3>
          <p className={styles.tagline}>{tagline}</p>
        </div>
      </div>
    </section>
  );
}
