import React, { useEffect, useRef } from "react";
import ModalHeader from "../../molecule/ModalHeader/ModalHeader";
import QuestionsList from "./QuestionsList";
import ActionButton from "../../molecule/ActionButton/ActionButton";
import ModalTemplate from "../../templates/ModalTemplate/ModalTemplate";

export default function SurveyModal({
  isOpen,
  onClose,
  questions = [],
  onViewQuestion,
  onGenerateReport,
  loading = false,
  error = "",
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalTemplate onClose={onClose}>
      <div
        ref={modalRef}
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
        className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn"
      >
        <ModalHeader
          title="Encuesta de satisfacción"
          subtitle="Esta encuesta fue creada para ver la satisfacción de nuestros estudiantes"
          onClose={onClose}
        />
        <div className="px-6 py-4">
          <QuestionsList questions={questions} onViewQuestion={onViewQuestion} />
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        </div>
        <div className="px-6 pb-6">
          <ActionButton loading={loading} onClick={onGenerateReport} aria-label="Generar reporte de encuesta">
            Generar reporte de encuesta
          </ActionButton>
        </div>
      </div>
    </ModalTemplate>
  );
}
