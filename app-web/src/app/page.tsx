"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { ListaReportes, type Reporte } from "./components/ListaReporte";
import { CATEGORY_LABELS, STATUS_LABELS } from "./data/issues";
import type { IssueCategory, IssueStatus } from "./data/issues";
import AdminLogin from "./components/AdminLogin";
import AdminReports from "./components/AdminReports";
import { useIssues } from "./context/IssuesContext";

type View = "home" | "admin-login" | "admin";

const FILTER_OPTIONS: { label: string; value: "all" | IssueStatus }[] = [
  { label: "Todos", value: "all" },
  { label: "En revision", value: "inprogress" },
  { label: "Pendientes", value: "reported" },
  { label: "Resuelto", value: "resolved" },
];

const CATEGORY_CHIPS: { label: string; value: "all" | IssueCategory }[] = [
  { label: "Todos", value: "all" },
  { label: "Baches", value: "pothole" },
  { label: "Alumbrado", value: "streetlight" },
  { label: "Drenajes", value: "drainage" },
  { label: "Basura", value: "other" },
];

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

export default function App() {
  const router = useRouter();
  const { issues, updateIssueStatus } = useIssues();

  const [view, setView] = useState<View>("home");
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | IssueStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | IssueCategory>("all");

  function handleStartReport() {
    router.push("/reportar/paso-1");
  }

  function handleAdminClick() {
    setView(adminAuthenticated ? "admin" : "admin-login");
  }

  function handleLogin(username: string, password: string): boolean {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAdminAuthenticated(true);
      setView("admin");
      return true;
    }
    return false;
  }

  function handleLogout() {
    setAdminAuthenticated(false);
    setView("home");
  }

  function handleStatusChange(id: string, status: IssueStatus) {
    updateIssueStatus(id, status);
  }

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter;
      return matchesStatus && matchesCategory;
    });
  }, [issues, statusFilter, categoryFilter]);

  // Transformación dinámica para que refleje cambios hechos desde el panel Admin y nuevos reportes
  const reportesIniciales: Reporte[] = filteredIssues.map((issue) => ({
    id: issue.id,
    titulo: issue.title,
    categoria: CATEGORY_LABELS[issue.category],
    ubicacion: `${issue.neighborhood}, ${issue.city}`,
    estado: STATUS_LABELS[issue.status],
    fecha: new Intl.DateTimeFormat("es-SV", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(issue.reportedAt)),
    imagenUrl: issue.photoUrl ?? "",
  }));

  return (
    <div className={styles.appPage}>
      

      {view === "admin-login" && (
        <AdminLogin
          onLogin={handleLogin}
          onCancel={() => setView("home")}
        />
      )}

      {view === "admin" && (
        <AdminReports
          issues={issues}
          onStatusChange={handleStatusChange}
          onOpenIssue={(id) => console.log("Abrir detalle:", id)}
          onLogout={handleLogout}
        />
      )}

      {view === "home" && (
        <>
          {/* Hero */}
          <section className={styles.hero}>
           
            <div className={styles.heroContainer}>
              <div className={styles.heroTop}>
                <div>
                  <div className={styles.heroBadgeRow}>
                    <div className={styles.heroFlagMini}>
                      <div className={`${styles.heroFlagStripe} ${styles.heroFlagStripeBlue}`} />
                      <div className={`${styles.heroFlagStripe} ${styles.heroFlagStripeWhite}`} />
                      <div className={`${styles.heroFlagStripe} ${styles.heroFlagStripeBlue}`} />
                    </div>
                    <span className={styles.heroEyebrow}>El Salvador · Plataforma de acción ciudadana</span>
                  </div>

                  <h1 className={styles.heroTitle}>
                    Reportar<br />
                    <span className={styles.heroTitleAccent}>Reportes Comunitarios</span>{" "}
                  </h1>

                  <p className={styles.heroSubtitle}>
                    Reportá problemas locales en Comunidad — baches, cortes de energía y tragantes bloqueados — y seguí cada paso hasta su solución.
                  </p>
                </div>

                <div className={styles.heroCtaBox}>
                  <button
                    type="button"
                    onClick={() => router.push("/reportar/paso-1") }
                    className={`${styles.btnPrimary} ${styles.heroCtaBtn}`}
                  >
                    + Reportar un problema
                  </button>
                  <p className={styles.heroCtaHint}>Te tomará menos de 2 minutos</p>
                </div>
              </div>
            </div>
          </section>

          <main className={`${styles.appMain} ${styles.appMainFeed}`}>
            <div className={styles.appLayout}>
              {/* Main stream */}
              <div className={styles.appStream}>
                {/* Controls */}
                <div className={styles.controlsBar}>
                  <div className={styles.filterGroup}>
                    {FILTER_OPTIONS.map((f) => (
                      <button
                        type="button"
                        key={f.label}
                        onClick={() => setStatusFilter(f.value)}
                        className={`${styles.filterBtn} ${statusFilter === f.value ? styles.filterBtnActive : ""}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <div className={styles.viewToggle}>
                    <button type="button" className={`${styles.viewToggleBtn} ${styles.viewToggleBtnActive}`}>
                      Cuadrícula
                    </button>
                    <button type="button" className={styles.viewToggleBtn}>
                      Mapa
                    </button>
                  </div>
                </div>

                {/* Categorias */}
                <div className={styles.categoryChips}>
                  {CATEGORY_CHIPS.map((cat) => (
                    <button
                      type="button"
                      key={cat.label}
                      onClick={() => setCategoryFilter(cat.value)}
                      className={`${styles.categoryChip} ${categoryFilter === cat.value ? styles.categoryChipActive : ""}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Seguimiento de Reportes */}
                <aside className={`${styles.statCard} ${styles.sidebarAside}`}>
                  <p className={styles.emptyStateTitle}>Reportes seguidos</p>
                  <p className={styles.emptyStateSubtitle}>Aquí aparecerán tus casos guardados.</p>
                </aside>

                {/* Stream */}
                <div className={styles.issuesGrid}>
                  <ListaReportes reportes={reportesIniciales} />
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

interface HeaderProps {
  onGoHome: () => void;
  onAdminClick: () => void;
  onReportClick: () => void;
  isAdmin: boolean;
}

function Header({ onGoHome, onAdminClick, onReportClick, isAdmin }: HeaderProps) {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.siteHeaderInner}>
        <button type="button" onClick={onGoHome} className={styles.brandBtn}>
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
            onClick={onAdminClick}
            className={styles.adminBtn}
          >
            {isAdmin ? "Panel Admin" : "Admin"}
          </button>
          <button
            type="button"
            onClick={onReportClick}
            className={`${styles.btnPrimary} ${styles.headerCta}`}
          >
            <span className={styles.headerCtaShort}>+ Reportar</span>
            <span className={styles.headerCtaFull}>+ Reportar problema</span>
          </button>
        </div>
      </div>
    </header>
  );
}