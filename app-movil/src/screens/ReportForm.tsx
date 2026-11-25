import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type { Issue, IssueCategory } from '../data/issues';
import { CATEGORY_LABELS } from '../data/issues';
import { CategoryIcon } from '../components/Icons';

interface Props {
  onSubmit: (issue: Issue) => void;
  onCancel: () => void;
}

const CATEGORIES: IssueCategory[] = [
  'pothole',
  'streetlight',
  'graffiti',
  'sidewalk',
  'drainage',
  'signage',
  'parks',
  'water',
  'electricity',
  'other',
];

const SV_CITIES = [
  'San Salvador',
  'Santa Ana',
  'San Miguel',
  'Santa Tecla',
  'Soyapango',
  'Mejicanos',
  'Sonsonate',
  'La Libertad',
  'Ahuachapán',
  'Otro',
];

const PHOTO_URLS = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=440&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=700&h=440&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=700&h=440&fit=crop&auto=format',
];

export default function ReportForm({ onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IssueCategory>('pothole');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('San Salvador');
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = 'El título es obligatorio';
    if (!description.trim()) e.description = 'La descripción es obligatoria';
    if (!address.trim()) e.address = 'La dirección es obligatoria';
    if (!neighborhood.trim()) e.neighborhood = 'La colonia o el distrito es obligatorio';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    const now = new Date().toISOString();
    const cityCoords: Record<string, [number, number]> = {
      'San Salvador': [13.6929, -89.2182],
      'Santa Ana': [13.9942, -89.5597],
      'San Miguel': [13.4833, -88.1833],
      'Santa Tecla': [13.6769, -89.2797],
      Soyapango: [13.7102, -89.1372],
      Mejicanos: [13.7403, -89.2131],
      Sonsonate: [13.7189, -89.7242],
      'La Libertad': [13.4883, -89.3222],
      Ahuachapán: [13.9214, -89.845],
    };
    const [baseLat, baseLng] = cityCoords[city] || [13.6929, -89.2182];

    const issue: Issue = {
      id: `user-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      status: 'reported',
      address: address.trim(),
      neighborhood: neighborhood.trim(),
      city,
      lat: baseLat + (Math.random() - 0.5) * 0.02,
      lng: baseLng + (Math.random() - 0.5) * 0.02,
      reportedBy: 'Vos',
      reportedAt: now,
      updatedAt: now,
      upvotes: 0,
      photoUrl: hasPhoto
        ? PHOTO_URLS[Math.floor(Math.random() * PHOTO_URLS.length)]
        : undefined,
      statusHistory: [
        { status: 'reported', date: now, note: 'Reporte enviado por un residente.' },
      ],
    };
    onSubmit(issue);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity onPress={onCancel} style={styles.backBtn}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        {/* Barra superior bandera de El Salvador */}
        <View style={styles.flagBar}>
          <View style={[styles.flagSegment, { backgroundColor: '#0f47af' }]} />
          <View style={[styles.flagSegment, { backgroundColor: '#ffffff' }]} />
          <View style={[styles.flagSegment, { backgroundColor: '#0f47af' }]} />
        </View>

        <View style={styles.body}>
          <Text style={styles.heading}>Reportar un problema comunitario</Text>
          <Text style={styles.subtitle}>
            Tu reporte impulsa acciones municipales reales. Sé específico.
          </Text>

          {/* Categoría */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Categoría</Text>
            <View style={styles.categoryGrid}>
              {CATEGORIES.map((cat) => {
                const selected = category === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    activeOpacity={0.75}
                    onPress={() => setCategory(cat)}
                    style={[
                      styles.categoryItem,
                      selected ? styles.categoryItemActive : styles.categoryItemDefault,
                    ]}
                  >
                    <CategoryIcon
                      category={cat}
                      size={20}
                      color={selected ? '#72a4ff' : '#6b7a93'}
                    />
                    <Text
                      style={[
                        styles.categoryItemText,
                        selected && { color: '#72a4ff' },
                      ]}
                      numberOfLines={2}
                    >
                      {CATEGORY_LABELS[cat]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Título */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>
              Título del problema <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Descripción breve del problema..."
              placeholderTextColor="#3a4a5a"
              style={[styles.input, errors.title && styles.inputError]}
            />
            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
          </View>

          {/* Descripción */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>
              Descripción <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Tamaño, gravedad, cuánto tiempo lleva ahí, riesgos de seguridad..."
              placeholderTextColor="#3a4a5a"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              style={[
                styles.input,
                styles.textArea,
                errors.description && styles.inputError,
              ]}
            />
            {errors.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}
          </View>

          {/* Selector de ciudad */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Ciudad</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setCityModalVisible(true)}
              style={styles.selectButton}
            >
              <Text style={styles.selectText}>{city}</Text>
              <Text style={styles.selectArrow}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Dirección */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>
              Dirección <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Calle, avenida o punto de referencia"
              placeholderTextColor="#3a4a5a"
              style={[styles.input, errors.address && styles.inputError]}
            />
            {errors.address && (
              <Text style={styles.errorText}>{errors.address}</Text>
            )}
          </View>

          {/* Colonia / Distrito */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>
              Colonia / Distrito <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              value={neighborhood}
              onChangeText={setNeighborhood}
              placeholder="Colonia Escalón, Centro..."
              placeholderTextColor="#3a4a5a"
              style={[styles.input, errors.neighborhood && styles.inputError]}
            />
            {errors.neighborhood && (
              <Text style={styles.errorText}>{errors.neighborhood}</Text>
            )}
          </View>

          {/* Foto */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Foto</Text>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => setHasPhoto(!hasPhoto)}
              style={[
                styles.photoBtn,
                hasPhoto ? styles.photoBtnActive : styles.photoBtnDefault,
              ]}
            >
              <Text
                style={[
                  styles.photoBtnText,
                  hasPhoto && { color: '#72a4ff' },
                ]}
              >
                {hasPhoto ? 'Foto adjunta' : 'Adjuntar una foto (opcional)'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Botones finales */}
          <View style={styles.footerButtons}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onCancel}
              style={styles.cancelBtn}
            >
              <Text style={styles.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSubmit}
              style={styles.submitBtn}
            >
              <Text style={styles.submitBtnText}>Enviar reporte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Modal nativo para seleccionar ciudad */}
      <Modal
        visible={cityModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCityModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setCityModalVisible(false)}
        >
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Seleccionar ciudad</Text>
            <ScrollView style={{ maxHeight: 320 }}>
              {SV_CITIES.map((item) => {
                const isSelected = item === city;
                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      setCity(item);
                      setCityModalVisible(false);
                    }}
                    style={[
                      styles.modalOption,
                      isSelected && styles.modalOptionActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.modalOptionText,
                        isSelected && { color: '#72a4ff', fontWeight: '700' },
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
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
    paddingBottom: 36,
  },
  backBtn: {
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
  flagBar: {
    height: 4,
    flexDirection: 'row',
    width: '100%',
  },
  flagSegment: {
    flex: 1,
  },
  body: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#f0f4f8',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7a93',
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6b7a93',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  required: {
    color: '#ef4444',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryItem: {
    width: '31%',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  categoryItemDefault: {
    borderColor: '#252d3a',
    backgroundColor: 'transparent',
  },
  categoryItemActive: {
    borderColor: 'rgba(47, 117, 255, 0.6)',
    backgroundColor: 'rgba(47, 117, 255, 0.12)',
  },
  categoryItemText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6b7a93',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#0d1117',
    borderWidth: 1,
    borderColor: '#252d3a',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#f0f4f8',
  },
  inputError: {
    borderColor: '#dc2626',
    backgroundColor: 'rgba(69, 10, 10, 0.25)',
  },
  textArea: {
    minHeight: 84,
  },
  errorText: {
    fontSize: 12,
    color: '#f87171',
    marginTop: 4,
  },
  selectButton: {
    backgroundColor: '#0d1117',
    borderWidth: 1,
    borderColor: '#252d3a',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 14,
    color: '#f0f4f8',
  },
  selectArrow: {
    fontSize: 10,
    color: '#6b7a93',
  },
  photoBtn: {
    paddingVertical: 20,
    borderRadius: 8,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoBtnDefault: {
    borderColor: '#252d3a',
  },
  photoBtnActive: {
    borderColor: 'rgba(47, 117, 255, 0.5)',
    backgroundColor: 'rgba(47, 117, 255, 0.06)',
  },
  photoBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7a93',
  },
  footerButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#252d3a',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6b7a93',
  },
  submitBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2f75ff',
    alignItems: 'center',
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    padding: 24,
  },
  modalSheet: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#252d3a',
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f0f4f8',
    marginBottom: 12,
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  modalOptionActive: {
    backgroundColor: 'rgba(47, 117, 255, 0.15)',
  },
  modalOptionText: {
    fontSize: 14,
    color: '#a0aec0',
  },
});
