'use strict';

import './app/theme.js';
import { db } from './app/db.js';

const $ = element => document.querySelector(element)
const $$ = elements => document.querySelectorAll(elements)

const $sidebarMenu /*Barra Menu*/ = $('[data-sidebar]');
const $BTN_sidebarToggler = $$('[data-sidebar-toggler]');
const $BTN_sidebarToggle = $('[data-sidebar] [data-sidebar-toggler]')
const $sidebarMenuList /*Lista Menu*/ = $('[data-sidebar-navbar]');
const $sidebarOverlay = $('[data-sidebar-overlay]');
const $viewportOverlay = $('[data-main-overlay]');
const $headerTitle = $('[data-header-title]');
const $BTN_notebookAdd = $('[data-notebook-add]');
const $modalContainer = $('[data-modal]');
const $modalNotebookAdd = $('[data-modal-notebook]');
const $BTN_modalNotebookCancel = $('[data-modal-notebook] [data-notebook-cancel]');
const $BTN_modalNoteAdd = $('[data-note-add]');
const $modalNoteAdd = $('[data-modal-note]');
const $BTN_modalNoteCancel = $('[data-modal-note] [data-note-cancel]');
const $INP_modalNotebookTitle = $('[data-modal-notebook] [data-notebook-title]');
const $BTN_modalNotebookConfirm = $('[data-notebook-add-confirm]')

/**
 * Client ☼——————————————————————————————————————————————————————————————————————
 */

const client = {

    notebook: {
        create(notebookData) {
            const $navItem = NavItem(notebookData.id, notebookData.name);
            $sidebarMenuList.appendChild($navItem);
            ActiveMenuItem($navItem);
        },

        read(notebookList) {
            notebookList.forEach((notebookData, index) => {
                const $navItem = NavItem(notebookData.id, notebookData.name);
                $sidebarMenuList.appendChild($navItem);

                if( index === 0) {
                    ActiveMenuItem($navItem);
                    $headerTitle.textContent = notebookData.name;
                }
            })
        }
    }

}

const NavItem = function (id, name) {
    const MenuItem = document.createElement('div');
    MenuItem.classList.add('navbar__item')
    MenuItem.setAttribute('data-item-notebook', id)
    MenuItem.innerHTML = /*HTML*/`
        <h3 class="navbar__item--title" data-notebook-title>
            ${name}
        </h3>
        <nav class="navbar__item--btn">
            <button title="Eliminar" data-notebook-delete>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5m1.447 11v-6m5 6v-6" color="currentColor" />
                </svg>
            </button>
        </nav>
    `;

    // 💛 Agregar un evento ('click') para los Items del Sidebar + Cambia el titulo del Header + Renderizar las notas asociadas + Añadir la clase 'active' al item 
    

    return MenuItem;
}

/**
 * Utils ☼——————————————————————————————————————————————————————————————————————
 */

function addEventOnElements(elements, eventType, callback) {
    elements.forEach(element => element.addEventListener(eventType, callback));
}

addEventOnElements($BTN_sidebarToggler, 'click', ()=> {
    $sidebarMenu.classList.toggle('active');
    $sidebarOverlay.classList.toggle('active');

    const classActive = $sidebarMenu.classList.contains('active');
    
    if(!classActive)
        $BTN_sidebarToggle.setAttribute('disabled', true);
    else if (classActive)
        $BTN_sidebarToggle.removeAttribute('disabled')

    $sidebarOverlay.addEventListener('click', () => {
        $sidebarMenu.classList.remove('active');
        $sidebarOverlay.classList.remove('active');
    })
});

/**
 * Sidebar ☼——————————————————————————————————————————————————————————————————————
 */

$BTN_notebookAdd.addEventListener('click', () => {
    ModalNotebookAddActivated();
    $INP_modalNotebookTitle.focus();
    $INP_modalNotebookTitle.addEventListener('keydown', PushEnterNotebook);
    $INP_modalNotebookTitle.addEventListener('keydown', PushEscapeNotebook);
});

function ModalNotebookAddActivated () {
    $viewportOverlay.classList.add('active');
    $modalContainer.classList.add('open');
    $modalNotebookAdd.classList.add('visible');
}

function ModalNotebookAddDeactivated () {
    $viewportOverlay.classList.remove('active');
    $modalContainer.classList.remove('open');
    $modalNotebookAdd.classList.remove('visible');
};

function CreateNewNotebook (name) {
    if( name.length == 0 ){
        name = 'Untitled'
    }
    const notebookData = db.post.notebook(name);
    client.notebook.create(notebookData);
    AssignTitle(name);
}

function PushEscapeNotebook (event) {
    if (event.key === 'Escape') {
        CancelNotebookModal();
    }
}

function AssignTitle (name) {
    $headerTitle.textContent = name;
}

function ActiveMenuItem (MenuItem) {
    const $sidebarMenuItems = $$('[data-item-notebook]');
    $sidebarMenuItems.forEach((element) => {
        element.classList.remove('active');
    } );
    MenuItem.classList.add('active');
}

function CancelNotebookModal () {
    ModalNotebookAddDeactivated();
    $INP_modalNotebookTitle.value = '';
}

$BTN_modalNotebookConfirm.addEventListener('click', () => {

    const nameNewNotebook = $INP_modalNotebookTitle.value;
    CreateNewNotebook(nameNewNotebook);

    CancelNotebookModal();
})

function PushEnterNotebook (event) {
    if (event.key === 'Enter') {

        const nameNewNotebook = $INP_modalNotebookTitle.value;
        CreateNewNotebook(nameNewNotebook);

        CancelNotebookModal();
    }
}

$BTN_modalNotebookCancel.addEventListener('click', () => {
    CancelNotebookModal();
});

/**
 * Load sidebar LocalStorage ☼——————————————————————————————————————————————————
 */

function RenderExistedNotebook () {
    const/*:array*/ notebookList = db.get.notebook();
    client.notebook.read(notebookList);
}

RenderExistedNotebook();



/**
 * Notes ☼——————————————————————————————————————————————————————————————————————
 */

function ModalNoteAddActivated () {
    $viewportOverlay.classList.add('active');
    $modalContainer.classList.add('open');
    $modalNoteAdd.classList.add('visible');
};

function ModalNoteAddDeactivated () {
    $viewportOverlay.classList.remove('active');
    $modalContainer.classList.remove('open');
    $modalNoteAdd.classList.remove('visible');
};

$BTN_modalNoteAdd.addEventListener('click', () => {
    ModalNoteAddActivated();
});

$BTN_modalNoteCancel.addEventListener('click', () => {
    ModalNoteAddDeactivated();
});