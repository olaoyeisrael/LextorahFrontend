import styles from "./OurCommitment.module.css";

interface OurCommitmentProps {
  title: string;
  items: { icon: string; description: string }[];
}

export default function OurCommitment({ title, items }: OurCommitmentProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.list}>
          {items.map((item, index) => (
            <div key={index} className={styles.item}>
              <div className={index % 2 === 0 ? styles.iconWrapper : `${styles.iconWrapper} ${styles.alternateIconWrapper}`}>
                <img
                  src={item.icon}
                  alt={`Icon`}
                  width={20}
                  height={20}
                />
              </div>
              <p className={styles.text}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
