import React from "react";
import styles from "../style/TarjetaReporte.module.css";

export interface TarjetaReporteProps {
  titulo: string;
  categoria: string;
  ubicacion: string;
  estado: string;
  fecha: string;
  imagenUrl: string;
}

export function TarjetaReporte({
  titulo,
  categoria,
  ubicacion,
  estado,
  fecha,
  imagenUrl,
}: TarjetaReporteProps) {
  const coloresEstado: Record<string, string> = {
    Pendiente: "#ef4444",
    "En revisión": "#f59e0b",
    Resuelto: "#10b981",
  };

  return (
    <article className={styles.card}>
      <img src={imagenUrl} alt={titulo} className={styles.imagen} />
      <div className={styles.contenido}>
        <div className={styles.header}>
          <span className={styles.categoria}>{categoria}</span>
          <span
            className={styles.badge}
            style={{ backgroundColor: coloresEstado[estado] || "#64748b" }}
          >
            {estado}
          </span>
        </div>
        <h3 className={styles.titulo}>{titulo}</h3>
        <p className={styles.detalle}>{ubicacion}</p>
        <p className={styles.fecha}>Reportado el: {fecha}</p>
      </div>
    </article>
  );
}

