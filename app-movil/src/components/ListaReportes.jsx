import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { TarjetaReporte } from "./TarjetaReporte";
import {reportesMock } from "..data/reportesMock";

export function ListaReportes({ reportes, onSeleccionarReporte }) {
  if (!reportes || reportes.length === 0) {
    return (
      <View style={styles.vacioContainer}>
        <Text style={styles.vacioTexto}>
          No hay reportes comunitarios registrados por el momento.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reportes}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.lista}
      renderItem={({ item }) => (
        <TarjetaReporte
          titulo={item.titulo}
          categoria={item.categoria}
          ubicacion={item.ubicacion}
          estado={item.estado}
          fecha={item.fecha}
          imagenUrl={item.imagenUrl}
          onPress={
            onSeleccionarReporte ? () => onSeleccionarReporte(item) : undefined
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  vacioContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  vacioTexto: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
  },
});