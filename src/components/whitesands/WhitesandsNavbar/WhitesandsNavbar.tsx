import { Link } from "react-router-dom";
import styles from "./WhitesandsNavbar.module.css";

interface WhitesandsNavbarProps {
  logo?: string;
  loginHref?: string;
  helpHref?: string;
}

export default function WhitesandsNavbar({
  logo = "/images/whitesands/Whitesands-School-Logo.png",
  loginHref = "#",
  helpHref = "#",
}: WhitesandsNavbarProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/whitesands-schools" className={styles.logo}>
          <img
            src={logo}
            alt="Whitesands Schools Logo"
            width={40}
            height={40}
            
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
}
