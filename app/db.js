'use strict';

import { findNotebook, findNotebookIndex, findNote } from "../index.js";


const generateID = function () {
    return new Date().getTime().toString();
}

let notekeeperDB = {};

const initDB = function () {
    const db = localStorage.getItem('notekeeperDB');
    if (db)
        notekeeperDB = JSON.parse(db);
    else
        notekeeperDB.notebooks = [];
        localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
}

initDB();

const readDB = function () {
    notekeeperDB = JSON.parse(localStorage.getItem('notekeeperDB'));
}

const writeDB = function () {
    localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
}

export const db = {

    post: {
        notebook(name) {
            readDB();

            const notebookData = {
                id: generateID(),
                name,
                notes: []
            }

            notekeeperDB.notebooks.push(notebookData);
            
            writeDB();

            return notebookData;
        },

        note(notebookId, noteObj) {
            readDB()

            const notebook = findNotebook(notekeeperDB, notebookId);

            const noteData = {
                id: generateID(),
                notebookId,
                ... noteObj,
                postedOn: new Date().getTime()
            }

            notebook.notes.unshift(noteData);

            writeDB()

            return noteData;
        }
    },

    get: {
        notebook() {
            readDB();
            
            return notekeeperDB.notebooks;
        },
        note(notebookId) {
            readDB();
            
            const notebook = findNotebook(notekeeperDB, notebookId);

            return notebook.notes;
        }
    },

    update: {
        notebook(notebookId, name) {
            readDB()
            
            const notebook = findNotebook(notekeeperDB, notebookId);
            notebook.name = name;
            
            writeDB()
            
            return notebook;
        },
        
        note(noteId, newNoteObj) {
            readDB()

            const oldNote = findNote(notekeeperDB, noteId)
            const newNote = Object.assign(oldNote, newNoteObj)

            writeDB()

            return newNote;
        }
    },
    
    delete: {
        notebook(notebookId) {
            readDB()

            const notebookIndex = findNotebookIndex(notekeeperDB, notebookId);
            notekeeperDB.notebooks.splice(notebookIndex, 1);

            writeDB()
        }
    }

};