import styles from "./LearnerFeatures.module.css";

interface MsLexiInfo {
  title: string;
  description: string;
}

interface LearnerFeaturesProps {
  msLexiInfo: MsLexiInfo;
  howItHelps: MsLexiInfo;
  learnRightWay: MsLexiInfo;
}

export default function LearnerFeatures({
  msLexiInfo,
  howItHelps,
  learnRightWay,
}: LearnerFeaturesProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Powerful Features for Effective Learning</h2>
          <p className={styles.subtitle}>
            Ms Lexi supports your learning — she does not replace your teachers or tutors.
          </p>
        </div>

        {/* Meet Ms Lexi Card */}
        <div className={styles.msLexiCard}>
          <div className={styles.avatarContainer}>
            <img
              src="/images/Ms-Lexi-AI-Tutor.png"
              alt="Ms. Lexi - AI Learning Support Tutor"
              width={120}
              height={140}
              className={styles.avatar}
            />
          </div>
          <div className={styles.msLexiContent}>
            <div className={styles.featureIcon}>
              <img
                src="/icons/robot.png"
                alt="Robot Icon"
                width={32}
                height={32}
                />
            </div>
            <h3 className={styles.msLexiTitle}>{msLexiInfo.title}</h3>
            <p className={styles.msLexiDescription}>{msLexiInfo.description}</p>
          </div>
        </div>

        {/* How Lextorah Helps and Learn Right Way */}
        <div className={styles.featuresGrid}>
          {/* How Lextorah AI Helps You Learn */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <img
                src="/icons/book.png"
                alt="Book Icon"
                width={32}
                height={32}
              />
            </div>
            <h3 className={styles.featureTitle}>{howItHelps.title}</h3>
            <p className={styles.featureDescription}>{howItHelps.description}</p>
          </div>
          <div className={styles.featureImageWrapper}>
            <img
              src="/images/How_Lextorah AI_Helps_You_Learn.png"
              alt="How Lextorah AI Helps You Learn"
              width={400}
              height={200}
              className={styles.featureImage}
            />
          </div>
        </div>

        {/* How Lextorah Learn Right Way */}
        <div className={styles.featuresGrid}>
          {/* Learn the Right Way */}
          <div className={styles.featureImageWrapper}>
            <img
              src="/images/Learn_the_Right_Way.png"
              alt="Learn the Right Way"
              width={400}
              height={200}
              className={styles.featureImage}
            />
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <img
                  src="/icons/book.png"
                  alt="Book Icon"
                  width={32}
                  height={32}
                />
            </div>
            <h3 className={styles.featureTitle}>{learnRightWay.title}</h3>
            <p className={styles.featureDescription}>{learnRightWay.description}</p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
