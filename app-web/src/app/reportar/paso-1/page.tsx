"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import "./paso-1.css";
import { useIssues } from "../../context/IssuesContext";
import type { IssueCategory } from "../../data/issues";

const categories: { label: string; value: IssueCategory }[] = [
  { label: "Bache", value: "pothole" },
  { label: "Alumbrado", value: "streetlight" },
  { label: "Grafiti", value: "graffiti" },
  { label: "Acera", value: "sidewalk" },
  { label: "Drenaje", value: "drainage" },
  { label: "Señalización", value: "signage" },
  { label: "Parques y árboles", value: "parks" },
  { label: "Agua y aguas negras", value: "water" },
  { label: "Electricidad", value: "electricity" },
  { label: "Otro", value: "other" },
];

export default function Paso1Page() {
  const router = useRouter();
  const { draft, updateDraft, validateStep1, resetDraft } = useIssues();
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const stepErrors = validateStep1();
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      router.push("/reportar/paso-2");
    }
  }

  function handleCancel() {
    resetDraft();
    router.push("/");
  }

  return (
    <main className="wizard-main">
     
        <div className="wizard-header-inner">
          <button
            type="button"
            className="wizard-brand-link"
            onClick={() => router.push("/")}
            aria-label="CivicReport.SV"
          >
            <span className="flag-mark" aria-hidden="true">
              <span>SV</span>
            </span>
            <span className="wizard-brand-text">
              CivicReport<span className="wizard-brand-accent">.SV</span>
            </span>
          </button>

          <button
            type="button"
            className="wizard-admin-btn"
            onClick={() => router.push("/")}
          >
            Administrar
          </button>
        </div>
     

      <section className="wizard-section">
        <form
          id="report-form"
          className="wizard-card"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="wizard-heading-group">
            <p className="wizard-step-label">Paso 1 de 3 · Detalles del problema</p>
            <h1 className="wizard-title">Reportar un problema comunitario</h1>
            <p className="wizard-subtitle">
              Tu reporte impulsa acciones municipales reales. Sé específico.
            </p>
          </div>

          <fieldset className="wizard-fieldset">
            <legend className="field-label">
              Categoría <span aria-hidden="true">*</span>
            </legend>
            <div className="categories-wrap">
              {categories.map((item) => {
                const selected = draft.category === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    aria-pressed={selected}
                    className={`category-button ${selected ? "category-button--selected" : ""}`}
                    onClick={() => {
                      updateDraft({ category: item.value });
                      setErrors((prev) => ({ ...prev, category: "" }));
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            {errors.category && (
              <p className="wizard-error" role="alert">
                {errors.category}
              </p>
            )}
          </fieldset>

          <div className="wizard-field-group">
            <label className="field-label" htmlFor="problem-title">
              Título del problema <span aria-hidden="true">*</span>
            </label>
            <input
              id="problem-title"
              name="title"
              type="text"
              className="form-control form-control-title"
              value={draft.title}
              placeholder="Descripción breve del problema..."
              onChange={(e) => {
                updateDraft({ title: e.target.value });
                setErrors((prev) => ({ ...prev, title: "" }));
              }}
            />
            {errors.title && (
              <p className="wizard-error" role="alert">
                {errors.title}
              </p>
            )}
          </div>

          <div className="wizard-field-group-lg">
            <label className="field-label" htmlFor="problem-description">
              Descripción <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="problem-description"
              name="description"
              className="form-control form-control-textarea"
              value={draft.description}
              placeholder="Tamaño, gravedad, cuánto tiempo lleva ahí, riesgos de seguridad..."
              onChange={(e) => {
                updateDraft({ description: e.target.value });
                setErrors((prev) => ({ ...prev, description: "" }));
              }}
            />
            {errors.description && (
              <p className="wizard-error" role="alert">
                {errors.description}
              </p>
            )}
          </div>

          <div className="wizard-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button type="submit" className="primary-button">
              <span>Siguiente: Foto</span>
              <span className="button-arrow" aria-hidden="true" />
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}