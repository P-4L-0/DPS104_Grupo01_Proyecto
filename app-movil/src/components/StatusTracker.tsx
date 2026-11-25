import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { IssueStatus } from '../data/issues';

const STEPS: { key: IssueStatus; label: string }[] = [
  { key: 'reported', label: 'Reportado' },
  { key: 'inprogress', label: 'En reparación' },
  { key: 'resolved', label: 'Resuelto' },
];

const STATUS_ORDER: Record<IssueStatus, number> = {
  reported: 0,
  inprogress: 1,
  resolved: 2,
};

interface Props {
  status: IssueStatus;
  compact?: boolean;
}

export default function StatusTracker({ status, compact }: Props) {
  const current = STATUS_ORDER[status];

  if (compact) {
    return (
      <View style={styles.compactRow}>
        {STEPS.map((step, i) => {
          const done = i <= current;
          const active = i === current;

          const circleBg = active
            ? '#facc15'
            : done
            ? '#16a34a'
            : '#252d3a';
          const textColor = active
            ? '#000000'
            : done
            ? '#ffffff'
            : '#6b7a93';

          return (
            <View key={step.key} style={styles.compactStep}>
              <View style={[styles.compactCircle, { backgroundColor: circleBg }]}>
                <Text style={[styles.compactText, { color: textColor }]}>
                  {done && !active ? '✓' : i + 1}
                </Text>
              </View>
              {i < STEPS.length - 1 && (
                <View
                  style={[
                    styles.compactLine,
                    { backgroundColor: i < current ? '#16a34a' : '#252d3a' },
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.fullRow}>
      {STEPS.map((step, i) => {
        const done = i <= current;
        const active = i === current;
        const isLast = i === STEPS.length - 1;

        const circleBg = active ? '#facc15' : done ? '#16a34a' : '#252d3a';
        const textColor = active ? '#000000' : done ? '#ffffff' : '#6b7a93';
        const labelColor = active ? '#facc15' : done ? '#4ade80' : '#6b7a93';

        return (
          <View key={step.key} style={styles.fullStepWrapper}>
            <View style={styles.fullStepInner}>
              <View style={styles.circleLineRow}>
                <View
                  style={[
                    styles.fullCircle,
                    { backgroundColor: circleBg },
                    !done && !active && styles.inactiveCircleBorder,
                    active && styles.activeCircleRing,
                  ]}
                >
                  <Text style={[styles.fullCircleText, { color: textColor }]}>
                    {done && !active ? '✓' : i + 1}
                  </Text>
                </View>
                {!isLast && (
                  <View
                    style={[
                      styles.fullLine,
                      { backgroundColor: i < current ? '#16a34a' : '#252d3a' },
                    ]}
                  />
                )}
              </View>
              <View style={styles.labelWrapper}>
                <Text style={[styles.stepLabel, { color: labelColor }]}>
                  {step.label}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  compactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compactStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compactCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactText: {
    fontSize: 9,
    fontWeight: '700',
  },
  compactLine: {
    height: 1,
    width: 16,
  },
  fullRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  fullStepWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  fullStepInner: {
    flex: 1,
    alignItems: 'center',
  },
  circleLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  fullCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  inactiveCircleBorder: {
    borderWidth: 1,
    borderColor: '#333333',
  },
  activeCircleRing: {
    borderWidth: 3,
    borderColor: 'rgba(250, 204, 21, 0.35)',
  },
  fullCircleText: {
    fontSize: 14,
    fontWeight: '700',
  },
  fullLine: {
    height: 2,
    flex: 1,
    marginHorizontal: 4,
  },
  labelWrapper: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
