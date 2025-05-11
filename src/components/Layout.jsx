import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../styles/styles.css";

export default function Layout({ children, search, setSearch }) {
  return (
    <div className="layout">
      <header className="header">
        <h1>LearnNotes</h1>
        <nav>
          <Link to="/">Início</Link>
          <Link to="/">Sobre</Link>
          <Link to="/">Contato</Link>
          <Link to="/nova">Nova Anotação</Link>
        </nav>
      </header>

      <main className="content">{children}</main>

      <footer className="footer">
        <p>
          Produzido por{" "}
          <a href="https://yuri-amaral-santos-portfolio.vercel.app/">
            Yuri Amaral Santos
          </a>
        </p>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};
