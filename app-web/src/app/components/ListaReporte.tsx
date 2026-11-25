import { TarjetaReporte } from "./TarjetaReporte";

export interface Reporte {
  id: string;
  titulo: string;
  categoria: string;
  ubicacion: string;
  estado: string;
  fecha: string;
  imagenUrl: string;
}

interface ListaReportesProps {
  reportes: Reporte[];
}

export function ListaReportes({ reportes }: ListaReportesProps) {
  if (!reportes || reportes.length === 0) {
    return <p>No hay reportes comunitarios registrados por el momento.</p>;
  }

  return (
    <>
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
    </>
  );
}