import styles from "./LagoonFooter.module.css";

interface QuickLink {
  label: string;
  href: string;
}

interface LagoonFooterProps {
  logo: string;
  description: string;
  quickLinks: QuickLink[];
  poweredByText: { title: string; name: string; description: string };
  copyright: string;
}

export default function LagoonFooter({
  logo,
  description,
  quickLinks,
  poweredByText,
  copyright,
}: LagoonFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Brand column */}
          <div className={styles.brandColumn}>
            <img src={logo} alt="Unilag Schools" width={32} height={32} className={styles.logo} />
            <p className={styles.description}>{description}</p>
          </div>

          {/* Quick Links column */}
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Powered By column */}
          <div className={styles.poweredColumn}>
            <h4 className={styles.columnTitle}>Powered By</h4>
            <div className={styles.poweredBy}>
              <span className={styles.poweredText} dangerouslySetInnerHTML={{ __html: poweredByText.name }}></span>
              <span className={styles.poweredText} dangerouslySetInnerHTML={{ __html: poweredByText.description }}></span>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}