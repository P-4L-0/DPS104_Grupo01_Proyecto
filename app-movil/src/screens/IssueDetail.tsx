import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { Issue } from '../data/issues';
import { CATEGORY_LABELS, STATUS_LABELS } from '../data/issues';
import StatusBadge from '../components/StatusBadge';
import StatusTracker from '../components/StatusTracker';
import { CategoryIcon, PinIcon } from '../components/Icons';


interface Props {
  issue: Issue;
  tracked: boolean;
  upvoted: boolean;
  onTrack: (id: string) => void;
  onUpvote: (id: string) => void;
  onBack: () => void;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-SV', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const TIMELINE_DOT: Record<string, string> = {
  reported: '#ef4444',
  inprogress: '#facc15',
  resolved: '#22c55e',
};

export default function IssueDetail({
  issue,
  tracked,
  upvoted,
  onTrack,
  onUpvote,
  onBack,
}: Props) {
  const statusBarColor =
    issue.status === 'reported'
      ? '#ef4444'
      : issue.status === 'inprogress'
      ? '#facc15'
      : '#22c55e';

  const metaItems = [
    { label: 'Reportado por', value: issue.reportedBy },
    { label: 'Ciudad', value: issue.city },
    { label: 'Fecha del reporte', value: formatDate(issue.reportedAt) },
    { label: 'Apoyos de la comunidad', value: String(issue.upvotes) },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.7}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Volver a los reportes</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={[styles.statusBar, { backgroundColor: statusBarColor }]} />

        {issue.photoUrl && (
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: issue.photoUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}

        <View style={styles.body}>
          <View style={styles.topHeader}>
            <View style={styles.titleBlock}>
              <View style={styles.categoryRow}>
                <CategoryIcon category={issue.category} size={20} color="#72a4ff" />
                <Text style={styles.categoryText}>
                  {CATEGORY_LABELS[issue.category]}
                </Text>
              </View>
              <Text style={styles.title}>{issue.title}</Text>
              <View style={styles.addressRow}>
                <PinIcon size={14} color="#72a4ff" />
                <Text style={styles.addressText}>
                  {issue.address}, {issue.neighborhood} · {issue.city}
                </Text>
              </View>
            </View>
            <StatusBadge status={issue.status} />
          </View>

          <Text style={styles.description}>{issue.description}</Text>

          {/* Rastreador de estado */}
          <View style={styles.trackerBox}>
            <Text style={styles.sectionCaps}>Progreso del reporte</Text>
            <StatusTracker status={issue.status} />
          </View>

          {/* Cuadrícula de metadatos */}
          <View style={styles.metaGrid}>
            {metaItems.map(({ label, value }) => (
              <View key={label} style={styles.metaCard}>
                <Text style={styles.metaLabel}>{label}</Text>
                <Text style={styles.metaValue}>{value}</Text>
              </View>
            ))}
          </View>

          {/* Botones de acción */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onUpvote(issue.id)}
              style={[
                styles.actionBtn,
                upvoted ? styles.upvoteActive : styles.actionDefault,
              ]}
            >
              <Text
                style={[
                  styles.actionText,
                  upvoted ? styles.actionTextWhite : styles.actionTextMuted,
                ]}
              >
                Apoyar · {issue.upvotes + (upvoted ? 1 : 0)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onTrack(issue.id)}
              style={[
                styles.actionBtn,
                tracked ? styles.trackActive : styles.actionDefault,
              ]}
            >
              <Text
                style={[
                  styles.actionText,
                  tracked ? styles.actionTextWhite : styles.actionTextMuted,
                ]}
              >
                {tracked ? 'Siguiendo' : 'Seguir reporte'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Historial de actividad */}
          <View>
            <Text style={[styles.sectionCaps, { marginBottom: 12 }]}>
              Historial de actividad
            </Text>
            {issue.statusHistory.map((entry, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={styles.timelineTrack}>
                  <View
                    style={[
                      styles.timelineDot,
                      { backgroundColor: TIMELINE_DOT[entry.status] || '#ef4444' },
                    ]}
                  />
                  {i < issue.statusHistory.length - 1 && (
                    <View style={styles.timelineLine} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>
                    {STATUS_LABELS[entry.status]}
                  </Text>
                  <Text style={styles.timelineNote}>{entry.note}</Text>
                  <Text style={styles.timelineDate}>
                    {formatDate(entry.date)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  backButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 14,
    color: '#6b7a93',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#252d3a',
    overflow: 'hidden',
  },
  statusBar: {
    height: 6,
    width: '100%',
  },
  imageWrapper: {
    height: 210,
    backgroundColor: '#1a2030',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  body: {
    padding: 16,
  },
  topHeader: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
  },
  titleBlock: {
    flex: 1,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6b7a93',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#f0f4f8',
    lineHeight: 26,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 6,
  },
  addressText: {
    fontSize: 12,
    color: '#6b7a93',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#a0aec0',
    lineHeight: 22,
    marginBottom: 20,
  },
  trackerBox: {
    backgroundColor: '#0d1117',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#252d3a',
  },
  sectionCaps: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6b7a93',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 14,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  metaCard: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: '#0d1117',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#252d3a',
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6b7a93',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f0f4f8',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionDefault: {
    borderWidth: 1,
    borderColor: '#252d3a',
  },
  upvoteActive: {
    backgroundColor: '#2f75ff',
  },
  trackActive: {
    backgroundColor: '#16a34a',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
  },
  actionTextWhite: {
    color: '#ffffff',
  },
  actionTextMuted: {
    color: '#a0aec0',
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineTrack: {
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 2,
  },
  timelineLine: {
    width: 1,
    flex: 1,
    backgroundColor: '#252d3a',
    marginVertical: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 16,
  },
  timelineTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#f0f4f8',
  },
  timelineNote: {
    fontSize: 12,
    color: '#6b7a93',
    marginTop: 2,
    lineHeight: 18,
  },
  timelineDate: {
    fontSize: 10,
    color: '#3a4a5a',
    marginTop: 4,
  },
});
