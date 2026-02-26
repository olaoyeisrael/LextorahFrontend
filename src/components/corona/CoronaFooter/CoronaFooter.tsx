import { useRef, useEffect, useState } from "react";
import styles from "./CoronaFooter.module.css";

interface CoronaFooterProps {
  logo?: string;
  poweredBy: string;
  description: string;
  copyright: string;
}

export default function CoronaFooter({
  logo = "/images/logo.png",
  poweredBy,
  description,
  copyright,
}: CoronaFooterProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [logoHeight, setLogoHeight] = useState(42);

  useEffect(() => {
    const updateHeight = () => {
      if (textRef.current) {
        setLogoHeight(textRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.branding}>
          <div className={styles.logoWrapper} style={{ height: logoHeight }}>
            <img
              src={logo}
              alt="Lextorah AI Logo"
              width={Math.round(logoHeight * 0.88)}
              height={logoHeight}
              style={{ objectFit: "contain" }}
            />
          </div>
          <span 
            ref={textRef}
            className={styles.poweredBy} 
            dangerouslySetInnerHTML={{ __html: poweredBy }} 
          />
        </div>
        <p className={styles.description}>{description}</p>
        <p className={styles.copyright}>{copyright}</p>
      </div>
    </footer>
  );
}
