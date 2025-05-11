import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllNotes, saveNote, NoteForm } from "../features/notes";
import "../styles/styles.css";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleSave = () => {
    if (!title.trim() || !text.trim()) {
      setError("Título e conteúdo não podem estar vazios.");
      return;
    }
    const notes = getAllNotes();
    if (Array.isArray(notes) && notes.some((note) => note.title === title)) {
      alert("Já existe uma nota com esse título.");
      return;
    }
    saveNote({ title, content: text });
    nav(`/pagina/${encodeURIComponent(title)}`);
  };

  return (
    <div className="container">
      <NoteForm
        title={title}
        setTitle={(val) => {
          setTitle(val);
          setError("");
        }}
        text={text}
        setText={(val) => {
          setText(val);
          setError("");
        }}
        onSave={handleSave}
        error={error}
      />
    </div>
  );
}
