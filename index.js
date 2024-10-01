'use strict'

import './app/theme.js';

const $ = element => document.querySelector(element)
const $$ = elements => document.querySelectorAll(elements)

const sidebarMenu /*Barra Menu*/ = $('[data-sidebar]');
const sidebarToggler = $$('[data-sidebar-toggler]');
const sidebarOverlay = $('[data-sidebar-overlay]');


const screenWidthMayor = window.matchMedia('(width > 900px)');
const screenWidth900 = window.matchMedia('(max-width: 900px)');
const screenWidth600 = window.matchMedia('(max-width: 600px)');
const screenWidth400 = window.matchMedia('(max-width: 400px)');


// if (screenWidth.matches) {
//   MENU_TOGGLE.checked = true;
// } else {
//   MENU_TOGGLE.removeAttribute("checked");
// }

/*
function addEventOnElements(elements, eventType, callback) {
    elements.forEach(element => element.addEventListener(eventType, callback));
}

addEventOnElements(sidebarTogglers, 'click', function(){
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
 */


/**
 * Crear un evento que escuche los cambios del tamaño del viewport y cuando sea mayor a 900px se ejecute una cunción
 * La función deberá retirar el nombre de la clase "active" del SidebarMenu y sidebarOverlay
 */
if(screenWidthMayor.matches){
    console.log("la pantalla es mayor de 900px")
}

function addEventOnElements(elements, eventType, callback) {
    elements.forEach(element => element.addEventListener(eventType, callback));
}

addEventOnElements(sidebarToggler, 'click', ()=> {
    sidebarMenu.classList.toggle('active');

    if(screenWidth900.matches) {
        sidebarOverlay.classList.toggle('active');
    }
});

sidebarOverlay.addEventListener('click', () => {
    sidebarMenu.classList.toggle('active');
    sidebarOverlay.classList.remove('active');
})
