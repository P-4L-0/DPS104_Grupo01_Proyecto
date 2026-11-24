import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ListaReportes } from "../components/ListaReportes";
import { reportesIniciales } from "../data/reportesMock";

const ESTADOS = ["Todos", "Pendiente", "En revisión", "Resuelto"];

export function ReportesScreen() {
  const [estadoActivo, setEstadoActivo] = useState("Todos");

  const reportesFiltrados =
    estadoActivo === "Todos"
      ? reportesIniciales
      : reportesIniciales.filter((r) => r.estado === estadoActivo);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Reportes Comunitarios</Text>
        <Text style={styles.subtitulo}>
          Incidencias activas en la comunidad y campus
        </Text>
      </View>

      <View style={styles.filtrosRow}>
        {ESTADOS.map((estado) => {
          const activo = estado === estadoActivo;
          return (
            <TouchableOpacity
              key={estado}
              style={[styles.filtroBtn, activo && styles.filtroBtnActivo]}
              onPress={() => setEstadoActivo(estado)}
            >
              <Text
                style={[styles.filtroTexto, activo && styles.filtroTextoActivo]}
              >
                {estado}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.listaWrapper}>
        <ListaReportes reportes={reportesFiltrados} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    marginBottom: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitulo: {
    fontSize: 13,
    color: "#475569",
    marginTop: 2,
  },
  filtrosRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  filtroBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
  },
  filtroBtnActivo: {
    backgroundColor: "#1d4ed8",
  },
  filtroTexto: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",
  },
  filtroTextoActivo: {
    color: "#ffffff",
  },
  listaWrapper: {
    flex: 1,
  },
});