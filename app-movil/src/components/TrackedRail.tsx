import React from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { Issue } from '../data/issues';
import StatusBadge from './StatusBadge';
import StatusTracker from './StatusTracker';
import { CategoryIcon } from './Icons';

interface Props {
  issues: Issue[];
  onUntrack: (id: string) => void;
  onClick: (id: string) => void;
}

export default function TrackedRail({ issues, onUntrack, onClick }: Props) {
  const handleCall = (phoneNumber: string) => {
    const cleanNum = phoneNumber.replace(/-/g, '');
    Linking.openURL(`tel:${cleanNum}`);
  };

  return (
    <View style={styles.wrapper}>
      {/* Tarjeta de reportes seguidos */}
      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Mis reportes seguidos</Text>
            <Text style={styles.headerSubtitle}>
              {issues.length}{' '}
              {issues.length === 1 ? 'reporte seguido' : 'reportes seguidos'}
            </Text>
          </View>
          <View style={styles.badgeCounter}>
            <Text style={styles.badgeCounterText}>{issues.length}</Text>
          </View>
        </View>

        {issues.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No seguís ningún reporte</Text>
            <Text style={styles.emptySubtitle}>
              Seleccioná “Seguir” en cualquier reporte para verlo aquí.
            </Text>
          </View>
        ) : (
          <ScrollView style={styles.listContainer} nestedScrollEnabled>
            {issues.map((issue, idx) => (
              <Pressable
                key={issue.id}
                onPress={() => onClick(issue.id)}
                android_ripple={{ color: 'rgba(47, 117, 255, 0.12)' }}
                style={[
                  styles.itemRow,
                  idx < issues.length - 1 && styles.itemDivider,
                ]}
              >
                <View style={styles.itemTop}>
                  <View style={styles.itemTitleGroup}>
                    <CategoryIcon
                      category={issue.category}
                      size={16}
                      color="#72a4ff"
                    />
                    <Text style={styles.itemTitle} numberOfLines={2}>
                      {issue.title}
                    </Text>
                  </View>
                  <TouchableOpacity
                    hitSlop={8}
                    onPress={() => onUntrack(issue.id)}
                  >
                    <Text style={styles.untrackIcon}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.itemMeta}>
                  <StatusBadge status={issue.status} size="sm" />
                  <Text style={styles.itemCity}>{issue.city}</Text>
                </View>

                <StatusTracker status={issue.status} compact />
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  card: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#252d3a',
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#252d3a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f0f4f8',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#6b7a93',
    marginTop: 2,
  },
  badgeCounter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(47, 117, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(47, 117, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCounterText: {
    color: '#72a4ff',
    fontSize: 12,
    fontWeight: '800',
  },
  emptyState: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7a93',
  },
  emptySubtitle: {
    fontSize: 11,
    color: '#3a4a5a',
    marginTop: 4,
    textAlign: 'center',
    lineHeight: 16,
  },
  listContainer: {
    maxHeight: 340,
  },
  itemRow: {
    padding: 12,
  },
  itemDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#252d3a',
  },
  itemTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 8,
  },
  itemTitleGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    flex: 1,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f0f4f8',
    lineHeight: 17,
    flex: 1,
  },
  untrackIcon: {
    fontSize: 12,
    color: '#3a4a5a',
    paddingHorizontal: 4,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemCity: {
    fontSize: 10,
    color: '#6b7a93',
  },
  emergencyCard: {
    marginTop: 12,
    backgroundColor: '#161b22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#252d3a',
    padding: 12,
  },
  emergencyHeading: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6b7a93',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  emergencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  emergencyLabel: {
    fontSize: 12,
    color: '#6b7a93',
  },
  emergencyNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#72a4ff',
  },
});
