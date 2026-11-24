
import { ListaReportes } from "./components/ListaReportes";
import { reportesIniciales } from "./data/reportesMock";
 
// En Next.js, page.js es la pantalla que se muestra en la ruta "/".
// Hace el trabajo que hacía App.jsx, y por eso lleva "export default".
export default function Home() {
  return (
    <main style={{ maxWidth: "960px", margin: "0 auto", padding: "20px" }}>
      <header>
        <h1>Reportes Comunitarios</h1>
        <p>Prototipo Web (Fase 1) — Seguimiento de incidencias reportadas por los usuarios en el campus</p>
      </header>
      <ListaReportes reportes={reportesIniciales} />
    </main>
  );
}
