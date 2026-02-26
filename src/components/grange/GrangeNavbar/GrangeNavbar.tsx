import { Link } from "react-router-dom";
import styles from "./GrangeNavbar.module.css";

interface GrangeNavbarProps {
  logo?: string;
  loginHref?: string;
  helpHref?: string;
}

export default function GrangeNavbar({
  logo = "/images/grange/Grange-School-Logo.png",
  loginHref = "#",
  helpHref = "#",
}: GrangeNavbarProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/grange-schools" className={styles.logo}>
          <img
            src={logo}
            alt="Grange Schools Logo"
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
