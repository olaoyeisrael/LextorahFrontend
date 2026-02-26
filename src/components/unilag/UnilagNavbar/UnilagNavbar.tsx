import { Link } from "react-router-dom";
import styles from "./UnilagNavbar.module.css";

interface UnilagNavbarProps {
  logo?: string;
  loginHref?: string;
  helpHref?: string;
}

export default function UnilagNavbar({logo = "/images/grange/UNILAG-International-School-Logo.png",
  loginHref = "#",
  helpHref = "#",
}: UnilagNavbarProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/unilag-schools" className={styles.logo}>
          <img
            src={logo}
            alt="UNILAG International School Logo"
            width={80}
            height={80}
            className={styles.logoImage}
            
          />
        </Link>

        <div className={styles.navActions}>
          <Link to="/login" className={styles.loginBtn}>
            Log In
          </Link>
          <Link to={helpHref} className={styles.helpBtn}>
            Get Help
          </Link>
        </div>
      </nav>
    </header>
  );
};
