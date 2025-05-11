// src/features/notes/components/NoteList.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NoteList({ notes, onDelete, search, setSearch }) {
  const filtered = Array.isArray(notes)
    ? notes.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Filtrar anotações"
        style={{ marginBottom: "16px", padding: "8px", width: "100%" }}
      />
      {filtered.length === 0 ? (
        <p>Nenhuma anotação encontrada.</p>
      ) : (
        <ul className="page-list">
          {filtered.map((n, i) => (
            <li key={i} className="page-item">
              <Link to={`/pagina/${encodeURIComponent(n.title)}`}>
                {n.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
