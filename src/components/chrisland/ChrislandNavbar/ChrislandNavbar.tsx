import { Link } from "react-router-dom";
import styles from "./ChrislandNavbar.module.css";

interface ChrislandNavbarProps {
  logo?: string;
  loginHref?: string;
  helpHref?: string;
}

export default function ChrislandNavbar({
  logo = "/images/chrisland/Chrisland-Schools-Logo.png",
  loginHref = "#",
  helpHref = "#",
}: ChrislandNavbarProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/chrisland-schools" className={styles.logo}>
          <img
            src={logo}
            alt="Chrisland Schools Logo"
            width={60}
            height={60}
            
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
