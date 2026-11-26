"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "../page.module.css";

interface HeaderProps {
  onAdminClick?: () => void;
  isAdmin?: boolean;
}

export default function Header({ onAdminClick, isAdmin = false }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  function handleGoHome() {
    router.push("/");
  }

  function handleReportClick() {
    router.push("/reportar/paso-1");
  }

  function handleAdmin() {
    if (onAdminClick) {
      onAdminClick();
    } else {
      router.push("/");
    }
  }

  return (
    <header className={styles.siteHeader}>
      <div className={styles.siteHeaderInner}>
        <button type="button" onClick={handleGoHome} className={styles.brandBtn}>
          <div className={styles.brandBadge}>
            <span className={styles.brandBadgeText}>SV</span>
          </div>
          <span className={styles.brandName}>
            CivicReport<span className={styles.brandNameAccent}>.sv</span>
          </span>
        </button>

        <div className={styles.siteHeaderActions}>
          <span className={styles.siteHeaderTagline}>Por la gente. Para la comunidad.</span>
          <button
            type="button"
            onClick={handleAdmin}
            className={styles.adminBtn}
          >
            {isAdmin ? "Panel Admin" : "Admin"}
          </button>
          {!pathname.startsWith("/reportar") && (
            <button
              type="button"
              onClick={handleReportClick}
              className={`${styles.btnPrimary} ${styles.headerCta}`}
            >
              <span className={styles.headerCtaShort}>+ Reportar</span>
              <span className={styles.headerCtaFull}>+ Reportar problema</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}