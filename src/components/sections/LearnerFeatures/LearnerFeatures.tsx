import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>Powerful Features for Effective Learning</h2>
          <p className={styles.subtitle}>
            Ms Lexi supports your learning — she does not replace your teachers or tutors.
          </p>
        </motion.div>

        {/* Meet Ms Lexi Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.msLexiCard}
        >
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
        </motion.div>

        {/* How Lextorah Helps and Learn Right Way */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={styles.featuresGrid}
        >
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
        </motion.div>

        {/* How Lextorah Learn Right Way */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={styles.featuresGrid}
        >
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
          
        </motion.div>
      </div>
    </section>
  );
}
