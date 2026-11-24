import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

// Colores por estado. Si llega un estado que no está aquí, se usa "porDefecto".
const COLORES_ESTADO = {
  pendiente: { fondo: "#fef3c7", texto: "#92400e" },
  "en proceso": { fondo: "#dbeafe", texto: "#1e40af" },
  resuelto: { fondo: "#dcfce7", texto: "#166534" },
  porDefecto: { fondo: "#e2e8f0", texto: "#334155" },
};

function coloresDeEstado(estado) {
  const clave = String(estado || "").trim().toLowerCase();
  return COLORES_ESTADO[clave] || COLORES_ESTADO.porDefecto;
}

export function TarjetaReporte({
  titulo,
  categoria,
  ubicacion,
  estado,
  fecha,
  imagenUrl,
  onPress,
}) {
  const colores = coloresDeEstado(estado);

  const urlFinal = imagenUrl?.includes('placehold.co') && !imagenUrl.includes('.png')
    ? imagenUrl.replace('?', '.png?')
    : imagenUrl;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.tarjeta, pressed && styles.presionada]}
    >

      {imagenUrl ? (
        <Image
          source={{ uri: urlFinal }}
          style={styles.imagen}
          resizeMode="cover"
        />
      ) : null}

      <View style={styles.contenido}>
        <View style={styles.filaSuperior}>
          {categoria ? <Text style={styles.categoria}>{categoria}</Text> : <View />}
          {estado ? (
            <View style={[styles.etiquetaEstado, { backgroundColor: colores.fondo }]}>
              <Text style={[styles.textoEstado, { color: colores.texto }]}>
                {estado}
              </Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.titulo}>{titulo}</Text>

        {ubicacion ? <Text style={styles.meta}>{ubicacion}</Text> : null}
        {fecha ? <Text style={styles.meta}>{fecha}</Text> : null}
      </View>
    </Pressable>
  );
}

export default TarjetaReporte;

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  presionada: {
    opacity: 0.85,
  },
  imagen: {
    width: "100%",
    height: 150,
    backgroundColor: "#e2e8f0",
  },
  contenido: {
    padding: 14,
    gap: 4,
  },
  filaSuperior: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  categoria: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    flexShrink: 1,
    marginRight: 8,
  },
  etiquetaEstado: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  textoEstado: {
    fontSize: 12,
    fontWeight: "600",
  },
  titulo: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 2,
  },
  meta: {
    fontSize: 13,
    color: "#64748b",
  },
});
