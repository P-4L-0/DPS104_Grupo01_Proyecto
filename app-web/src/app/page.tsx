"use client"
import { useState } from 'react';
import styles from './page.module.css';
import { ListaReportes, type Reporte } from './components/ListaReporte';
import { SAMPLE_ISSUES, CATEGORY_LABELS, STATUS_LABELS } from './data/issues';
import type { Issue, IssueStatus } from './data/issues';
import AdminLogin from './components/AdminLogin';
import AdminReports from './components/AdminReports';

type View = "home" | "admin-login" | "admin";

const FILTER_OPTIONS = ["Todos", "En revision", "Pendientes", "Resuelto"];
const CATEGORIES = ["Todos", "Baches", "Alumbrado", "Drenajes", "Basura"];

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

const STATS = [
  { label: "Reportes totales", value: 24, variant: "total" },
  { label: "Recién reportados", value: 8, variant: "reported" },
  { label: "En reparación", value: 6, variant: "inprogress" },
  { label: "Resueltos", value: 10, variant: "resolved" },
];

export default function App() {
  const [issues, setIssues] = useState<Issue[]>(SAMPLE_ISSUES);
  const [view, setView] = useState<View>('home');
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

  // Transformación dinámica para que refleje cambios hechos desde el panel Admin
  const reportesIniciales: Reporte[] = issues.map((issue) => ({
    id: issue.id,
    titulo: issue.title,
    categoria: CATEGORY_LABELS[issue.category],
    ubicacion: `${issue.neighborhood}, ${issue.city}`,
    estado: STATUS_LABELS[issue.status],
    fecha: new Intl.DateTimeFormat('es-SV', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(issue.reportedAt)),
    imagenUrl: issue.photoUrl ?? '',
  }));

  function handleAdminClick() {
    setView(adminAuthenticated ? 'admin' : 'admin-login');
  }

  function handleLogin(username: string, password: string): boolean {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAdminAuthenticated(true);
      setView('admin');
      return true;
    }
    return false;
  }

  function handleLogout() {
    setAdminAuthenticated(false);
    setView('home');
  }

  function handleStatusChange(id: string, status: IssueStatus) {
    setIssues((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status, updatedAt: new Date().toISOString() }
          : item
      )
    );
  }

  return (
    <div className={styles.appPage}>
      <Header
        onGoHome={() => setView('home')}
        onAdminClick={handleAdminClick}
        isAdmin={adminAuthenticated}
      />

        {view === 'admin-login' && (
          <AdminLogin
            onLogin={handleLogin}
            onCancel={() => setView('home')}
          />
        )}

      {view === 'admin' && (
        <AdminReports
          issues={issues}
          onStatusChange={handleStatusChange}
          onOpenIssue={(id) => console.log('Abrir detalle:', id)}
          onLogout={handleLogout}
        />
      )}

      {view === 'home' && (
        <>
          {/* Hero */}
          <section className={styles.hero}>
            <div className={styles.heroFlagAccent} />
            <div className={styles.heroGlow} />

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
                    <span className={styles.heroTitleAccent}>Reportes Comunitarios</span>{' '}
                  </h1>

                  <p className={styles.heroSubtitle}>
                    Reportá problemas locales en Comunidad — baches, cortes de energía y tragantes bloqueados — y seguí cada paso hasta su solución.
                  </p>
                </div>

                <div className={styles.heroCtaBox}>
                  <button type="button" className={`${styles.btnPrimary} ${styles.heroCtaBtn}`}>
                    + Reportar un problema
                  </button>
                  <p className={styles.heroCtaHint}>Te tomará menos de 2 minutos</p>
                </div>
              </div>

              {/* Stats row */}
              <div className={styles.statsGrid}>
                {STATS.map((stat, index) => (
                  <div key={index} className={`${styles.statCard} ${styles[`statCard_${stat.variant}`]}`}>
                    <p className={`${styles.statCardValue} ${styles[`statCardValue_${stat.variant}`]}`}>
                      {stat.value}
                    </p>
                    <p className={styles.statCardLabel}>{stat.label}</p>
                  </div>
                ))}
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
                    {FILTER_OPTIONS.map((f, index) => (
                      <button
                        type="button"
                        key={f}
                        className={`${styles.filterBtn} ${index === 0 ? styles.filterBtnActive : ''}`}
                      >
                        {f}
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
                  {CATEGORIES.map((cat, index) => (
                    <button
                      type="button"
                      key={cat}
                      className={`${styles.categoryChip} ${index === 0 ? styles.categoryChipActive : ''}`}
                    >
                      {cat}
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
  isAdmin: boolean;
}

function Header({ onGoHome, onAdminClick, isAdmin }: HeaderProps) {
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
            {isAdmin ? 'Panel Admin' : 'Admin'}
          </button>
          <button type="button" className={`${styles.btnPrimary} ${styles.headerCta}`}>
            <span className={styles.headerCtaShort}>+ Reportar</span>
            <span className={styles.headerCtaFull}>+ Reportar problema</span>
          </button>
        </div>
      </div>
    </header>
  );
}
