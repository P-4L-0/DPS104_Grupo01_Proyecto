"use client";

import { useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import "./paso-3.css";
import { useIssues } from "../../context/IssuesContext";

const CITIES = [
  "San Salvador",
  "Antiguo Cuscatlán",
  "Santa Ana",
  "Santa Tecla",
  "Soyapango",
];

export default function Paso3Page() {
  const router = useRouter();
  const { draft, updateDraft, validateStep3, submitDraftAsIssue } = useIssues();

  const [manualOpen, setManualOpen] = useState(true);
  const [pinPos, setPinPos] = useState({ x: 51, y: 54 });
  const [zoom, setZoom] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [geoNotice, setGeoNotice] = useState("");

  function handleUseCurrentLocation() {
    if (!("geolocation" in navigator)) {
      setGeoNotice(
        "La geolocalización no está disponible aquí. Completa o ajusta la ubicación manualmente."
      );
      setManualOpen(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateDraft({
          lat: latitude,
          lng: longitude,
          address: draft.address || `Coord. ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        });
        setGeoNotice("");
      },
      () => {
        setGeoNotice(
          "Permiso de ubicación denegado. Podés usar 'Selección manual' para ingresar dirección, colonia y ciudad."
        );
        setManualOpen(true);
      }
    );
  }

  function handleMapClick(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = Math.min(88, Math.max(12, ((event.clientX - rect.left) / rect.width) * 100));
    const yPct = Math.min(84, Math.max(18, ((event.clientY - rect.top) / rect.height) * 100));

    setPinPos({ x: xPct, y: yPct });

    const latOffset = (50 - yPct) * 0.0008;
    const lngOffset = (xPct - 50) * 0.001;
    updateDraft({
      lat: Number((13.698 + latOffset).toFixed(5)),
      lng: Number((-89.218 + lngOffset).toFixed(5)),
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const stepErrors = validateStep3();
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length > 0) {
      setManualOpen(true);
      return;
    }

    const created = submitDraftAsIssue();
    if (created) {
      router.push("/");
    }
  }

  const summaryText =
    draft.address.trim() || draft.neighborhood.trim()
      ? `${draft.address.trim() || draft.neighborhood.trim()} · ${draft.city}`
      : `Alameda Roosevelt · ${draft.city}`;

  return (
    <main className="step3-shell">
      <section className="step3-container">
        <form className="step3-card" onSubmit={handleSubmit} noValidate>
          <p className="step3-kicker">Paso 3 de 3: Ubicación</p>
          <h1 className="step3-title">¿Dónde está el problema?</h1>
          <p className="step3-subtitle">
            Usá tu ubicación actual o marcá el lugar exacto en el mapa.
          </p>

          {/* Botón GPS */}
          <div className="step3-gps-row">
            <button
              type="button"
              className="step3-gps-btn"
              onClick={handleUseCurrentLocation}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="7" />
                <circle cx="12" cy="12" r="2" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
              </svg>
              <span>Usar mi ubicación actual</span>
            </button>
            <p className="step3-gps-hint">
              Te pediremos permiso para acceder a tu ubicación.
            </p>
          </div>

          {geoNotice && (
            <div className="step3-warning" role="alert">
              {geoNotice}
            </div>
          )}

          {/* Buscador */}
          <div className="step3-search-group">
            <label htmlFor="location-search" className="step3-label">
              O BUSCÁ UNA DIRECCIÓN O LUGAR
            </label>
            <div className="step3-input-wrap">
              <span className="step3-input-icon" aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>
              </span>
              <input
                id="location-search"
                type="text"
                className="step3-input"
                value={draft.address}
                placeholder="Alameda Roosevelt, San Salvador"
                onChange={(e) => {
                  updateDraft({ address: e.target.value });
                  setErrors((prev) => ({ ...prev, address: "" }));
                }}
              />
            </div>
          </div>

          {/* Mapa interactivo */}
          <div
            className="step3-map-box"
            onClick={handleMapClick}
            role="application"
            aria-label="Mapa interactivo de ubicación del problema"
          >
            <div
              className="step3-map-grid"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: `${pinPos.x}% ${pinPos.y}%`,
                transition: "transform 160ms ease",
              }}
            >
              {Array.from({ length: 28 }).map((_, index) => (
                <div
                  key={index}
                  className={`step3-map-block ${index === 16 ? "step3-map-block--park" : ""}`}
                />
              ))}
            </div>

            <div className="step3-map-road" />

            <span className="step3-map-label step3-map-label--colonia">
              COLONIA FLOR BLANCA
            </span>
            <span className="step3-map-label step3-map-label--avenue">
              Alameda Roosevelt
            </span>
            <span className="step3-map-label step3-map-label--park">
              Zona verde
            </span>
            <span className="step3-map-label step3-map-label--city">
              SAN SALVADOR
            </span>

            <div
              className="step3-map-zoom"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="step3-zoom-btn"
                aria-label="Acercar mapa"
                onClick={() => setZoom((z) => Math.min(1.35, Number((z + 0.1).toFixed(2))))}
              >
                +
              </button>
              <button
                type="button"
                className="step3-zoom-btn"
                aria-label="Alejar mapa"
                onClick={() => setZoom((z) => Math.max(0.9, Number((z - 0.1).toFixed(2))))}
              >
                −
              </button>
            </div>

            <div
              className="step3-pin-marker"
              style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%` }}
            >
              <span className="step3-pin-callout">Ubicación del problema</span>
              <div className="step3-pin-dot-wrap">
                <span className="step3-pin-circle" />
                <span className="step3-pin-shadow" />
              </div>
            </div>
          </div>

          <p className="step3-map-caption">
            Hacé clic en el mapa o arrastrá el marcador para ajustar la ubicación.
          </p>

          {/* Barra inferior de ubicación seleccionada */}
          <div className="step3-selected-bar">
            <div className="step3-selected-left">
              <span className="step3-selected-pin" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <div>
                <p className="step3-selected-kicker">Ubicación seleccionada</p>
                <p className="step3-selected-value">{summaryText}</p>
              </div>
            </div>

            <button
              type="button"
              className="step3-manual-toggle"
              onClick={() => setManualOpen((prev) => !prev)}
            >
              Selección manual
            </button>
          </div>

          {/* Campos obligatorios para validar y construir el Issue */}
          {manualOpen && (
            <div className="step3-manual-grid">
              <div>
                <label htmlFor="step3-city" className="step3-label">
                  CIUDAD *
                </label>
                <select
                  id="step3-city"
                  className="step3-input step3-input--plain"
                  value={draft.city}
                  onChange={(e) => {
                    updateDraft({ city: e.target.value });
                    setErrors((prev) => ({ ...prev, city: "" }));
                  }}
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="step3-error" role="alert">
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="step3-address" className="step3-label">
                  DIRECCIÓN *
                </label>
                <input
                  id="step3-address"
                  type="text"
                  className="step3-input step3-input--plain"
                  value={draft.address}
                  placeholder="Calle, avenida o referencia"
                  onChange={(e) => {
                    updateDraft({ address: e.target.value });
                    setErrors((prev) => ({ ...prev, address: "" }));
                  }}
                />
                {errors.address && (
                  <p className="step3-error" role="alert">
                    {errors.address}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="step3-neighborhood" className="step3-label">
                  COLONIA / DISTRITO *
                </label>
                <input
                  id="step3-neighborhood"
                  type="text"
                  className="step3-input step3-input--plain"
                  value={draft.neighborhood}
                  placeholder="Colonia Flor Blanca"
                  onChange={(e) => {
                    updateDraft({ neighborhood: e.target.value });
                    setErrors((prev) => ({ ...prev, neighborhood: "" }));
                  }}
                />
                {errors.neighborhood && (
                  <p className="step3-error" role="alert">
                    {errors.neighborhood}
                  </p>
                )}
              </div>
            </div>
          )}

          <hr className="step3-divider" />

          <div className="step3-footer">
            <button
              type="button"
              className="step3-back-btn"
              onClick={() => router.push("/reportar/paso-2")}
            >
              <span aria-hidden="true">←</span>
              <span>Anterior</span>
            </button>

           <button type="submit" className="step3-publish-btn">Publicar reporte</button>
          </div>
        </form>
      </section>
    </main>
  );
}