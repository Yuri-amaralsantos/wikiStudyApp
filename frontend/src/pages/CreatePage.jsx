import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    if (title.trim() === "" || text.trim() === "") {
      setError("Título e conteúdo não podem estar vazios.");
      return;
    }

    const storedPages = JSON.parse(localStorage.getItem("pages")) || [];

    if (
      storedPages.some(
        (page) => page.title.toLowerCase() === title.toLowerCase()
      )
    ) {
      setError("Já existe uma página com esse título.");
      return;
    }

    const newPage = { title, content: text };
    const updatedPages = [...storedPages, newPage];

    localStorage.setItem("pages", JSON.stringify(updatedPages));
    navigate(`/pagina/${encodeURIComponent(title)}`);
  };

  return (
    <div className="container">
      <h1>Nova anotação</h1>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* mensagem de erro */}
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
        className="input"
      />
      <textarea
        rows="5"
        placeholder="Digite o conteúdo..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError("");
        }}
        className="textarea"
      />
      <button onClick={handleSave} className="button">
        Salvar
      </button>
      <button onClick={() => navigate("/")} className="button secondary">
        Voltar
      </button>
      <p className="obs">
        <strong>Obs:</strong> Coloque as palavras entre arrobas ( @ ) para
        adicionar uma referência a um título de outra anotação.
      </p>
    </div>
  );
}
