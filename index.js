'use strict'

import './app/theme.js';

const $ = element => document.querySelector(element)
const $$ = elements => document.querySelectorAll(elements)

const $sidebarMenu /*Barra Menu*/ = $('[data-sidebar]');
const $BTN_sidebarToggler = $$('[data-sidebar-toggler]');
const $BTN_sidebarToggle = $('[data-sidebar] [data-sidebar-toggler]')
const $sidebarOverlay = $('[data-sidebar-overlay]');
const $viewportOverlay = $('[data-main-overlay]');

const $BTN_notebookAdd = $('[data-notebook-add]');
const $modalContainer = $('[data-modal]');
const $modalNotebookAdd = $('[data-modal-notebook]');
const $BTN_modalNotebookCancel = $('[data-modal-notebook] [data-notebook-cancel]');
const $BTN_modalNoteAdd = $('[data-note-add]');
const $modalNoteAdd = $('[data-modal-note]');
const $BTN_modalNoteCancel = $('[data-modal-note] [data-note-cancel]');

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

    let classActive = $sidebarMenu.classList.contains('active');
    
    if(!classActive)
        $BTN_sidebarToggle.disabled = true;
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

$BTN_notebookAdd.addEventListener('click', () => {
    ModalNotebookAddActivated();
});

$BTN_modalNotebookCancel.addEventListener('click', () => {
    ModalNotebookAddDeactivated();
});

$BTN_modalNoteAdd.addEventListener('click', () => {
    ModalNoteAddActivated();
});

$BTN_modalNoteCancel.addEventListener('click', () => {
    ModalNoteAddDeactivated();
});