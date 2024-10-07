'use strict';

import './app/theme.js';
import { db } from './app/db.js';

const $ = element => document.querySelector(element)
const $$ = elements => document.querySelectorAll(elements)

/*————— Sidebar Elements ————————————————————————————————————————*/

const $sidebar = $('[data-sidebar]')
const $sidebarNavbar = $('[data-sidebar-navbar]')
const $sidebarOverlay = $('[data-sidebar-overlay]')
const $mainOverlay = $('[data-main-overlay]')

const $BTN_Notebook_Add = $('[data-notebook-add]')
const $BTN_Note_Add = $('[data-note-add]')
/*————— Header Elements ————————————————————————————————————————*/

const $headerTitle = $('[data-header-title]')

/*————— Modal Elements ————————————————————————————————————————*/

const $modal = $('[data-modal]')

const $modalNotebook_Add = $('[data-modal-notebook]')
const $INP_modalNotebook_Title = $('[data-modal-notebook] [data-notebook-title]')
const $BTN_modalNotebook_Cancel = $('[data-modal-notebook] [data-notebook-cancel]')
const $BTN_modalNotebook_Confirm = $('[data-modal-notebook] [data-notebook-add-confirm]')
const $BTN_editNotebook_Title = $('[data-notebook-edit]')

const $modalNotebook_Delete = $('[data-modal-notebook-delete]')
const $modalNotebook_Title = $('[data-modal-notebook-delete] [data-notebook-title]')
const $BTN_modalNotebookDelete_Cancel = $('[data-modal-notebook-delete] [data-notebook-cancel]')
const $BTN_modalNotebookDelete_Confirm = $('[data-modal-notebook-delete] [data-notebook-delete-confirm]')

const $modalNote_Add = $('[data-modal-note]')
const $INP_modalNote_Title = $('[data-modal-note] [data-note-title]')
const $INP_modalNote_Content = $('[data-modal-note] [data-note-content]')
const $BTN_modalNote_Cancel = $('[data-modal-note] [data-note-cancel]')
const $BTN_modalNote_Confirm = $('[data-modal-note] [data-note-add-confirm]')

/*————— Main Elements ————————————————————————————————————————*/

const $notesPanel = $('[data-notes-panel]')
const $emptyNotes = $('[data-empty-notes]')
const $addNewNote = $('.note--add__new')

/**
 * Utils ☼————————————————————————————————————————————————————————
 */

const $BTN_sidebarToggler = $$('[data-sidebar-toggler]')
const $BTN_sidebarToggle = $('[data-sidebar] [data-sidebar-toggler]')

function addEventOnElements(elements, eventType, callback) {
    elements.forEach(element => element.addEventListener(eventType, callback));
}

addEventOnElements($BTN_sidebarToggler, 'click', () => {
    $sidebar.classList.toggle('active');
    $sidebarOverlay.classList.toggle('active');

    const isActive = $sidebar.classList.contains('active');
    
    if(!isActive)
        $BTN_sidebarToggle.setAttribute('disabled', true);
    else if (isActive)
        $BTN_sidebarToggle.removeAttribute('disabled');

    $sidebarOverlay.addEventListener('click', () => {
        HideSidebar();
    });
});

function SidebarActiveElement (item) {
    const $sidebarItems = $$('[data-item-notebook]');
    $sidebarItems.forEach((element) => {
        element.classList.remove('active');
    } );
    item.classList.add('active');
}

function HideSidebar () {
    $sidebar.classList.remove('active');
    $sidebarOverlay.classList.remove('active');
}

function TitleOfActiveElement (name) {
    $headerTitle.textContent = name
}

function DisableFeatures () {
    $BTN_editNotebook_Title.style.display = 'none';
    $BTN_Note_Add.style.display = 'none';
}

function EnableFeatures () {
    $BTN_editNotebook_Title.style.display = 'flex';
    $BTN_Note_Add.style.display = 'flex';
}

function getRelativeTime(ms) {

    const currentTime = new Date().getTime();

    const minute = Math.floor((currentTime - ms) / 1000 / 60)
    const hour = Math.floor(minute / 60);
    const day = Math.floor(hour / 24);

    return minute < 1 ? 'Ahora' : minute === 1 
        ? `Hace un minuto` : minute < 60 
        ? `Hace ${minute} minutos` : hour === 1 
        ? `Hace una hora` : hour < 24 
        ? `Hace ${hour} horas` : day === 1 
        ? `Ayer` : `Hace ${day} días`;
}

/**
 * Client ☼———————————————————————————————————————————————————————
 */

DisableFeatures()

const client = {

    notebook: {
        create(notebookData) {
            const $navItem = NavItem(notebookData.id, notebookData.name);
            $sidebarNavbar.appendChild($navItem);
            SidebarActiveElement($navItem);
        },

        read(notebookList) {
            notebookList.forEach((notebookData, index) => {
                const $navItem = NavItem(notebookData.id, notebookData.name);
                $sidebarNavbar.appendChild($navItem);

                if( index === 0) {
                    SidebarActiveElement($navItem);
                    $headerTitle.textContent = notebookData.name
                }
            })
        },

        delete(notebookId) {
            notebookId.remove();
        }
    },
    note: {
        create(noteData) {
            const $cardItem = CardItem(noteData)
            const $BTN_addNewNote = $('.note--add__new');

            $notesPanel.insertBefore($cardItem, $BTN_addNewNote)
        },

        read(noteList) {
            if( noteList.length > 0 ){
                $notesPanel.innerHTML = '';
                $notesPanel.appendChild($addNewNote);
                $emptyNotes.classList.remove('active');
                
                noteList.forEach((note) => {
                    const $cardItem = CardItem(note);
                    const $BTN_addNewNote = $('.note--add__new');
                    $notesPanel.insertBefore($cardItem, $BTN_addNewNote)
                });
            } else {
                $notesPanel.innerHTML = '';
                $notesPanel.appendChild($addNewNote);
                $emptyNotes.classList.add('active');
            }
            // Aplicar un evento al btn de eliminar nota
        }
    }
}

/**
 * NavItem ☼————————————————————————————————————————————————————————
 */

const NavItem = function (id, name) {
    const MenuItem = document.createElement('div')
    MenuItem.classList.add('navbar__item')
    MenuItem.setAttribute('data-item-notebook', id)
    MenuItem.innerHTML = /*HTML*/`
        <h3 class="navbar__item--title" data-notebook-title>${name}</h3>
        <nav class="navbar__item--btn">
            <button title="Eliminar" data-notebook-delete>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5m1.447 11v-6m5 6v-6" color="currentColor" />
                </svg>
            </button>
        </nav>
    `;
    
    EnableFeatures()

    MenuItem.addEventListener('click', () => {
        SidebarActiveElement(MenuItem);
        $headerTitle.textContent = MenuItem.textContent
        $headerTitle.removeAttribute('contenteditable');
        HideSidebar();
        EnableFeatures()

        const noteList = db.get.note(id);
        client.note.read(noteList);
    });

    const $BTN_deleteNotebook = MenuItem.querySelector('[data-notebook-delete]')

    $BTN_deleteNotebook.addEventListener('click', () => {
        // db.delete.notebook(id);
        modal.notebookDel.Activated()
        $modalNotebook_Title.textContent = name;
        MenuItem.setAttribute('delete', '');
    });

    return MenuItem;
}

/**
 * Header Title ☼————————————————————————————————————————————————————————
 */

$BTN_editNotebook_Title.addEventListener('click', () => {
    $headerTitle.setAttribute('contenteditable', '');
    $headerTitle.focus();
})

$headerTitle.addEventListener('keydown', (event) => {

    if( event.key === 'Enter') {
        $headerTitle.removeAttribute('contenteditable');
        
        let MenuItemTitle = $('.active[data-item-notebook] > [data-notebook-title]');
        let MenuItemId = $('.active[data-item-notebook]');
        
        let name = $headerTitle.textContent.toString().trim();
        let id = MenuItemId.getAttribute('data-item-notebook');
        
        MenuItemTitle.textContent = name
        const updateNotebookData = db.update.notebook(id, name);
    }
})

/**
 * CardItem ☼————————————————————————————————————————————————————————
 */

const CardItem = function (noteData) {

    const { id, title, text, postedOn, notebookId } = noteData;

    const CardItem = document.createElement('div')
    CardItem.classList.add('note');
    CardItem.setAttribute('data-item-note', id)
    CardItem.innerHTML = /*HTML*/`
        <header>
            <h3 data-note-title>${title}</h3>
        </header>
        <p>${text}</p>
        <footer>
            <span class="date">${getRelativeTime(postedOn)}</span>
            <nav class="note__item--btn">
                <button title="Eliminar" data-note-delete >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5m1.447 11v-6m5 6v-6" color="currentColor" />
                    </svg>
                </button>
            </nav>
        </footer>
    `;

    return CardItem;
}

/**
 * DB Utils ☼—————————————————————————————————————————————————————
 */

function RenderExistedNotebook () {
    const/*:array*/ notebookList = db.get.notebook();
    client.notebook.read(notebookList);
}

RenderExistedNotebook();

function RenderExistedNote () {
    const $ActiveElement = $('[data-item-notebook].active');
    const id = $ActiveElement.getAttribute('data-item-notebook');

    if (id) {
        const noteList = db.get.note(id);
        client.note.read(noteList);
    }
};

RenderExistedNote ()

export function findNotebook (db, notebookId) {
    return db.notebooks.find(notebook => notebook.id === notebookId);
}

export function findNotebookIndex(db, notebookId) {
    return db.notebooks.findIndex(item => item.id === notebookId);
}

/**
 * Modal ☼——————————————————————————————————————————————————————
 */

const modal = {

    notebookAdd: {
        Activated() {
            $mainOverlay.classList.add('active');
            $modal.classList.add('open');
            $modalNotebook_Add.classList.add('visible');
        },
        Deactivated() {
            $mainOverlay.classList.remove('active');
            $modal.classList.remove('open');
            $modalNotebook_Add.classList.remove('visible');
            $INP_modalNotebook_Title.value = ''
        }
    },

    notebookDel: {
        Activated() {
            $mainOverlay.classList.add('active');
            $modal.classList.add('open');
            $modalNotebook_Delete.classList.add('visible');
        },
        Deactivated() {
            $mainOverlay.classList.remove('active');
            $modal.classList.remove('open');
            $modalNotebook_Delete.classList.remove('visible');
        }
    },

    noteAdd: {
        Activated() {
            $mainOverlay.classList.add('active');
            $modal.classList.add('open');
            $modalNote_Add.classList.add('visible');
        },
        Deactivated() {
            $mainOverlay.classList.remove('active');
            $modal.classList.remove('open');
            $modalNote_Add.classList.remove('visible');
            $INP_modalNote_Title.value = ''
            $INP_modalNote_Content.value = ''
        }
    },

    noteDel: {

    }
};

/**
 * Modal > Create Notebook ☼——————————————————————————————————————————————————————
 */

$BTN_Notebook_Add.addEventListener('click', () => {
    modal.notebookAdd.Activated();
    $INP_modalNotebook_Title.focus();
    $modalNotebook_Add.addEventListener('keydown', PushEnterNotebook);
    $modalNotebook_Add.addEventListener('keydown', PushEscapeNotebook);
});

$BTN_modalNotebook_Confirm.addEventListener('click', () => {
    const NameNewNotebook = $INP_modalNotebook_Title.value
    CreateNewNotebook(NameNewNotebook);
    modal.notebookAdd.Deactivated();
    
    $notesPanel.innerHTML = '';
    $notesPanel.appendChild($addNewNote);
    $emptyNotes.classList.add('active');
});

$BTN_modalNotebook_Cancel.addEventListener('click', () => {
    modal.notebookAdd.Deactivated();
});

function CreateNewNotebook (name) {
    if( name.length === 0 ){
        name = 'Untitled'
    }
    const notebookData = db.post.notebook(name);
    client.notebook.create(notebookData);
    TitleOfActiveElement(name);
}

function PushEnterNotebook (event) {
    if (event.key === 'Enter') {
        const NameNewNotebook = $INP_modalNotebook_Title.value
        CreateNewNotebook(NameNewNotebook);
        modal.notebookAdd.Deactivated();
        
        $notesPanel.innerHTML = '';
        $notesPanel.appendChild($addNewNote);
        $emptyNotes.classList.add('active');
    }
}

function PushEscapeNotebook (event) {
    if (event.key === 'Escape') {
        modal.notebookAdd.Deactivated();
    }
}

/**
 * Modal > Drop Notebook ☼——————————————————————————————————————————————————————
 */

$BTN_modalNotebookDelete_Cancel.addEventListener('click', () => {
    const $sidebarNavbar_items = $$('[data-sidebar-navbar] [data-item-notebook]');
    $sidebarNavbar_items.forEach((item)=> {
        item.removeAttribute('delete');
    })
    modal.notebookDel.Deactivated();
});

$BTN_modalNotebookDelete_Confirm.addEventListener('click', () => {
    const $itemToDelete = $('[data-sidebar-navbar] [data-item-notebook][delete]');
    const id = $itemToDelete.getAttribute('data-item-notebook');
    db.delete.notebook(id);
    client.notebook.delete($itemToDelete)
    $headerTitle.textContent = "Notebook app"
    modal.notebookDel.Deactivated();
    DisableFeatures()

    $notesPanel.innerHTML = '';
    $emptyNotes.classList.remove('active');
})

/**
 * Modal > Create Notes ☼————————————————————————————————————————————————————————
 */

    /**
     * 1. Obtener la referencia de los elementos asignado a las variables [✔]
     * 2. Crear métodos para activar y desactivar la modal [✔]
     * 3. El botón para agregar una nueva nota, con un click hace aparecer la modal [✔]
     * 4. El botón de Cancelar en la modal debe cerrar la modal y limpiar los inputs [✔]
     * 6. Los inputs de la modal tendrán una opción de cerrar la modal en caso de que el usuario pulse 'Esc' [✔]
     * 7. 🟡 Solo el input de Titulo escuchará la pulsación de Enter para guardar la nota []
     * 8. Los valores por defecto de los inputs son 'Untitle' para el título y ' ' para el texto interior [✔]
     * 9. El boton de Guardar en la modal debe obtener el ID del elemento con la clase 'Active' y guardar los datos al espacio correspondiente [✔]
     */

$BTN_Note_Add.addEventListener('click', () => {
    modal.noteAdd.Activated()
    $INP_modalNote_Title.addEventListener('keydown', PushEnterNote);
    $modalNote_Add.addEventListener('keydown', PushEscapeNote);
});

$BTN_modalNote_Cancel.addEventListener('click', () => {
    modal.noteAdd.Deactivated()
});

$BTN_modalNote_Confirm.addEventListener('click', () => {
    CreateNewNote ()
    modal.noteAdd.Deactivated()
})

function CreateNewNote () {
    
    const $ActiveElement = $('[data-item-notebook].active');
    const id = $ActiveElement.getAttribute('data-item-notebook');
    
    let NoteTitle = $INP_modalNote_Title.value;
    let NoteContent = $INP_modalNote_Content.value;
    
    if( NoteTitle.length === 0 ){
        NoteTitle = 'Untitled'
    }

    if( NoteContent.length === 0 ){
        NoteContent = ''
    }

    const noteObj = {
        title: NoteTitle,
        text: NoteContent
    }

    const noteData = db.post.note(id, noteObj);
    client.note.create(noteData);
}

function PushEnterNote (event) {
    if (event.key === 'Enter') {
        CreateNewNote();
        modal.noteAdd.Deactivated()
    }
}

function PushEscapeNote (event) {
    if (event.key === 'Escape') {
        modal.noteAdd.Deactivated()
    }
}