import { useEffect, useState } from "react";
import { getAllNotes, deleteNote } from "../features/notes/noteService";
import { NoteList } from "../features/notes";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchNotes() {
      const allNotes = await getAllNotes();
      setNotes(allNotes);
    }
    fetchNotes();
  }, []);

  const handleDelete = async (title) => {
    await deleteNote(title);
    const allNotes = await getAllNotes();
    setNotes(allNotes);
  };

  return (
    <div className="content">
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
