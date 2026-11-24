import styles from './IssueCard.module.css';

export default function IssueCard() {
  return (
    <article className={styles.card}>
      {/* Barra de urgencia según estado: reported | inprogress | resolved */}
      <div className={`${styles.urgencyBar} ${styles.urgencyBarReported}`} />

      <div className={styles.imageWrapper}>
        <img
          src="https://placehold.co/600x400/1a2030/72a4ff?text=Reporte"
          alt="Ejemplo de reporte ciudadano"
          className={styles.image}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.topMeta}>
          <div className={styles.category}>
            <span className={styles.categoryIcon}>●</span>
            <span className={styles.categoryLabel}>Infraestructura vial</span>
          </div>
          <span className={`${styles.badge} ${styles.badgeReported}`}>Reportado</span>
        </div>

        <h3 className={styles.title}>
          Bache profundo en carril principal
        </h3>

        <p className={styles.description}>
          Se ha formado un bache amplio que afecta el tráfico vehicular y representa riesgo para motociclistas durante la lluvia.
        </p>

        <div className={styles.trackerWrapper}>
          <div className={styles.trackerBar}>
            <span className={`${styles.trackerStep} ${styles.trackerStepActive}`} />
            <span className={styles.trackerStep} />
            <span className={styles.trackerStep} />
          </div>
        </div>

        <div className={styles.locationRow}>
          <span className={styles.pinIcon}>⌖</span>
          <span className={styles.neighborhood}>Colonia Escalón</span>
          <span className={styles.dot}>·</span>
          <span>San Salvador</span>
          <span className={styles.dot}>·</span>
          <span>Hace 2 días</span>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.actionBtn}>
            Apoyar 14
          </button>

          <button type="button" className={`${styles.actionBtn} ${styles.actionBtnTrack}`}>
            Seguir
          </button>
        </div>
      </div>
    </article>
  );
}
