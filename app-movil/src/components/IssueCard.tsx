import React from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Issue } from '../data/issues';
import { CATEGORY_LABELS } from '../data/issues';
import StatusBadge from './StatusBadge';
import StatusTracker from './StatusTracker';
import { CategoryIcon, PinIcon } from './Icons';

interface Props {
  issue: Issue;
  tracked: boolean;
  upvoted: boolean;
  onTrack: (id: string) => void;
  onUpvote: (id: string) => void;
  onClick: (id: string) => void;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Hoy';
  if (days === 1) return 'Hace 1 día';
  if (days < 30) return `Hace ${days} días`;
  const months = Math.floor(days / 30);
  return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
}

const URGENCY_COLOR: Record<string, string> = {
  reported: '#ef4444',
  inprogress: '#facc15',
  resolved: '#22c55e',
};

export default function IssueCard({
  issue,
  tracked,
  upvoted,
  onTrack,
  onUpvote,
  onClick,
}: Props) {
  return (
    <Pressable
      onPress={() => onClick(issue.id)}
      android_ripple={{ color: 'rgba(47, 117, 255, 0.12)' }}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      {/* Barra superior de estado */}
      <View
        style={[
          styles.urgencyBar,
          { backgroundColor: URGENCY_COLOR[issue.status] || '#ef4444' },
        ]}
      />

      {issue.photoUrl && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: issue.photoUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={styles.body}>
        <View style={styles.headerRow}>
          <View style={styles.categoryRow}>
            <CategoryIcon category={issue.category} size={16} color="#72a4ff" />
            <Text style={styles.categoryLabel}>
              {CATEGORY_LABELS[issue.category]}
            </Text>
          </View>
          <StatusBadge status={issue.status} size="sm" />
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {issue.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {issue.description}
        </Text>

        <View style={styles.trackerContainer}>
          <StatusTracker status={issue.status} compact />
        </View>

        <View style={styles.metaRow}>
          <PinIcon size={14} color="#72a4ff" />
          <Text style={styles.neighborhood}>{issue.neighborhood}</Text>
          <Text style={styles.metaText}>·</Text>
          <Text style={styles.metaText}>{issue.city}</Text>
          <Text style={styles.metaText}>·</Text>
          <Text style={styles.metaText}>{timeAgo(issue.reportedAt)}</Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => onUpvote(issue.id)}
            style={[
              styles.actionBtn,
              upvoted ? styles.upvoteBtnActive : styles.actionBtnDefault,
            ]}
          >
            <Text
              style={[
                styles.actionBtnText,
                upvoted ? styles.upvoteTextActive : styles.actionBtnTextDefault,
              ]}
            >
              Apoyar {issue.upvotes + (upvoted ? 1 : 0)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => onTrack(issue.id)}
            style={[
              styles.actionBtn,
              styles.trackBtnMargin,
              tracked ? styles.trackBtnActive : styles.actionBtnDefault,
            ]}
          >
            <Text
              style={[
                styles.actionBtnText,
                tracked ? styles.trackTextActive : styles.actionBtnTextDefault,
              ]}
            >
              {tracked ? 'Siguiendo' : 'Seguir'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#252d3a',
    overflow: 'hidden',
    marginBottom: 12,
  },
  cardPressed: {
    borderColor: 'rgba(47, 117, 255, 0.5)',
  },
  urgencyBar: {
    height: 4,
    width: '100%',
  },
  imageContainer: {
    height: 165,
    backgroundColor: '#1a2030',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  body: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6b7a93',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#f0f4f8',
    lineHeight: 20,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#6b7a93',
    lineHeight: 18,
    marginBottom: 12,
  },
  trackerContainer: {
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 5,
  },
  neighborhood: {
    fontSize: 11,
    fontWeight: '600',
    color: '#a0aec0',
  },
  metaText: {
    fontSize: 11,
    color: '#6b7a93',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#252d3a',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionBtnDefault: {
    borderColor: '#252d3a',
    backgroundColor: 'transparent',
  },
  upvoteBtnActive: {
    backgroundColor: 'rgba(47, 117, 255, 0.2)',
    borderColor: 'rgba(47, 117, 255, 0.5)',
  },
  trackBtnMargin: {
    marginLeft: 'auto',
  },
  trackBtnActive: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderColor: 'rgba(22, 163, 74, 0.4)',
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  actionBtnTextDefault: {
    color: '#6b7a93',
  },
  upvoteTextActive: {
    color: '#72a4ff',
  },
  trackTextActive: {
    color: '#4ade80',
  },
});
