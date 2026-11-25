// 1. Cambiamos la importación de IssueCard por ListaReportes y los datos mock
import { ListaReportes } from './components/ListaReporte';
import { reportesIniciales } from './data/reportesMock';
import styles from './page.module.css';

const FILTER_OPTIONS = ['Todos', 'En revision', 'Pendientes', 'Resuelto'];
const CATEGORIES = ['Todos', 'Baches', 'Alumbrado', 'Drenajes', 'Basura'];

const STATS = [
  { label: 'Reportes totales', value: 24, variant: 'total' },
  { label: 'Recién reportados', value: 8, variant: 'reported' },
  { label: 'En reparación', value: 6, variant: 'inprogress' },
  { label: 'Resueltos', value: 10, variant: 'resolved' },
];

export default function App() {
  return (
    <div className={styles.appPage}>
      <Header />

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

              
            {/* Stream */}
            <div className={styles.issuesGrid}>
              {/* 2. Renderizamos la lista pasándole los datos */}
              <ListaReportes reportes={reportesIniciales} />
            </div>
          </div>
           {/* Seguimiento de Reportes */}
          <aside className={`${styles.statCard} ${styles.sidebarAside}`}>
            <p className={styles.emptyStateTitle}>Reportes seguidos</p>
            <p className={styles.emptyStateSubtitle}>Aquí aparecerán tus casos guardados.</p>
          </aside>

        </div>
    
    </div>
  );
}

function Header() {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.siteHeaderInner}>
        <button type="button" className={styles.brandBtn}>
          <div className={styles.brandBadge}>
            <span className={styles.brandBadgeText}>SV</span>
          </div>
          <span className={styles.brandName}>
            CivicReport<span className={styles.brandNameAccent}>.sv</span>
          </span>
        </button>

        <div className={styles.siteHeaderActions}>
          <span className={styles.siteHeaderTagline}>Por la gente. Para la comunidad.</span>
          <button type="button" className={`${styles.btnPrimary} ${styles.headerCta}`}>
            <span className={styles.headerCtaShort}>+ Reportar</span>
            <span className={styles.headerCtaFull}>+ Reportar problema</span>
          </button>
        </div>
      </div>
    </header>
  );
}