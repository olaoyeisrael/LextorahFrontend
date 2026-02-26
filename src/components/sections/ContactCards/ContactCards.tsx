import styles from "./ContactCards.module.css";

interface ContactItem {
  icon?: string;
  type: string;
  value: string;
  label?: string;
}

interface ContactCard {
  icon: string;
  title: string;
  description: string;
  contacts: ContactItem[];
}

interface ContactCardsProps {
  cards: ContactCard[];
}

export default function ContactCards({ cards }: ContactCardsProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <img
                  src={card.icon}
                  alt={`Icon`}
                  width={24}
                  height={24}
                />
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              {card.description && (
                <p className={styles.cardDescription}>{card.description}</p>
              )}
              <div className={styles.contacts}>
                {card.contacts.map((contact, idx) => (
                  <div key={idx} className={styles.contactItem}>
                    {contact.type === "email" && (
                      <a
                        href={`mailto:${contact.value}`}
                        className={styles.emailLink}
                      >
                        {contact.icon && (
                          <span className={styles.contactIcon}>
                            <img
                              src={contact.icon}
                              alt={`Icon`}
                              width={32}
                              height={32}
                            />
                          </span>
                        )}
                        {contact.value}
                      </a>
                    )}
                    {contact.type === "phone" && (
                      <a
                        href={`tel:${contact.value.replace(/\s/g, "")}`}
                        className={styles.phoneLink}
                      >
                        {contact.icon && (
                          <span className={styles.contactIcon}>
                            <img
                              src={contact.icon}
                              alt={`Icon`}
                              width={32}
                              height={32}
                            />
                          </span>
                        )}
                        {contact.value}
                      </a>
                    )}
                    {contact.type === "hours" && (
                      <div className={styles.hoursItem}>
                        {contact.icon && (
                          <span className={styles.contactIcon}>
                            <img
                              src={contact.icon}
                              alt={`Icon`}
                              width={32}
                              height={32}
                            />
                          </span>
                        )}
                        <span className={styles.hoursText}>
                          {contact.value.split("\n").map((line, i) => (
                            <span key={i}>
                              {line}
                              {i === 0 && <br />}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {contact.type === "address" && (
                      <div className={styles.addressItem}>
                        {contact.label && (
                          <strong className={styles.addressLabel}>
                            {contact.label}
                          </strong>
                        )}
                        <span className={styles.addressText}>
                          {contact.value.split("\n").map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {contact.type === "note" && (
                      <p className={styles.note}>{contact.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
