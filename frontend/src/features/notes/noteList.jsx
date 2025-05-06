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
        placeholder="Buscar página..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input"
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
              <button
                onClick={() => onDelete(n.title)}
                className="delete-button"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
