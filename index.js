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

const $BTN_notebookAdd = $('[data-notebook-add]');
const $modalContainer = $('[data-modal]');
const $modalNotebookAdd = $('[data-modal-notebook]');
const $BTN_modalNotebookCancel = $('[data-modal-notebook] [data-notebook-cancel]');
const $BTN_modalNoteAdd = $('[data-note-add]');
const $modalNoteAdd = $('[data-modal-note]');
const $BTN_modalNoteCancel = $('[data-modal-note] [data-note-cancel]');

const $INP_modalNotebookTitle = $('[data-modal-notebook] [data-notebook-title]');
const $BTN_modalNotebookConfirm = $('[data-notebook-add-confirm]')

/*
function addEventOnElements(elements, eventType, callback) {
    elements.forEach(element => element.addEventListener(eventType, callback));
}

addEventOnElements($sidebarTogglers, 'click', function(){
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
})
*/

/* 💛 Elementos HTML de la App 💛
 * [data-sidebar]           El menú lateral izquierdo
 * [data-sidebar-toggler]   (btn) El toggler del menú lateral
 * [data-sidebar-navbar]    La lista de Notebooks creados
 * [data-item-notebook] 	Item de la lista de Notebooks
 * [data-notebook-edit]     (btn) Editar el titulo de un item de la lista de Notebooks
 * [data-notebook-delete]   (btn) Eliminar un item de la lista de Notebooks
 * [data-sidebar-overlay]   Overlay pantalla oscura detrás del menú
 * [data-main-overlay]      Overlay pantalla oscura detras de las modales
 * [data-header-title]      (h1) Título del header principal
 * [data-theme-switch]      (checkbox) Toggler de prefers color scheme
 * [data-notes-panel]       Área donde se renderizan todas las Notas de un Notebook
 * [data-note-delete]       (btn) Funcion para eliminar una Nota de un Notebook
 * [data-note-add]          (btn) Funcion para agregar una nueva Nota al principio de Notebooks
 * [data-empty-notes]       Icono que aparece cuando no hay notas en un Notebook
 * [data-modal]             El padre de las modales
 */



window.addEventListener("resize", ()=> {
    if(window.innerWidth > 900) {
        $sidebarMenu.classList.remove('active');
        $sidebarOverlay.classList.remove('active');
    }
});

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

    // if(screenWidth900.matches) {
    //     sidebarOverlay.classList.toggle('active');
    //     btnSidebarToggle.disabled.toggle;
    // }

    // if(sidebarMenu.classList.contains('active')){
    //     console.log("El menu tiene la clase [active] ");
    //     btnSidebarToggle.removeAttribute('disable')
    // }
    // else {
    // }
});

/**
 * Funcionalidad del Sidebar para eliminar un Notebook (Espacio o Archivo)
 */




/**
 * Funcionalidad del Sidebar para crear un nuevo Notebook (Espacio o Archivo)
 */

function ModalNotebookAddActivated() {
    $viewportOverlay.classList.add('active');
    $modalContainer.classList.add('open');
    $modalNotebookAdd.classList.add('visible');
}

function ModalNotebookAddDeactivated() {
    $viewportOverlay.classList.remove('active');
    $modalContainer.classList.remove('open');
    $modalNotebookAdd.classList.remove('visible');
};

function CreateNewNotebook(name) {
    if( name.length == 0 ){
        name = 'Untitled'
    }

    const MenuItem = document.createElement('div');
    MenuItem.classList.add('navbar__item')
    MenuItem.setAttribute('data-item-notebook', '')
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

    $sidebarMenuList.appendChild(MenuItem);
    ActiveMenuItem(MenuItem);
    // Almacenar en base de datos
    StoreNewNotebook(name)
}

function StoreNewNotebook (name) {
    const notebookData = db.post.notebook(name);
        
}

function ActiveMenuItem(item) {
    
    const $sidebarMenuItems = $$('[data-item-notebook]');
    
    $sidebarMenuItems.forEach((element) => {
        element.classList.remove('active');
    } )    
    
    item.classList.add('active');
}

function PushEnterNotebook(event) {
    if (event.key === 'Enter') {
        const nameNotebook = $INP_modalNotebookTitle.value;
        CreateNewNotebook(nameNotebook);
        
        ModalNotebookAddDeactivated();
        $INP_modalNotebookTitle.value = '';

    }
}

function PushEscapeNotebook(event) {
    if (event.key === 'Escape') {
        ModalNotebookAddDeactivated();
        $INP_modalNotebookTitle.value = '';
    }
}

$BTN_notebookAdd.addEventListener('click', () => {
    ModalNotebookAddActivated();
    $INP_modalNotebookTitle.focus();

    const nameNotebook = $INP_modalNotebookTitle.value;
    
    $INP_modalNotebookTitle.addEventListener('keydown', PushEnterNotebook);
    $INP_modalNotebookTitle.addEventListener('keydown', PushEscapeNotebook);
});

$BTN_modalNotebookCancel.addEventListener('click', () => {
    ModalNotebookAddDeactivated();
    $INP_modalNotebookTitle.value = '';
});

$BTN_modalNotebookConfirm.addEventListener('click', () => {

    const nameNotebook = $INP_modalNotebookTitle.value;
    CreateNewNotebook(nameNotebook);

    $INP_modalNotebookTitle.value = '';
    ModalNotebookAddDeactivated();
})


/**
 * Crear una nueva nota
 */

function ModalNoteAddActivated() {
    $viewportOverlay.classList.add('active');
    $modalContainer.classList.add('open');
    $modalNoteAdd.classList.add('visible');
};

function ModalNoteAddDeactivated() {
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