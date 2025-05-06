import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllNotes, deleteNote, NoteList } from "../features/notes";
import "../styles/styles.css";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    setNotes(getAllNotes());
  }, []);

  const handleDelete = (title) => {
    deleteNote(title);
    setNotes(getAllNotes());
  };

  return (
    <div className="container">
      <h1>Minhas Anotações</h1>
      <NoteList
        notes={notes}
        onDelete={handleDelete}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
}
