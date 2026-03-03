import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./ResponsibleUseBanner.module.css";

interface ResponsibleUseBannerProps {
  items: string[];
}

export default function ResponsibleUseBanner({ items }: ResponsibleUseBannerProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className={styles.section}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6 }}
        className={styles.container}
      >
        <h2 className={styles.title}>Responsible Use & Support</h2>
        <ul className={styles.list}>
          {items.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={styles.item}
            >
              <span className={styles.bullet}>•</span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
