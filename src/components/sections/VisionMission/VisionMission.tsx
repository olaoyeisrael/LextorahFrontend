import styles from "./VisionMission.module.css";

interface VisionMissionItem {
  title: string;
  description: string;
  icon: string;
}

interface VisionMissionProps {
  vision: VisionMissionItem;
  mission: VisionMissionItem;
}

export default function VisionMission({ vision, mission }: VisionMissionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Vision Card */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <img
                src={vision.icon}
                alt="Vision Icon"
                width={32}
                height={32}
              />
            </div>
            <h3 className={styles.cardTitle}>{vision.title}</h3>
            <p className={styles.cardDescription}>{vision.description}</p>
          </div>

          {/* Mission Card */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <img
                src={mission.icon}
                alt="Mission Icon"
                width={32}
                height={32}
              />
            </div>
            <h3 className={styles.cardTitle}>{mission.title}</h3>
            <p className={styles.cardDescription}>{mission.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
