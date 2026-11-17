
export function TarjetaReporte({ titulo, categoria, ubicacion, estado, fecha, imagenUrl }) {
  const coloresEstado = {
    Pendiente: "#ef4444",
    "En revisión": "#f59e0b",
    Resuelto: "#10b981"
  };

  return (
    <article style={styles.card}>
      <img src={imagenUrl} alt={titulo} style={styles.imagen} />
      <div style={styles.contenido}>
        <div style={styles.header}>
          <span style={styles.categoria}>{categoria}</span>
          <span style={{ ...styles.badge, backgroundColor: coloresEstado[estado] || "#64748b" }}>
            {estado}
          </span>
        </div>
        <h3 style={styles.titulo}>{titulo}</h3>
        <p style={styles.detalle}> {ubicacion}</p>
        <p style={styles.fecha}>Reportado el: {fecha}</p>
      </div>
    </article>
  );
}

const styles = {
  card: {
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column"
  },
  imagen: { width: "100%", height: "150px", objectFit: "cover" },
  contenido: { padding: "14px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" },
  categoria: { fontSize: "12px", fontWeight: "bold", color: "#475569", textTransform: "uppercase" },
  badge: { color: "#fff", fontSize: "12px", padding: "3px 8px", borderRadius: "12px", fontWeight: "600" },
  titulo: { margin: "0 0 8px 0", fontSize: "16px", color: "#0f172a" },
  detalle: { margin: "0 0 6px 0", fontSize: "14px", color: "#334155" },
  fecha: { margin: 0, fontSize: "12px", color: "#64748b" }
};