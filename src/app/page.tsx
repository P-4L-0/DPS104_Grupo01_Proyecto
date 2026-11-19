<<<<<<< HEAD
import IssueCard from './components/IssueCard';
import styles from './page.module.css';

const FILTER_OPTIONS = ['Todos', 'Reportados', 'En reparación', 'Resueltos'];
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
                Reportá.<br />
                <span className={styles.heroTitleAccent}>Seguí.</span>{' '}
                <span className={styles.heroTitleWhite}>Resolvé.</span>
              </h1>

              <p className={styles.heroSubtitle}>
                Reportá problemas locales en El Salvador — baches, cortes de energía y tragantes bloqueados — y seguí cada paso hasta su solución.
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

            {/* Stream */}
            <div className={styles.issuesGrid}>
              {/* Tarjeta de ejemplo 1 */}
              <IssueCard/>

            </div>
          </div>

          {/* Seguimiento de Reportes */}
          <aside className={styles.statCard}>
            <p className={styles.emptyStateTitle}>Reportes seguidos</p>
            <p className={styles.emptyStateSubtitle}>Aquí aparecerán tus casos guardados.</p>
          </aside>
=======
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className={styles.intro}>
          <h1>
            To get started, edit the{" "}
            <code className={styles.code}>page.tsx</code> file.
          </h1>
          <p>
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Deploy Now
          </a>
          <a
            className={styles.secondary}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
>>>>>>> ba26e7d (Initial commit from Create Next App)
        </div>
      </main>
    </div>
  );
}
<<<<<<< HEAD

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
=======
>>>>>>> ba26e7d (Initial commit from Create Next App)
