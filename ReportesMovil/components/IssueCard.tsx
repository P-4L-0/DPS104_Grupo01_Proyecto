import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function IssueCard() {
  return (
    <View style={styles.card}>
      {/* Barra de urgencia según estado */}
      <View style={[styles.urgencyBar, styles.urgencyBarReported]} />

      {/* Contenedor de imagen */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: 'https://placehold.co/600x400/1a2030/72a4ff.png?text=Reporte' }}
          accessibilityLabel="Ejemplo de reporte ciudadano"
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.body}>
        {/* Fila superior: Categoría y Badge */}
        <View style={styles.topMeta}>
          <View style={styles.category}>
            <Text style={styles.categoryIcon}>●</Text>
            <Text style={styles.categoryLabel}>Infraestructura vial</Text>
          </View>

          <View style={[styles.badge, styles.badgeReported]}>
            <Text style={styles.badgeReportedText}>Reportado</Text>
          </View>
        </View>

        {/* Título y Descripción */}
        <Text style={styles.title} numberOfLines={2}>
          Bache profundo en carril principal
        </Text>

        <Text style={styles.description} numberOfLines={3}>
          Se ha formado un bache amplio que afecta el tráfico vehicular y representa riesgo para motociclistas durante la lluvia.
        </Text>

        {/* Barra de progreso / Tracker */}
        <View style={styles.trackerWrapper}>
          <View style={styles.trackerBar}>
            <View style={[styles.trackerStep, styles.trackerStepActive]} />
            <View style={styles.trackerStep} />
            <View style={styles.trackerStep} />
          </View>
        </View>

        {/* Fila de ubicación */}
        <View style={styles.locationRow}>
          <Text style={styles.pinIcon}>⌖</Text>
          <Text style={styles.neighborhood}>Colonia Escalón</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.locationText}>San Salvador</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.locationText}>Hace 2 días</Text>
        </View>

        {/* Botones de acción */}
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.actionBtn,
              pressed && { opacity: 0.75 },
            ]}
            onPress={() => console.log('Apoyar reporte')}
          >
            <Text style={styles.actionBtnText}>Apoyar 14</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionBtn,
              styles.actionBtnTrack,
              pressed && { opacity: 0.75 },
            ]}
            onPress={() => console.log('Seguir reporte')}
          >
            <Text style={[styles.actionBtnText, styles.actionBtnTrackText]}>
              Seguir
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#252d3a',
    overflow: 'hidden', // Recorta la imagen y la barra superior según el borderRadius
    marginBottom: 16,
  },
  urgencyBar: {
    height: 4,
    width: '100%',
  },
  urgencyBarReported: {
    backgroundColor: '#f59e0b',
  },
  imageWrapper: {
    width: '100%',
    height: 180,
    backgroundColor: '#1a2030',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  body: {
    padding: 16,
    gap: 10,
  },
  topMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryIcon: {
    fontSize: 8,
    color: '#4fb3ff',
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8b9bb4',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999, // Equivalente a border-radius: 9999px (pill)
  },
  badgeReported: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  badgeReportedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fbbf24',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f0f4f8',
    lineHeight: 22,
  },
  description: {
    fontSize: 13,
    color: '#8b9bb4',
    lineHeight: 19,
  },
  trackerWrapper: {
    marginVertical: 4,
  },
  trackerBar: {
    flexDirection: 'row',
    gap: 6,
  },
  trackerStep: {
    flex: 1, // Cada paso ocupa exactamente 1/3 del ancho disponible
    height: 4,
    borderRadius: 2,
    backgroundColor: '#252d3a',
  },
  trackerStepActive: {
    backgroundColor: '#f59e0b',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap', // Evita que el texto se corte si la pantalla es muy angosta
    gap: 6,
    marginTop: 2,
  },
  pinIcon: {
    fontSize: 13,
    color: '#4fb3ff',
  },
  neighborhood: {
    fontSize: 12,
    fontWeight: '600',
    color: '#c9d1d9',
  },
  dot: {
    fontSize: 12,
    color: '#52627a',
  },
  locationText: {
    fontSize: 12,
    color: '#52627a',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  actionBtn: {
    flex: 1, // Ambos botones comparten el ancho en partes iguales
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#1f2633',
    borderWidth: 1,
    borderColor: '#2d3748',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f0f4f8',
  },
  actionBtnTrack: {
    backgroundColor: 'rgba(79, 179, 255, 0.12)',
    borderColor: 'rgba(79, 179, 255, 0.35)',
  },
  actionBtnTrackText: {
    color: '#4fb3ff',
  },
});
