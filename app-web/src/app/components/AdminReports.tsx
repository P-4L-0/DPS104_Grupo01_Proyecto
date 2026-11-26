"use client";
import { useMemo, useState } from 'react';
import type { Issue, IssueStatus } from '../data/issues';
import { CATEGORY_LABELS, STATUS_LABELS } from '../data/issues';
import { CategoryIcon, SearchIcon } from './Icons';
import StatusBadge from './StatusBadge';
import styles from '../style/AdminReports.module.css';

interface Props {
  issues: Issue[];
  onStatusChange: (id: string, status: IssueStatus, note: string) => void;
  onOpenIssue: (id: string) => void;
  onLogout: () => void;
}

const STATUS_OPTIONS: { value: 'all' | IssueStatus; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'reported', label: 'Reportados' },
  { value: 'inprogress', label: 'En reparación' },
  { value: 'resolved', label: 'Resueltos' },
];

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
  const [editingIssueId, setEditingIssueId] = useState<string | null>(null);
  const [nextStatus, setNextStatus] = useState<IssueStatus>('reported');
  const [activityNote, setActivityNote] = useState('');
  const editingIssue = issues.find(issue => issue.id === editingIssueId);

  function openUpdate(issue: Issue) {
    setEditingIssueId(issue.id);
    setNextStatus(issue.status);
    setActivityNote('');
  }

  function closeUpdate() {
    setEditingIssueId(null);
    setActivityNote('');
  }

  function saveUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingIssue) return;
    onStatusChange(editingIssue.id, nextStatus, activityNote);
    closeUpdate();
  }

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

  return (
    <main className={styles['admin-container']}>
      <div className={styles['admin-header']}>
        <div>
          <div className={styles['admin-brand-row']}>
            <span className={styles['admin-badge']}>Administración</span>
            <span className={styles['admin-brand-name']}>CivicReport.sv</span>
          </div>
          <h1 className={styles['admin-title']}>Gestión de reportes</h1>
          <p className={styles['admin-subtitle']}>
            Revisá la actividad ciudadana y actualizá el avance de cada caso.
          </p>
        </div>

        <div className={styles['admin-header-actions']}>
          <p className={styles['admin-counter']}>
            {filteredIssues.length} de {issues.length} reportes
          </p>
          <button onClick={onLogout} className={styles['admin-logout-btn']}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <section className={styles['admin-stats-grid']}>
        {[
          { label: 'Total', value: issues.length, toneClass: styles['tone-total'] },
          {
            label: 'Reportados',
            value: issues.filter(i => i.status === 'reported').length,
            toneClass: styles['tone-reported'],
          },
          {
            label: 'En reparación',
            value: issues.filter(i => i.status === 'inprogress').length,
            toneClass: styles['tone-inprogress'],
          },
          {
            label: 'Resueltos',
            value: issues.filter(i => i.status === 'resolved').length,
            toneClass: styles['tone-resolved'],
          },
        ].map(item => (
          <div key={item.label} className={styles['admin-stat-card']}>
            <p className={`${styles['admin-stat-value']} ${item.toneClass}`}>{item.value}</p>
            <p className={styles['admin-stat-label']}>{item.label}</p>
          </div>
        ))}
      </section>

      <section className={styles['admin-panel']}>
        <div className={styles['admin-toolbar']}>
          <label className={styles['admin-search-label']}>
            <span className={styles['sr-only']}>Buscar reportes</span>
            <SearchIcon className={styles['admin-search-icon']} />
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Buscar por título, zona o persona..."
              className={styles['admin-search-input']}
            />
          </label>

          <div className={styles['admin-filter-group']} aria-label="Filtrar por estado">
            {STATUS_OPTIONS.map(option => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={`${styles['admin-filter-btn']} ${
                  statusFilter === option.value ? styles['is-active'] : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {filteredIssues.length === 0 ? (
          <div className={styles['admin-empty-state']}>
            <SearchIcon className={styles['admin-empty-icon']} />
            <p className={styles['admin-empty-title']}>No hay reportes que coincidan</p>
            <p className={styles['admin-empty-subtitle']}>
              Ajustá la búsqueda o seleccioná otro estado.
            </p>
          </div>
        ) : (
          <>
            {/* Vista móvil (tarjetas) */}
            <div className={styles['admin-mobile-list']}>
              {filteredIssues.map(issue => (
                <article key={issue.id} className={styles['admin-mobile-card']}>
                  <div className={styles['admin-mobile-card-top']}>
                    <div className={styles['admin-issue-summary']}>
                      <div className={styles['admin-category-icon']}>
                        <CategoryIcon category={issue.category} className={styles['icon-sm']} />
                      </div>
                      <div className={styles['admin-min-w-0']}>
                        <p className={styles['admin-issue-meta']}>
                          #{issue.id} · {CATEGORY_LABELS[issue.category]}
                        </p>
                        <button
                          onClick={() => onOpenIssue(issue.id)}
                          className={`${styles['admin-issue-title-btn']} ${styles['line-clamp-2']}`}
                        >
                          {issue.title}
                        </button>
                      </div>
                    </div>
                    <StatusBadge status={issue.status} size="sm" />
                  </div>

                  <div className={styles['admin-mobile-details']}>
                    <div>
                      <p className={styles['admin-detail-label']}>Ubicación</p>
                      <p className={styles['admin-detail-value']}>
                        {issue.neighborhood}, {issue.city}
                      </p>
                    </div>
                    <div>
                      <p className={styles['admin-detail-label']}>Actualizado</p>
                      <p className={styles['admin-detail-value']}>{formatDate(issue.updatedAt)}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => openUpdate(issue)}
                    className={`${styles['admin-btn-primary']} ${styles['admin-btn-full']}`}
                  >
                    Actualizar reporte
                  </button>
                </article>
              ))}
            </div>

            {/* Vista escritorio (tabla) */}
            <div className={styles['admin-table-wrapper']}>
              <table className={styles['admin-table']}>
                <thead>
                  <tr>
                    <th>Reporte</th>
                    <th>Ubicación</th>
                    <th>Fecha</th>
                    <th>Estado actual</th>
                    <th>Actualizar</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIssues.map(issue => (
                    <tr key={issue.id} className={styles['admin-table-row']}>
                      <td className={styles['admin-td-report']}>
                        <div className={styles['admin-issue-summary']}>
                          <div className={styles['admin-category-icon']}>
                            <CategoryIcon category={issue.category} className={styles['icon-sm']} />
                          </div>
                          <div className={styles['admin-min-w-0']}>
                            <p className={styles['admin-issue-meta']}>
                              #{issue.id} · {CATEGORY_LABELS[issue.category]}
                            </p>
                            <button
                              onClick={() => onOpenIssue(issue.id)}
                              className={`${styles['admin-table-title-btn']} ${styles['line-clamp-1']}`}
                            >
                              {issue.title}
                            </button>
                            <p className={styles['admin-reported-by']}>Por {issue.reportedBy}</p>
                          </div>
                        </div>
                      </td>
                      <td className={styles['admin-td-location']}>
                        <p className={styles['admin-location-neighborhood']}>{issue.neighborhood}</p>
                        <p className={styles['admin-location-city']}>{issue.city}</p>
                      </td>
                      <td className={styles['admin-td-date']}>{formatDate(issue.updatedAt)}</td>
                      <td className={styles['admin-td-status']}>
                        <StatusBadge status={issue.status} size="sm" />
                      </td>
                      <td className={styles['admin-td-action']}>
                        <button
                          onClick={() => openUpdate(issue)}
                          className={styles['admin-btn-outline-primary']}
                        >
                          Actualizar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      <p className={styles['admin-session-note']}>
        Los cambios se conservan únicamente durante esta sesión.
      </p>

      {editingIssue && (
        <div
          className={styles['admin-modal-overlay']}
          role="dialog"
          aria-modal="true"
          aria-labelledby="update-report-title"
          onMouseDown={event => {
            if (event.target === event.currentTarget) closeUpdate();
          }}
        >
          <div className={styles['admin-modal-dialog']}>
            <div className={styles['admin-modal-header']}>
              <div className={styles['admin-min-w-0']}>
                <p className={styles['admin-modal-eyebrow']}>Reporte #{editingIssue.id}</p>
                <h2
                  id="update-report-title"
                  className={`${styles['admin-modal-title']} ${styles['line-clamp-1']}`}
                >
                  Actualizar reporte
                </h2>
                <p className={`${styles['admin-modal-subtitle']} ${styles['line-clamp-1']}`}>
                  {editingIssue.title}
                </p>
              </div>
              <button
                onClick={closeUpdate}
                aria-label="Cerrar"
                className={styles['admin-modal-close']}
              >
                ×
              </button>
            </div>

            <form onSubmit={saveUpdate} className={styles['admin-modal-form']}>
              <div className={styles['admin-form-left']}>
                <div>
                  <p className={styles['admin-field-label']}>Nuevo estado</p>
                  <div className={styles['admin-radio-list']}>
                    {STATUS_OPTIONS.slice(1).map(option => {
                      const value = option.value as IssueStatus;
                      const isSelected = nextStatus === value;
                      return (
                        <label
                          key={value}
                          className={`${styles['admin-radio-card']} ${
                            isSelected ? styles['is-selected'] : ''
                          }`}
                        >
                          <span className={styles['admin-radio-left']}>
                            <input
                              type="radio"
                              name="status"
                              value={value}
                              checked={isSelected}
                              onChange={() => setNextStatus(value)}
                              className={styles['admin-radio-input']}
                            />
                            <span className={styles['admin-radio-text']}>
                              {STATUS_LABELS[value]}
                            </span>
                          </span>
                          <StatusBadge status={value} size="sm" />
                        </label>
                      );
                    })}
                  </div>
                </div>

                <label className={styles['admin-textarea-block']}>
                  <span className={styles['admin-field-label']}>Nota de actividad</span>
                  <textarea
                    value={activityNote}
                    onChange={event => setActivityNote(event.target.value)}
                    required
                    rows={4}
                    placeholder="Describí la gestión realizada, responsable o próximo paso..."
                    className={styles['admin-textarea']}
                  />
                </label>
              </div>

              <div>
                <div className={styles['admin-history-header']}>
                  <p className={`${styles['admin-field-label']} ${styles['no-margin']}`}>
                    Historial de actividad
                  </p>
                  <span className={styles['admin-history-count']}>
                    {editingIssue.statusHistory.length} registros
                  </span>
                </div>
                <div className={styles['admin-timeline']}>
                  {[...editingIssue.statusHistory].reverse().map((entry, index) => (
                    <div key={`${entry.date}-${index}`} className={styles['admin-timeline-item']}>
                      {index < editingIssue.statusHistory.length - 1 && (
                        <div className={styles['admin-timeline-line']} />
                      )}
                      <div className={styles['admin-timeline-dot']} />
                      <div className={styles['admin-min-w-0']}>
                        <div className={styles['admin-timeline-meta']}>
                          <p className={styles['admin-timeline-status']}>
                            {STATUS_LABELS[entry.status]}
                          </p>
                          <p className={styles['admin-timeline-date']}>
                            {formatDate(entry.date)}
                          </p>
                        </div>
                        <p className={styles['admin-timeline-note']}>{entry.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles['admin-modal-footer']}>
                <button type="button" onClick={closeUpdate} className={styles['admin-btn-ghost']}>
                  Cancelar
                </button>
                <button type="submit" className={styles['admin-btn-primary']}>
                  Guardar actualización
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
