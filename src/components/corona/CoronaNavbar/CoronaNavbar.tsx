import { Link } from "react-router-dom";
import styles from "./CoronaNavbar.module.css";

interface CoronaNavbarProps {
  logo?: string;
  loginHref?: string;
  helpHref?: string;
}

export default function CoronaNavbar({
  logo = "/images/corona/logo.png",
  loginHref = "#",
  helpHref = "#",
}: CoronaNavbarProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/corona-schools" className={styles.logo}>
          <img
            src={logo}
            alt="Corona Schools Logo"
            width={40}
            height={40}
            
          />
        </Link>

        <div className={styles.navActions}>
          <Link to="/login"className={styles.loginBtn}>
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
