import { useState } from "react";
import styles from "./FAQSection.module.css";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  subtitle?: string;
  faqs: FAQItem[];
}

export default function FAQSection({ title, subtitle, faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.open : ""}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <span className={styles.faqIcon}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
