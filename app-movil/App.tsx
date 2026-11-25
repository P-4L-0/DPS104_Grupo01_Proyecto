import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CATEGORY_LABELS, SAMPLE_ISSUES } from './src/data/issues';
import type { Issue } from './src/data/issues';
import IssueCard from './src/components/IssueCard';
import MiniMap from './src/components/MiniMap';
import TrackedRail from './src/components/TrackedRail';
import { GridIcon, MapIcon, SearchIcon } from './src/components/Icons';
import IssueDetail from './src/screens/IssueDetail';
import ReportForm from './src/screens/ReportForm';

type ViewMode = 'home' | 'detail' | 'report';
type StreamView = 'grid' | 'map';
type FilterOption = 'Todos' | 'Reportados' | 'En reparación' | 'Resueltos';

const FILTER_OPTIONS: FilterOption[] = [
  'Todos',
  'Reportados',
  'En reparación',
  'Resueltos',
];

function getStats(issues: Issue[]) {
  return {
    total: issues.length,
    inprogress: issues.filter((i) => i.status === 'inprogress').length,
    resolved: issues.filter((i) => i.status === 'resolved').length,
    reported: issues.filter((i) => i.status === 'reported').length,
  };
}

export default function App() {
  const [issues, setIssues] = useState<Issue[]>(SAMPLE_ISSUES);
  const [view, setView] = useState<ViewMode>('home');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [streamView, setStreamView] = useState<StreamView>('grid');
  const [trackedIds, setTrackedIds] = useState<Set<string>>(new Set(['1', '4']));
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<FilterOption>('Todos');
  const [categoryFilter, setCategoryFilter] = useState('Todos');

  const selectedIssue = issues.find((i) => i.id === selectedId);
  const trackedIssues = issues.filter((i) => trackedIds.has(i.id));
  const stats = getStats(issues);

  const categories = [
    'Todos',
    ...Array.from(new Set(issues.map((i) => CATEGORY_LABELS[i.category]))),
  ];

  const filteredIssues = issues.filter((issue) => {
    const statusMatch =
      filter === 'Todos' ||
      (filter === 'Reportados' && issue.status === 'reported') ||
      (filter === 'En reparación' && issue.status === 'inprogress') ||
      (filter === 'Resueltos' && issue.status === 'resolved');
    const catMatch =
      categoryFilter === 'Todos' ||
      CATEGORY_LABELS[issue.category] === categoryFilter;
    return statusMatch && catMatch;
  });

  function handleTrack(id: string) {
    setTrackedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleUpvote(id: string) {
    setUpvotedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleClickIssue(id: string) {
    setSelectedId(id);
    setView('detail');
  }

  function handleSubmitReport(issue: Issue) {
    setIssues((prev) => [issue, ...prev]);
    setView('home');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#161b22" />

      <Header
        onLogoClick={() => setView('home')}
        onReport={() => setView('report')}
      />

      {view === 'report' ? (
        <ReportForm
          onSubmit={handleSubmitReport}
          onCancel={() => setView('home')}
        />
      ) : view === 'detail' && selectedIssue ? (
        <IssueDetail
          issue={selectedIssue}
          tracked={trackedIds.has(selectedIssue.id)}
          upvoted={upvotedIds.has(selectedIssue.id)}
          onTrack={handleTrack}
          onUpvote={handleUpvote}
          onBack={() => setView('home')}
        />
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero */}
          <View style={styles.hero}>
            {/* Franja lateral inspirada en la bandera de El Salvador */}
            <View style={styles.heroAccentBar}>
              <View style={[styles.accentPart, { backgroundColor: '#0f47af' }]} />
              <View style={[styles.accentPart, { backgroundColor: '#ffffff' }]} />
              <View style={[styles.accentPart, { backgroundColor: '#0f47af' }]} />
            </View>

            <View style={styles.heroInner}>
              <View style={styles.flagBadgeRow}>
                <View style={styles.miniFlag}>
                  <View style={[styles.miniFlagStripe, { backgroundColor: '#0f47af' }]} />
                  <View style={[styles.miniFlagStripe, { backgroundColor: '#ffffff' }]} />
                  <View style={[styles.miniFlagStripe, { backgroundColor: '#0f47af' }]} />
                </View>
                <Text style={styles.heroTagline}>
                  El Salvador · Plataforma de acción ciudadana
                </Text>
              </View>

              <Text style={styles.heroTitle}>
                Reportá.{'\n'}
                <Text style={{ color: '#4fb3ff' }}>Seguí. </Text>
                <Text style={{ color: '#ffffff' }}>Resolvé.</Text>
              </Text>

              <Text style={styles.heroSubtitle}>
                Reportá problemas locales en El Salvador — baches, cortes de
                energía y tragantes bloqueados — y seguí cada paso hasta su
                solución.
              </Text>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setView('report')}
                style={styles.heroCtaBtn}
              >
                <Text style={styles.heroCtaText}>+ Reportar un problema</Text>
              </TouchableOpacity>
              <Text style={styles.heroHint}>
                Te tomará menos de 2 minutos
              </Text>

              {/* Cuadrícula de estadísticas */}
              <View style={styles.statsGrid}>
                {[
                  {
                    label: 'Reportes totales',
                    value: stats.total,
                    color: '#f0f4f8',
                    border: '#252d3a',
                  },
                  {
                    label: 'Recién reportados',
                    value: stats.reported,
                    color: '#f87171',
                    border: 'rgba(127, 29, 29, 0.5)',
                  },
                  {
                    label: 'En reparación',
                    value: stats.inprogress,
                    color: '#fcd34d',
                    border: 'rgba(146, 64, 14, 0.5)',
                  },
                  {
                    label: 'Resueltos',
                    value: stats.resolved,
                    color: '#34d399',
                    border: 'rgba(6, 78, 59, 0.5)',
                  },
                ].map((stat) => (
                  <View
                    key={stat.label}
                    style={[styles.statCard, { borderColor: stat.border }]}
                  >
                    <Text style={[styles.statValue, { color: stat.color }]}>
                      {stat.value}
                    </Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Contenido principal */}
          <View style={styles.main}>
            {/* Filtros de estado */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScroll}
            >
              {FILTER_OPTIONS.map((f) => {
                const active = filter === f;
                return (
                  <TouchableOpacity
                    key={f}
                    activeOpacity={0.8}
                    onPress={() => setFilter(f)}
                    style={[
                      styles.filterPill,
                      active ? styles.filterPillActive : styles.filterPillDefault,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterPillText,
                        active
                          ? styles.filterPillTextActive
                          : styles.filterPillTextDefault,
                      ]}
                    >
                      {f}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Selector Cuadrícula / Mapa */}
            <View style={styles.viewToggleContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setStreamView('grid')}
                style={[
                  styles.viewToggleBtn,
                  streamView === 'grid' && styles.viewToggleBtnActive,
                ]}
              >
                <GridIcon
                  size={15}
                  color={streamView === 'grid' ? '#ffffff' : '#6b7a93'}
                />
                <Text
                  style={[
                    styles.viewToggleText,
                    streamView === 'grid' && styles.viewToggleTextActive,
                  ]}
                >
                  Cuadrícula
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setStreamView('map')}
                style={[
                  styles.viewToggleBtn,
                  streamView === 'map' && styles.viewToggleBtnActive,
                ]}
              >
                <MapIcon
                  size={15}
                  color={streamView === 'map' ? '#ffffff' : '#6b7a93'}
                />
                <Text
                  style={[
                    styles.viewToggleText,
                    streamView === 'map' && styles.viewToggleTextActive,
                  ]}
                >
                  Mapa
                </Text>
              </TouchableOpacity>
            </View>

            {/* Chips de categorías */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {categories.map((cat) => {
                const active = categoryFilter === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    activeOpacity={0.8}
                    onPress={() => setCategoryFilter(cat)}
                    style={[
                      styles.catChip,
                      active ? styles.catChipActive : styles.catChipDefault,
                    ]}
                  >
                    <Text
                      style={[
                        styles.catChipText,
                        active
                          ? styles.catChipTextActive
                          : styles.catChipTextDefault,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Lista de reportes o Mapa */}
            {streamView === 'map' ? (
              <View style={styles.mapSection}>
                <MiniMap
                  issues={filteredIssues}
                  selectedId={selectedId}
                  onSelect={handleClickIssue}
                />
                <View style={styles.cardsList}>
                  {filteredIssues.map((issue) => (
                    <IssueCard
                      key={issue.id}
                      issue={issue}
                      tracked={trackedIds.has(issue.id)}
                      upvoted={upvotedIds.has(issue.id)}
                      onTrack={handleTrack}
                      onUpvote={handleUpvote}
                      onClick={handleClickIssue}
                    />
                  ))}
                </View>
              </View>
            ) : filteredIssues.length === 0 ? (
              <View style={styles.emptyBox}>
                <SearchIcon size={36} color="#6b7a93" />
                <Text style={styles.emptyTitle}>
                  No se encontraron problemas
                </Text>
                <Text style={styles.emptySubtitle}>
                  Probá otro filtro o reportá un nuevo problema.
                </Text>
              </View>
            ) : (
              <View style={styles.cardsList}>
                {filteredIssues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    tracked={trackedIds.has(issue.id)}
                    upvoted={upvotedIds.has(issue.id)}
                    onTrack={handleTrack}
                    onUpvote={handleUpvote}
                    onClick={handleClickIssue}
                  />
                ))}
              </View>
            )}

            {/* Panel de reportes seguidos y emergencia */}
            <View style={styles.railSection}>
              <TrackedRail
                issues={trackedIssues}
                onUntrack={handleTrack}
                onClick={handleClickIssue}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function Header({
  onLogoClick,
  onReport,
}: {
  onLogoClick: () => void;
  onReport: () => void;
}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onLogoClick}
        style={styles.logoBtn}
      >
        <View style={styles.logoIcon}>
          <View style={[styles.logoStripe, { backgroundColor: '#0f47af' }]} />
          <View style={[styles.logoStripe, { backgroundColor: '#f7fbff' }]} />
          <View style={[styles.logoStripe, { backgroundColor: '#0f47af' }]} />
          {/*<View style={styles.logoTextOverlay}>
            <Text style={styles.logoSvText}>SV</Text>
          </View>*/}
        </View>
        <Text style={styles.brandText}>
          CivicReport<Text style={{ color: '#4fb3ff' }}></Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onReport}
        style={styles.headerReportBtn}
      >
        <Text style={styles.headerReportText}>+ Reportar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0d1117',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    height: 56,
    backgroundColor: '#161b22',
    borderBottomWidth: 1,
    borderBottomColor: '#252d3a',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    position: 'relative',
  },
  logoStripe: {
    flex: 1,
    width: '100%',
  },
  logoTextOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSvText: {
    color: '#0f47af',
    fontWeight: '900',
    fontSize: 9,
  },
  brandText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#f0f4f8',
  },
  headerReportBtn: {
    backgroundColor: '#2f75ff',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
  },
  headerReportText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
  hero: {
    position: 'relative',
    backgroundColor: '#0d1117',
    borderBottomWidth: 1,
    borderBottomColor: '#252d3a',
  },
  heroAccentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  accentPart: {
    flex: 1,
  },
  heroInner: {
    paddingHorizontal: 20,
    paddingVertical: 26,
  },
  flagBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  miniFlag: {
    flexDirection: 'row',
    gap: 3,
  },
  miniFlagStripe: {
    width: 14,
    height: 11,
    borderRadius: 2,
  },
  heroTagline: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6b7a93',
    textTransform: 'uppercase',
    letterSpacing: 1,
    flexShrink: 1,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#f0f4f8',
    lineHeight: 40,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#6b7a93',
    lineHeight: 21,
    marginBottom: 20,
  },
  heroCtaBtn: {
    backgroundColor: '#2f75ff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCtaText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  heroHint: {
    fontSize: 11,
    color: '#52627a',
    textAlign: 'center',
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 24,
  },
  statCard: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: '#161b22',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  statValue: {
    fontSize: 26,
    fontWeight: '900',
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7a93',
    marginTop: 4,
    fontWeight: '500',
  },
  main: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  filterScroll: {
    gap: 6,
    paddingBottom: 12,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterPillDefault: {
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: '#252d3a',
  },
  filterPillActive: {
    backgroundColor: '#2f75ff',
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  filterPillTextDefault: {
    color: '#6b7a93',
  },
  filterPillTextActive: {
    color: '#ffffff',
  },
  viewToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: '#252d3a',
    borderRadius: 10,
    padding: 3,
    marginBottom: 12,
  },
  viewToggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 7,
  },
  viewToggleBtnActive: {
    backgroundColor: '#2f75ff',
  },
  viewToggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7a93',
  },
  viewToggleTextActive: {
    color: '#ffffff',
  },
  categoryScroll: {
    gap: 6,
    paddingBottom: 16,
  },
  catChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  catChipDefault: {
    backgroundColor: '#161b22',
    borderColor: '#252d3a',
  },
  catChipActive: {
    backgroundColor: 'rgba(47, 117, 255, 0.2)',
    borderColor: 'rgba(47, 117, 255, 0.5)',
  },
  catChipText: {
    fontSize: 11,
    fontWeight: '700',
  },
  catChipTextDefault: {
    color: '#6b7a93',
  },
  catChipTextActive: {
    color: '#72a4ff',
  },
  mapSection: {
    gap: 16,
  },
  cardsList: {
    marginTop: 4,
  },
  emptyBox: {
    paddingVertical: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#a0aec0',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#6b7a93',
    marginTop: 4,
    textAlign: 'center',
  },
  railSection: {
    marginTop: 16,
  },
});
