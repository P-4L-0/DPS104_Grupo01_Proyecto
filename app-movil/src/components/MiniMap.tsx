import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G, Line, Rect, Text as SvgText } from 'react-native-svg';
import type { Issue } from '../data/issues';

interface Props {
  issues: Issue[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function project(lat: number, lng: number, allIssues: Issue[]) {
  const lats = allIssues.map((i) => i.lat);
  const lngs = allIssues.map((i) => i.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const pad = 50;
  const w = 700;
  const h = 300;
  const x = pad + ((lng - minLng) / (maxLng - minLng || 1)) * (w - pad * 2);
  const y = pad + (1 - (lat - minLat) / (maxLat - minLat || 1)) * (h - pad * 2);
  return { x, y };
}

const PIN_COLOR: Record<string, string> = {
  reported: '#e8321c',
  inprogress: '#f5c518',
  resolved: '#00a86b',
};

export default function MiniMap({ issues, selectedId, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Svg
        style={StyleSheet.absoluteFill}
        viewBox="0 0 700 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <Rect width="700" height="300" fill="#0d1117" />

        {/* Cuadrícula */}
        {Array.from({ length: 10 }).map((_, i) => (
          <Line
            key={`h${i}`}
            x1="0"
            y1={i * 30}
            x2="700"
            y2={i * 30}
            stroke="#1a2030"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 24 }).map((_, i) => (
          <Line
            key={`v${i}`}
            x1={i * 30}
            y1="0"
            x2={i * 30}
            y2="300"
            stroke="#1a2030"
            strokeWidth="1"
          />
        ))}

        {/* Vías principales */}
        <Line x1="0" y1="110" x2="700" y2="110" stroke="#1e2a38" strokeWidth="4" />
        <Line x1="0" y1="200" x2="700" y2="200" stroke="#1e2a38" strokeWidth="4" />
        <Line x1="180" y1="0" x2="180" y2="300" stroke="#1e2a38" strokeWidth="4" />
        <Line x1="520" y1="0" x2="520" y2="300" stroke="#1e2a38" strokeWidth="4" />

        {/* Etiquetas de ciudades */}
        <SvgText x="70" y="280" fontSize="10" fill="#3a4a5a" fontWeight="600">
          SANTA ANA
        </SvgText>
        <SvgText x="300" y="280" fontSize="10" fill="#3a4a5a" fontWeight="600">
          SAN SALVADOR
        </SvgText>
        <SvgText x="560" y="140" fontSize="10" fill="#3a4a5a" fontWeight="600">
          SAN MIGUEL
        </SvgText>

        {/* Franja bandera El Salvador */}
        <Rect x="0" y="0" width="4" height="300" fill="#0f47af" />
        <Rect x="4" y="0" width="3" height="300" fill="#f7fbff" />
        <Rect x="7" y="0" width="4" height="300" fill="#0f47af" />

        {/* Marcadores */}
        {issues.map((issue) => {
          const { x, y } = project(issue.lat, issue.lng, issues);
          const sel = issue.id === selectedId;
          const color = PIN_COLOR[issue.status];
          return (
            <G key={issue.id} onPress={() => onSelect(issue.id)}>
              {sel && <Circle cx={x} cy={y} r="20" fill={color} opacity="0.15" />}
              <Circle
                cx={x}
                cy={y}
                r={sel ? 13 : 9}
                fill={color}
                stroke={sel ? '#ffffff' : '#0d1117'}
                strokeWidth={sel ? 2.5 : 1.5}
              />
              <SvgText
                x={x}
                y={y + 4}
                fontSize={sel ? '10' : '8'}
                textAnchor="middle"
                fill={issue.status === 'inprogress' ? '#000000' : '#ffffff'}
                fontWeight="bold"
              >
                {issue.status === 'reported'
                  ? '!'
                  : issue.status === 'inprogress'
                  ? '↺'
                  : '✓'}
              </SvgText>
            </G>
          );
        })}
      </Svg>

      {/* Leyenda */}
      <View style={styles.legend}>
        {[
          { color: '#e8321c', label: 'Reportado' },
          { color: '#f5c518', label: 'En reparación' },
          { color: '#00a86b', label: 'Resuelto' },
        ].map(({ color, label }) => (
          <View key={label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: color }]} />
            <Text style={styles.legendText}>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: 280,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#252d3a',
    backgroundColor: '#0d1117',
  },
  legend: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: 'rgba(13, 17, 23, 0.92)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#252d3a',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: '#a0aec0',
    fontSize: 11,
    fontWeight: '500',
  },
});
