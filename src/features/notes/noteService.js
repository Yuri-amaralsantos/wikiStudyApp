// src/features/notes/services/notesService.js
import { openDB } from 'idb';

const DB_NAME = 'notesDB';
const STORE_NAME = 'pages';

async function getDb() {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'title' });
            }
        },
    });
}

export async function getAllNotes() {
    const db = await getDb();
    const notes = await db.getAll(STORE_NAME);
    return Array.isArray(notes) ? notes : [];
}

export async function getNote(title) {
    const db = await getDb();
    return await db.get(STORE_NAME, title);
}

export async function saveNote(note) {
    const db = await getDb();
    await db.put(STORE_NAME, note);
}

export async function updateNote(title, content) {
    const db = await getDb();
    await db.put(STORE_NAME, { title, content });
}


export async function deleteNote(title) {
    const db = await getDb();
    await db.delete(STORE_NAME, title);
}
