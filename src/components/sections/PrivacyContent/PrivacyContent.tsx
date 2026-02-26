import styles from "./PrivacyContent.module.css";

interface Subsection {
  number: string;
  title: string;
  intro?: string;
  items: string[];
}

interface ContactInfo {
  icon: string;
  type: string;
  label: string;
  value: string;
}

interface Section {
  number: number;
  title: string;
  intro?: string;
  content?: string[];
  subsections?: Subsection[];
  footer?: string;
  contact?: ContactInfo;
}

interface PrivacyContentProps {
  sections: Section[];
}

export default function PrivacyContent({ sections }: PrivacyContentProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {sections.map((section) => (
          <div key={section.number} className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>{section.number}.</span>{" "}
              {section.title}
            </h2>

            {/* Regular content (intro paragraph) */}
            {section.intro && !section.subsections && (
              <p 
                className={styles.intro}
                dangerouslySetInnerHTML={{ __html: section.intro }}
              />
            )}

            {/* Regular content as paragraphs */}
            {section.content && !section.subsections && (
              <div className={styles.contentList}>
                {section.content.map((item, index) => (
                  <p
                    key={index}
                    className={
                      section.intro ? styles.bulletItem : styles.paragraph
                    }
                    dangerouslySetInnerHTML={{ 
                      __html: section.intro ? `• ${item}` : item 
                    }}
                  />
                ))}
              </div>
            )}

            {/* Subsections (for section 2) */}
            {section.subsections && (
              <div className={styles.subsections}>
                {section.subsections.map((subsection) => (
                  <div key={subsection.number} className={styles.subsection}>
                    <h3 className={styles.subsectionTitle}>
                      {subsection.number} {subsection.title}
                    </h3>
                    {subsection.intro && (
                      <p 
                        className={styles.subsectionIntro}
                        dangerouslySetInnerHTML={{ __html: subsection.intro }}
                      />
                    )}
                    <ul className={styles.itemList}>
                      {subsection.items.map((item, index) => (
                        <li 
                          key={index} 
                          className={styles.item}
                          dangerouslySetInnerHTML={{ __html: item }}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Footer text */}
            {section.footer && (
              <p 
                className={styles.footer}
                dangerouslySetInnerHTML={{ __html: section.footer }}
              />
            )}

            {/* Contact info */}
            {section.contact && (
              <div className={styles.contactInfo}>
                <a
                  href={`mailto:${section.contact.value}`}
                  className={styles.contactLink}
                >
                  <span className={styles.contactIcon}>
                    <img
                      src={section.contact.icon}
                      alt={`Icon`}
                      width={32}
                      height={32}
                    />
                  </span>
                  <span className={styles.contactLabel}>
                    {section.contact.label}:
                  </span>
                  <span className={styles.contactValue}>
                    {section.contact.value}
                  </span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
