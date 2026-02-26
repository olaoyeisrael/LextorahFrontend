import { Link } from "react-router-dom";
import styles from "./LagoonNavbar.module.css";

interface LagoonNavbarProps {
  logo?: string;
  brandName?: string;
  loginHref?: string;
  helpHref?: string;
}

export default function LagoonNavbar({
  logo = "/images/lagoon/logo.png",
  brandName = "Lagoon Schools",
  loginHref = "#",
  helpHref = "#",
}: LagoonNavbarProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/lagoon-schools" className={styles.brand}>
          <img
            src={logo}
            alt="Lagoon Schools Logo"
            width={32}
            height={32}
            
          />
          <span className={styles.brandName}>{brandName}</span>
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
}
