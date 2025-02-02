import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles.css";

export default function Home() {
  const [pages, setPages] = useState(() => {
    const storedPages = localStorage.getItem("pages");
    return storedPages ? JSON.parse(storedPages) : [];
  });
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleDelete = (titleToDelete) => {
    const updatedPages = pages.filter((page) => page.title !== titleToDelete);
    setPages(updatedPages);
    localStorage.setItem("pages", JSON.stringify(updatedPages));
  };

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Minhas Anotações</h1>
      <input
        type="text"
        placeholder="Buscar página..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input"
      />

      {filteredPages.length === 0 ? (
        <p>Nenhuma anotação encontrada.</p>
      ) : (
        <ul className="page-list">
          {filteredPages.map((page, index) => (
            <li key={index} className="page-item">
              <Link to={`/pagina/${encodeURIComponent(page.title)}`}>
                {page.title}
              </Link>
              <button
                onClick={() => handleDelete(page.title)}
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
