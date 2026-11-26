"use client";

import React, { createContext, useContext, useState } from "react";
import { SAMPLE_ISSUES, type Issue, type IssueCategory, type IssueStatus } from "../data/issues";

export interface ReportDraft {
  category: IssueCategory | "";
  title: string;
  description: string;
  photoUrl: string;
  photoFileName: string;
  city: string;
  address: string;
  neighborhood: string;
  lat: number;
  lng: number;
  reportedBy: string;
}

const INITIAL_DRAFT: ReportDraft = {
  category: "",
  title: "",
  description: "",
  photoUrl: "",
  photoFileName: "",
  city: "San Salvador",
  address: "",
  neighborhood: "",
  lat: 13.6989,
  lng: -89.1914,
  reportedBy: "",
};

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  "San Salvador": { lat: 13.6989, lng: -89.1914 },
  "Antiguo Cuscatlán": { lat: 13.6647, lng: -89.2478 },
  "Santa Ana": { lat: 13.9946, lng: -89.5597 },
  "Santa Tecla": { lat: 13.6769, lng: -89.2797 },
  "Soyapango": { lat: 13.7102, lng: -89.1424 },
};

interface IssuesContextType {
  issues: Issue[];
  addIssue: (issue: Issue) => void;
  updateIssueStatus: (id: string, status: IssueStatus) => void;
  draft: ReportDraft;
  updateDraft: (patch: Partial<ReportDraft>) => void;
  resetDraft: () => void;
  validateStep1: () => Record<string, string>;
  validateStep2: () => Record<string, string>;
  validateStep3: () => Record<string, string>;
  isStep1Valid: boolean;
  isStep2Valid: boolean;
  isStep3Valid: boolean;
  submitDraftAsIssue: () => Issue | null;
}

const IssuesContext = createContext<IssuesContextType | null>(null);

export function IssuesProvider({ children }: { children: React.ReactNode }) {
  const [issues, setIssues] = useState<Issue[]>(SAMPLE_ISSUES);
  const [draft, setDraft] = useState<ReportDraft>(INITIAL_DRAFT);

  function addIssue(newIssue: Issue) {
    setIssues((prev) => [newIssue, ...prev]);
  }

  function updateIssueStatus(id: string, status: IssueStatus) {
    setIssues((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item
      )
    );
  }

  function updateDraft(patch: Partial<ReportDraft>) {
    setDraft((prev) => ({ ...prev, ...patch }));
  }

  function resetDraft() {
    setDraft(INITIAL_DRAFT);
  }

  function validateStep1(): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!draft.category) errors.category = "Selecciona una categoría.";
    if (draft.title.trim().length < 5) errors.title = "El título debe tener al menos 5 caracteres.";
    if (draft.description.trim().length < 15) {
      errors.description = "La descripción debe tener al menos 15 caracteres.";
    }
    return errors;
  }

  function validateStep2(): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!draft.photoUrl.trim()) {
      errors.photo = "Debes subir una fotografía o ingresar una URL de imagen para continuar.";
    }
    return errors;
  }

  function validateStep3(): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!draft.city.trim()) errors.city = "Selecciona una ciudad.";
    if (draft.address.trim().length < 5) {
      errors.address = "Ingresa la dirección o punto de referencia (mínimo 5 caracteres).";
    }
    if (draft.neighborhood.trim().length < 3) {
      errors.neighborhood = "Ingresa la colonia, barrio o distrito.";
    }
    return errors;
  }

  const isStep1Valid = Object.keys(validateStep1()).length === 0;
  const isStep2Valid = Object.keys(validateStep2()).length === 0;
  const isStep3Valid = Object.keys(validateStep3()).length === 0;

  function submitDraftAsIssue(): Issue | null {
    if (!isStep1Valid || !isStep2Valid || !isStep3Valid || !draft.category) return null;

    const now = new Date().toISOString();
    const fallbackCoords = CITY_COORDS[draft.city] ?? { lat: 13.6989, lng: -89.1914 };

    const newIssue: Issue = {
      id: String(Date.now()),
      title: draft.title.trim(),
      description: draft.description.trim(),
      category: draft.category,
      status: "reported",
      address: draft.address.trim(),
      neighborhood: draft.neighborhood.trim(),
      city: draft.city.trim(),
      lat: draft.lat || fallbackCoords.lat,
      lng: draft.lng || fallbackCoords.lng,
      reportedBy: draft.reportedBy.trim() || "Ciudadano SV",
      reportedAt: now,
      updatedAt: now,
      upvotes: 1,
      photoUrl: draft.photoUrl.trim(),
      statusHistory: [
        {
          status: "reported",
          date: now,
          note: "Reporte enviado desde la plataforma web.",
        },
      ],
    };

    addIssue(newIssue);
    resetDraft();
    return newIssue;
  }

  return (
    <IssuesContext.Provider
      value={{
        issues,
        addIssue,
        updateIssueStatus,
        draft,
        updateDraft,
        resetDraft,
        validateStep1,
        validateStep2,
        validateStep3,
        isStep1Valid,
        isStep2Valid,
        isStep3Valid,
        submitDraftAsIssue,
      }}
    >
      {children}
    </IssuesContext.Provider>
  );
}

export function useIssues() {
  const ctx = useContext(IssuesContext);
  if (!ctx) throw new Error("useIssues debe usarse dentro de IssuesProvider");
  return ctx;
}