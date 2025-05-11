// src/features/notes/components/NoteForm.jsx
import React from "react";

export default function NoteForm({
  title,
  setTitle,
  text,
  setText,
  onSave,
  error,
}) {
  return (
    <div className="form">
      {error && <p className="error-message">{error}</p>}
      <h1>Nova anotação</h1>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
      />
      <textarea
        rows="5"
        placeholder="Digite o conteúdo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="textarea"
      />
      <button onClick={onSave} className="button">
        Salvar
      </button>
    </div>
  );
}
