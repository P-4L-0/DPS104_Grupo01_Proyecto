import { TarjetaReporte } from "./TarjetaReporte.jsx";

export function ListaReportes({ reportes }) {
  if (!reportes || reportes.length === 0) {
    return <p>No hay reportes comunitarios registrados por el momento.</p>;
  }

  return (
    <section style={styles.grid}>
      {reportes.map((item) => (
        <TarjetaReporte
          key={item.id}
          titulo={item.titulo}
          categoria={item.categoria}
          ubicacion={item.ubicacion}
          estado={item.estado}
          fecha={item.fecha}
          imagenUrl={item.imagenUrl}
        />
      ))}
    </section>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "16px",
    marginTop: "16px"
  }
};