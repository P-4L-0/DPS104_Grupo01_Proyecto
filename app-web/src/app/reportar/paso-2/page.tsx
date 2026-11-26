"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import "./paso-2.css";
import { useIssues } from "../../context/IssuesContext";

export default function Paso2Page() {
  const router = useRouter();
  const { draft, updateDraft, validateStep2 } = useIssues();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [permissionDenied, setPermissionDenied] = useState("");

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors({ photo: "Selecciona un archivo de imagen válido (JPG, PNG o WEBP)." });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateDraft({
        photoUrl: String(reader.result || ""),
        photoFileName: file.name,
      });
      setErrors({});
      setPermissionDenied("");
    };
    reader.readAsDataURL(file);
  }

  async function handleCameraAccess() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setPermissionDenied(
        "El acceso directo a cámara no está disponible aquí. Adjunta una imagen o pega una URL."
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setPermissionDenied("");
      fileInputRef.current?.click();
    } catch {
      setPermissionDenied(
        "Permiso de cámara denegado. Puedes seleccionar una foto desde tu archivo o escribir una URL de imagen."
      );
    }
  }

  function handleClearPhoto() {
    updateDraft({ photoUrl: "", photoFileName: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const stepErrors = validateStep2();
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      router.push("/reportar/paso-3");
    }
  }

  return (
    <main className="page-shell">
      <header className="top-header">
        <div className="top-header-inner">
          <button
            type="button"
            className="brand-link"
            onClick={() => router.push("/")}
            aria-label="CivicReport.SV"
          >
            <span className="flag-mark" aria-hidden="true">
              <span>SV</span>
            </span>
            <span className="brand-name">
              CivicReport<span className="brand-accent">.SV</span>
            </span>
          </button>

          <button
            type="button"
            className="admin-header-btn"
            onClick={() => router.push("/")}
          >
            Administrar
          </button>
        </div>
      </header>

      <section className="step-section">
        <form className="step-card" onSubmit={handleSubmit} noValidate>
          <div className="step-header">
            <p className="step-kicker">Paso 2 de 3 · Evidencia fotográfica</p>
            <h1 className="step-title">Adjuntar fotografía del problema</h1>
            <p className="step-subtitle">
              Una foto clara ayuda a verificar el estado y la gravedad del reporte.
            </p>
          </div>

          <div className="field-block">
            <label className="field-label">
              Fotografía <span aria-hidden="true">*</span>
            </label>

            <div className="photo-actions-row">
              <button
                type="button"
                className="secondary-button"
                onClick={handleCameraAccess}
              >
                Usar cámara
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => fileInputRef.current?.click()}
              >
                Seleccionar archivo
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="photo-file-input"
              onChange={handleFileChange}
            />

            <div
              role="button"
              tabIndex={0}
              className="photo-dropzone"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
            >
              <p className="photo-dropzone-title">
                {draft.photoFileName
                  ? `Archivo cargado: ${draft.photoFileName}`
                  : "Haz clic aquí para subir una foto desde tu dispositivo"}
              </p>
              <p className="photo-dropzone-hint">
                Formatos admitidos: JPG, PNG o WEBP
              </p>
            </div>

            {permissionDenied && (
              <div className="alert-warning" role="alert">
                {permissionDenied}
              </div>
            )}
          </div>

          <div className="field-block">
            <label className="field-label" htmlFor="photo-url-input">
              O ingresa una URL de imagen <span aria-hidden="true">*</span>
            </label>
            <input
              id="photo-url-input"
              type="url"
              className="form-control"
              value={draft.photoUrl.startsWith("data:") ? "" : draft.photoUrl}
              placeholder="https://ejemplo.com/foto-del-problema.jpg"
              onChange={(e) => {
                updateDraft({ photoUrl: e.target.value, photoFileName: "" });
                setErrors({});
              }}
            />
            {errors.photo && (
              <p className="error-text" role="alert">
                {errors.photo}
              </p>
            )}
          </div>

          {draft.photoUrl && (
            <div className="preview-box">
              <div className="preview-header">
                <span>Vista previa del reporte</span>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handleClearPhoto}
                >
                  Quitar foto
                </button>
              </div>
              <img
                src={draft.photoUrl}
                alt="Vista previa del problema reportado"
                className="preview-image"
              />
            </div>
          )}

          <div className="step-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => router.push("/reportar/paso-1")}
            >
              Anterior
            </button>

            <button type="submit" className="primary-button">
              <span>Siguiente: Ubicación</span>
              <span className="button-arrow" aria-hidden="true" />
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}