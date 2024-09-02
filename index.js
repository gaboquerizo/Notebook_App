'use strict'

// data-sidebar ( sidebar menu )
// data-sidebar-toggler (boton cerrar sidebar)
// data-sidebar-overlay (fondo oscuro)

const $ = element => document.querySelector(element)
const $$ = elements => document.querySelectorAll(elements)

const sidebar = $('[data-sidebar]');
const sidebarTogglers = $$('[data-sidebar-toggler]');
const overlay = $('[data-sidebar-overlay]');

function addEventOnElements(elements, eventType, callback) {
    elements.forEach(element => element.addEventListener(eventType, callback));
}

addEventOnElements(sidebarTogglers, 'click', function(){
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
})