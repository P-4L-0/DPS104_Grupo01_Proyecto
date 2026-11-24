import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { IssueStatus } from '../data/issues';
import { STATUS_LABELS } from '../data/issues';

interface Props {
  status: IssueStatus;
  size?: 'sm' | 'md';
}

const STATUS_COLORS: Record<
  IssueStatus,
  { bg: string; border: string; text: string; dot: string }
> = {
  reported: {
    bg: 'rgba(69, 10, 10, 0.6)',
    border: 'rgba(153, 27, 27, 0.6)',
    text: '#f87171',
    dot: '#ef4444',
  },
  inprogress: {
    bg: 'rgba(66, 32, 6, 0.6)',
    border: 'rgba(161, 98, 7, 0.6)',
    text: '#facc15',
    dot: '#facc15',
  },
  resolved: {
    bg: 'rgba(5, 46, 22, 0.6)',
    border: 'rgba(22, 101, 52, 0.6)',
    text: '#4ade80',
    dot: '#22c55e',
  },
};

export default function StatusBadge({ status, size = 'md' }: Props) {
  const palette = STATUS_COLORS[status];
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        isSmall ? styles.badgeSm : styles.badgeMd,
        { backgroundColor: palette.bg, borderColor: palette.border },
      ]}
    >
      <View
        style={[
          styles.dot,
          isSmall ? styles.dotSm : styles.dotMd,
          { backgroundColor: palette.dot },
        ]}
      />
      <Text
        style={[
          styles.label,
          isSmall ? styles.labelSm : styles.labelMd,
          { color: palette.text },
        ]}
      >
        {STATUS_LABELS[status]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    gap: 6,
  },
  badgeSm: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeMd: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  dot: {
    borderRadius: 999,
  },
  dotSm: {
    width: 6,
    height: 6,
  },
  dotMd: {
    width: 8,
    height: 8,
  },
  label: {
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  labelSm: {
    fontSize: 10,
  },
  labelMd: {
    fontSize: 12,
  },
});
