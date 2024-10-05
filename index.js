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
const $BTN_NoteAdd = $('[data-note-add]')
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
const $BTN_modalNoteCancel = $('[data-modal-note] [data-note-cancel]')

/*————— Buttons Element ————————————————————————————————————————*/




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

function HideSidebar () {
    $sidebar.classList.remove('active');
    $sidebarOverlay.classList.remove('active');
}

function TitleOfActiveElement (name) {
    $headerTitle.textContent = name
}

function DisableFeatures () {
    $BTN_editNotebook_Title.style.display = 'none';
    $BTN_NoteAdd.style.display = 'none';
}

function EnableFeatures () {
    $BTN_editNotebook_Title.style.display = 'flex';
    $BTN_NoteAdd.style.display = 'flex';
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
            // SidebarActiveElement($navItem);
        },

        read(notebookList) {
            notebookList.forEach((notebookData, index) => {
                const $navItem = NavItem(notebookData.id, notebookData.name);
                $sidebarNavbar.appendChild($navItem);

                if( index === 0) {
                    // SidebarActiveElement($navItem);
                    $headerTitle.textContent = notebookData.name
                }
            })
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
        // SidebarActiveElement(MenuItem);
        $headerTitle.textContent = MenuItem.textContent
        $headerTitle.removeAttribute('contenteditable');
        HideSidebar();
        EnableFeatures()
    });


    // const $BTN_deleteNotebook = MenuItem.querySelector('[data-notebook-delete]')

    // $BTN_deleteNotebook.addEventListener('click', () => {
    //     modal.notebookDel.Activated()
    //     $modalNotebook_Title.textContent = name;
    // });

    // const btn = $('[data-notebook-delete-confirm]');

    // btn.addEventListener('click', () => {
    //     console.log(id)
    // });

    // $BTN_modalNotebookDelete_Confirm.addEventListener('click', () => {
    //     // db.delete.notebook(id);
    //     modal.notebookDel.Deactivated()
    // });


    const $BTN_deleteNotebook = MenuItem.querySelector('[data-notebook-delete]')

    $BTN_deleteNotebook.addEventListener('click', () => {
        // db.delete.notebook(id);
        modal.notebookDel.Activated()
        $modalNotebook_Title.textContent = name;
        MenuItem.setAttribute('delete', '');
    });

    return MenuItem;
}

function SidebarActiveElement (item) {
    const $sidebarItems = $$('[data-item-notebook]');
    $sidebarItems.forEach((element) => {
        element.classList.remove('active');
    } );
    item.classList.add('active');
}

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

function EliminarNotebook (id) {

    const $sidebarItems = $$('[data-item-notebook]');
    $sidebarItems.forEach((element) => {
        let name = $('[data-notebook-title').value
        
        let btnDelete = $('[data-notebook-delete]');
        
        btnDelete.addEventListener('click', () => {
            console.log(id)
        });
        
    } );
    

}


// function EliminarNotebook () {
//     const $BTN_deleteNotebook = $sidebarNavbar.querySelectorAll('[data-notebook-delete]')

//     $BTN_deleteNotebook.forEach((element) => {
//         element.addEventListener('click', () => {
//             ModalNotebookDeleteActivated();
//             let Nombre = $modalNotebook_Delete.querySelector('[data-notebook-title]');
//             let MenuItemTitle = $('[data-notebook-title]');
//             Nombre.textContent = MenuItemTitle;
//             let id = element.getAttribute('data-item-notebook')

//             const $BTN_modalNotebookDeleteConfirm = $('[data-notebook-delete-confirm]')
//             $BTN_modalNotebookDeleteConfirm.addEventListener('click', () => {
//                 console.log(`Se acaba de eliminar  [${MenuItemTitle} , id:${id}] `);
//                 ModalNotebookDeleteDeactivated();
//                 db.delete.notebook(id);
//                 element.remove();
//             })
//         })
//     })
// }




/**
 * DB Utils ☼—————————————————————————————————————————————————————
 */

RenderExistedNotebook();

function RenderExistedNotebook () {
    const/*:array*/ notebookList = db.get.notebook();
    client.notebook.read(notebookList);
}

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
        }
    },

    noteDel: {

    }
};

/**
 * Modal > Create Notebook ☼——————————————————————————————————————————————————————
 */

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
    }
}

function PushEscapeNotebook (event) {
    if (event.key === 'Escape') {
        modal.notebookAdd.Deactivated();
    }
}

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
});

$BTN_modalNotebook_Cancel.addEventListener('click', () => {
    modal.notebookAdd.Deactivated();
});

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
    const $itemToDelete = $('[data-sidebar-navbar] [delete]');
    let id = $itemToDelete.getAttribute('data-item-notebook');
    db.delete.notebook(id);
    $itemToDelete.remove();
    $headerTitle.textContent = "Notebook app"
    modal.notebookDel.Deactivated();
    DisableFeatures()
})

/**
 * Modal > Create Notes ☼————————————————————————————————————————————————————————
 */

$BTN_NoteAdd.addEventListener('click', () => {
    modal.noteAdd.Activated()
});

$BTN_modalNoteCancel.addEventListener('click', () => {
    modal.noteAdd.Deactivated()
});
