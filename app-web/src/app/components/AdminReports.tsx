"use client"
import { useMemo, useState } from 'react';
import type { Issue, IssueStatus } from '../data/issues';
import { CATEGORY_LABELS, STATUS_LABELS } from '../data/issues';
import { CategoryIcon, SearchIcon } from './Icons';
import StatusBadge from './StatusBadge';
import styles from '../AdminReports.module.css';

interface Props {
  issues: Issue[];
  onStatusChange: (id: string, status: IssueStatus) => void;
  onOpenIssue: (id: string) => void;
  onLogout: () => void;
}

const STATUS_OPTIONS: { value: 'all' | IssueStatus; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'reported', label: 'Reportados' },
  { value: 'inprogress', label: 'En reparación' },
  { value: 'resolved', label: 'Resueltos' },
];

const EDITABLE_STATUSES: IssueStatus[] = ['reported', 'inprogress', 'resolved'];

function formatDate(date: string) {
  return new Intl.DateTimeFormat('es-SV', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export default function AdminReports({ issues, onStatusChange, onOpenIssue, onLogout }: Props) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | IssueStatus>('all');

  const filteredIssues = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('es');

    return issues.filter(issue => {
      const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        [issue.id, issue.title, issue.neighborhood, issue.city, issue.reportedBy]
          .join(' ')
          .toLocaleLowerCase('es')
          .includes(normalizedQuery);
      return matchesStatus && matchesQuery;
    });
  }, [issues, query, statusFilter]);

  const stats = [
    { label: 'Total', value: issues.length, toneClass: styles.toneDefault },
    { label: 'Reportados', value: issues.filter(i => i.status === 'reported').length, toneClass: styles.toneReported },
    { label: 'En reparación', value: issues.filter(i => i.status === 'inprogress').length, toneClass: styles.toneInProgress },
    { label: 'Resueltos', value: issues.filter(i => i.status === 'resolved').length, toneClass: styles.toneResolved },
  ];

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <div>
          <div className={styles.badgeRow}>
            <span className={styles.adminBadge}>Administración</span>
            <span className={styles.brandText}>CivicReport.sv</span>
          </div>
          <h1 className={styles.title}>Gestión de reportes</h1>
          <p className={styles.subtitle}>
            Revisá la actividad ciudadana y actualizá el avance de cada caso.
          </p>
        </div>
        <div className={styles.headerActions}>
          <p className={styles.countText}>
            {filteredIssues.length} de {issues.length} reportes
          </p>
          <button onClick={onLogout} className={styles.logoutBtn}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <section className={styles.statsGrid}>
        {stats.map(item => (
          <div key={item.label} className={styles.statCard}>
            <p className={`${styles.statValue} ${item.toneClass}`}>{item.value}</p>
            <p className={styles.statLabel}>{item.label}</p>
          </div>
        ))}
      </section>

      <section className={styles.panel}>
        <div className={styles.toolbar}>
          <label className={styles.searchLabel}>
            <span className={styles.srOnly}>Buscar reportes</span>
            <SearchIcon className={styles.searchIcon} />
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Buscar por título, zona o persona..."
              className={styles.searchInput}
            />
          </label>

          <div className={styles.filterGroup} aria-label="Filtrar por estado">
            {STATUS_OPTIONS.map(option => {
              const isActive = statusFilter === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
                  className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ''}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {filteredIssues.length === 0 ? (
          <div className={styles.emptyState}>
            <SearchIcon className={styles.emptyIcon} />
            <p className={styles.emptyTitle}>No hay reportes que coincidan</p>
            <p className={styles.emptySubtitle}>Ajustá la búsqueda o seleccioná otro estado.</p>
          </div>
        ) : (
          <>
            {/* Vista Móvil */}
            <div className={styles.mobileList}>
              {filteredIssues.map(issue => (
                <article key={issue.id} className={styles.mobileCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitleGroup}>
                      <div className={styles.iconBox}>
                        <CategoryIcon category={issue.category} className={styles.categoryIcon} />
                      </div>
                      <div className={styles.minWidthZero}>
                        <p className={styles.metaText}>
                          #{issue.id} · {CATEGORY_LABELS[issue.category]}
                        </p>
                        <button
                          onClick={() => onOpenIssue(issue.id)}
                          className={styles.issueTitleBtn}
                        >
                          {issue.title}
                        </button>
                      </div>
                    </div>
                    <StatusBadge status={issue.status} size="sm" />
                  </div>

                  <div className={styles.cardMetaGrid}>
                    <div>
                      <p className={styles.metaLabel}>Ubicación</p>
                      <p className={styles.metaValue}>
                        {issue.neighborhood}, {issue.city}
                      </p>
                    </div>
                    <div>
                      <p className={styles.metaLabel}>Actualizado</p>
                      <p className={styles.metaValue}>{formatDate(issue.updatedAt)}</p>
                    </div>
                  </div>

                  <label className={styles.selectLabel}>
                    <span className={styles.selectLabelText}>Cambiar estado</span>
                    <select
                      value={issue.status}
                      onChange={e => onStatusChange(issue.id, e.target.value as IssueStatus)}
                      className={styles.statusSelect}
                    >
                      {EDITABLE_STATUSES.map(status => (
                        <option key={status} value={status}>
                          {STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                  </label>
                </article>
              ))}
            </div>

            {/* Vista Escritorio */}
            <div className={styles.desktopTableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Reporte</th>
                    <th>Ubicación</th>
                    <th>Actualizado</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIssues.map(issue => (
                    <tr key={issue.id}>
                      <td>
                        <div className={styles.cardTitleGroup}>
                          <div className={styles.iconBox}>
                            <CategoryIcon category={issue.category} className={styles.categoryIcon} />
                          </div>
                          <div>
                            <p className={styles.metaText}>
                              #{issue.id} · {CATEGORY_LABELS[issue.category]}
                            </p>
                            <button
                              onClick={() => onOpenIssue(issue.id)}
                              className={styles.issueTitleBtn}
                            >
                              {issue.title}
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className={styles.metaValue}>
                        {issue.neighborhood}, {issue.city}
                      </td>
                      <td className={styles.metaValue}>{formatDate(issue.updatedAt)}</td>
                      <td>
                        <StatusBadge status={issue.status} size="sm" />
                      </td>
                      <td>
                        <select
                          aria-label={`Cambiar estado de ${issue.title}`}
                          value={issue.status}
                          onChange={e => onStatusChange(issue.id, e.target.value as IssueStatus)}
                          className={styles.statusSelect}
                        >
                          {EDITABLE_STATUSES.map(status => (
                            <option key={status} value={status}>
                              {STATUS_LABELS[status]}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
