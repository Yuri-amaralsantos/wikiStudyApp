import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/styles.css";

export default function Page() {
  const { title } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [existingPages, setExistingPages] = useState([]);

  useEffect(() => {
    const storedPages = JSON.parse(localStorage.getItem("pages")) || [];
    setExistingPages(storedPages.map((page) => page.title));

    const foundPage = storedPages.find((page) => page.title === title);
    if (foundPage) {
      setContent(foundPage.content);
      setEditedContent(foundPage.content);
    }
  }, [title]);

  const handleSave = () => {
    setContent(editedContent);
    setIsEditing(false);

    const storedPages = JSON.parse(localStorage.getItem("pages")) || [];
    const updatedPages = storedPages.map((page) =>
      page.title === title ? { ...page, content: editedContent } : page
    );

    localStorage.setItem("pages", JSON.stringify(updatedPages));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(content); // Reset content to original value
  };

  const renderTextWithLinks = (text) => {
    return text.split(/(@[^@]+@)/g).map((part, index) => {
      if (part.startsWith("@") && part.endsWith("@")) {
        const word = part.slice(1, -1);

        if (existingPages.includes(word)) {
          return (
            <Link
              key={index}
              to={`/pagina/${encodeURIComponent(word)}`}
              className="link"
            >
              {word}
            </Link>
          );
        }
      }
      return part;
    });
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>{title}</h1>
        <div className="page-buttons">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="button">
                Salvar
              </button>
              <button onClick={handleCancelEdit} className="button secondary">
                Cancelar
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="button">
              Editar
            </button>
          )}
          {!isEditing && (
            <button onClick={() => navigate("/")} className="button secondary">
              Voltar
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <textarea
          rows="5"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="textarea"
        />
      ) : (
        <p>{renderTextWithLinks(content)}</p>
      )}

      {isEditing && (
        <p className="obs">
          <strong>Obs:</strong> Coloque as palavras entre arrobas ( @ ) para
          adicionar uma referência a um título de outra anotação.
        </p>
      )}
    </div>
  );
}
