import React from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

export function Header() {
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 768; // Reemplaza las Media Queries de CSS

  return (
    <View style={styles.siteHeader}>
      <View style={styles.siteHeaderInner}>
        {/* Botón de Marca */}
        <Pressable
          style={({ pressed }) => [
            styles.brandBtn,
            pressed && { opacity: 0.8 }, // Reemplaza :hover / :active
          ]}
          onPress={() => console.log('Ir al inicio')}
        >
          {/* Badge con la bandera de SV */}
          <View style={styles.brandBadge}>
            <View style={styles.flagStripeBlue} />
            <View style={styles.flagStripeWhite}>
              <Text style={styles.brandBadgeText}>SV</Text>
            </View>
            <View style={styles.flagStripeBlue} />
          </View>

          <Text style={styles.brandName}>
            CivicReport<Text style={styles.brandNameAccent}>.sv</Text>
          </Text>
        </Pressable>

        {/* Acciones a la derecha */}
        <View style={styles.siteHeaderActions}>
          {isWideScreen && (
            <Text style={styles.siteHeaderTagline}>
              Por la gente. Para la comunidad.
            </Text>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.btnPrimary,
              styles.headerCta,
              pressed && { opacity: 0.85 },
            ]}
            onPress={() => console.log('Abrir formulario de reporte')}
          >
            <Text style={styles.headerCtaText}>
              {isWideScreen ? '+ Reportar problema' : '+ Reportar'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  siteHeader: {
    backgroundColor: 'rgba(22, 27, 34, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#252d3a',
    zIndex: 50,
  },
  siteHeaderInner: {
    width: '100%',
    maxWidth: 1024, // 64rem * 16
    alignSelf: 'center', // Reemplaza margin-left: auto y margin-right: auto
    paddingHorizontal: 16, // 1rem
    height: 56, // 3.5rem
    flexDirection: 'row', // Obligatorio para alinear horizontalmente
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12, // 0.75rem
  },
  brandBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // 0.625rem
    backgroundColor: 'transparent',
    padding: 0,
  },
  brandBadge: {
    width: 32, // 2rem
    height: 32, // 2rem
    borderRadius: 8, // 0.5rem
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  flagStripeBlue: {
    flex: 1,
    backgroundColor: '#0f47af',
  },
  flagStripeWhite: {
    flex: 1,
    backgroundColor: '#f7fbff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandBadgeText: {
    color: '#0f47af',
    fontWeight: '900', // En RN los fontWeight van como string
    fontSize: 9,
  },
  brandName: {
    fontSize: 14, // 0.875rem
    fontWeight: '800',
    color: '#f0f4f8',
  },
  brandNameAccent: {
    color: '#4fb3ff',
  },
  siteHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // 0.75rem
  },
  siteHeaderTagline: {
    fontSize: 12, // 0.75rem
    color: '#52627a',
  },
  btnPrimary: {
    backgroundColor: '#0f47af', // Color base añadido para el botón principal
  },
  headerCta: {
    paddingVertical: 10, // 0.625rem
    paddingHorizontal: 12, // 0.75rem
    borderRadius: 8, // 0.5rem
  },
  headerCtaText: {
    fontSize: 12, // 0.75rem
    fontWeight: '700',
    color: '#ffffff',
  },
});
