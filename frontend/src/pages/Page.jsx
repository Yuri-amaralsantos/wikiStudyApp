import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getNote, getAllNotes, updateNote } from "../features/notes";
import "../styles/styles.css";

export default function Page() {
  const { title } = useParams();
  const nav = useNavigate();

  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState("");
  const [allTitles, setAllTitles] = useState([]);

  useEffect(() => {
    async function loadNote() {
      const found = await getNote(title);
      if (found) {
        setContent(found.content);
        setEdited(found.content);
      }

      const notes = await getAllNotes();
      setAllTitles(Array.isArray(notes) ? notes.map((n) => n.title) : []);
    }

    loadNote();
  }, [title]);

  const save = () => {
    updateNote(title, edited);
    setContent(edited);
    setIsEditing(false);
  };

  const renderWithLinks = (txt) =>
    txt.split(/(@[^@]+@)/g).map((p, i) => {
      if (p.startsWith("@") && p.endsWith("@")) {
        const w = p.slice(1, -1);
        if (allTitles.includes(w))
          return (
            <Link
              key={i}
              to={`/pagina/${encodeURIComponent(w)}`}
              className="link"
            >
              {w}
            </Link>
          );
      }
      return p;
    });

  return (
    <div className="container">
      <div className="page-header">
        <h1>{title}</h1>
        <div className="page-buttons">
          {isEditing ? (
            <>
              <button onClick={save} className="button">
                Salvar
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEdited(content);
                }}
                className="button secondary"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="button">
              Editar
            </button>
          )}
          {!isEditing && (
            <button onClick={() => nav("/")} className="button secondary">
              Voltar
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <textarea
          rows="5"
          value={edited}
          onChange={(e) => setEdited(e.target.value)}
          className="textarea"
        />
      ) : (
        <p>{renderWithLinks(content)}</p>
      )}
    </div>
  );
}
