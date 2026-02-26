import styles from "./LegalContent.module.css";

interface Section {
  number: number;
  title: string;
  content: string[];
}

interface LegalContentProps {
  intro: string[];
  sections: Section[];
  disclaimer?: string;
}

export default function LegalContent({
  intro,
  sections,
  disclaimer,
}: LegalContentProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Intro paragraphs */}
        <div className={styles.intro}>
          {intro.map((paragraph, index) => (
            <p 
              key={index} 
              className={styles.introParagraph}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>

        {/* Sections */}
        <div className={styles.content}>
          {sections.map((section) => (
            <div key={section.number} className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>{section.number}.</span>{" "}
                {section.title}
              </h2>
              <div className={styles.sectionContent}>
                {section.content.map((line, index) => {
                  if (line === "") {
                    return <div key={index} className={styles.spacer} />;
                  }
                  if (line.startsWith("•!")) {
                    // Red bullet for warnings/negatives
                    const content = line.replace("•!", "•");
                    return (
                      <p 
                        key={index} 
                        className={`${styles.bulletItem} ${styles.redBullet}`}
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                    );
                  }
                  if (line.startsWith("•")) {
                    return (
                      <p 
                        key={index} 
                        className={styles.bulletItem}
                        dangerouslySetInnerHTML={{ __html: line }}
                      />
                    );
                  }
                  return (
                    <p 
                      key={index} 
                      className={styles.paragraph}
                      dangerouslySetInnerHTML={{ __html: line }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        {disclaimer && (
          <div className={styles.disclaimer}>
            <p 
              className={styles.disclaimerText}
              dangerouslySetInnerHTML={{ __html: disclaimer }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
