import { Link } from "react-router-dom";
import styles from "./ChrislandFooter.module.css";

interface FooterLink {
  label: string;
  href: string;
}

interface ChrislandFooterProps {
  logo?: string;
  tagline: string;
  quickLinks: {
    title: string;
    links: FooterLink[];
  };
  poweredBy: {
    title: string;
    name: string;
    description: string;
  };
  copyright: string;
}

export default function ChrislandFooter({
  logo = "/images/chrisland/Chrisland-Schools-Logo.png",
  tagline,
  quickLinks,
  poweredBy,
  copyright,
}: ChrislandFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Logo Section */}
          <div className={styles.logoSection}>
            <div className={styles.logoWrapper}>
              <img
                src={logo}
                alt="Chrisland Schools Logo"
                width={48}
                height={48}
              />
            </div>
            <p className={styles.tagline}>{tagline}</p>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h3 className={styles.sectionTitle}>{quickLinks.title}</h3>
            <ul className={styles.linksList}>
              {quickLinks.links.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Powered By */}
          <div className={styles.poweredSection}>
            <h3 className={styles.sectionTitle}>{poweredBy.title}</h3>
            <p className={styles.poweredName}>{poweredBy.name}</p>
            <p className={styles.poweredDescription}>{poweredBy.description}</p>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
