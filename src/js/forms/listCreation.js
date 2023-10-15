/**
 * The list creation form allows the user to create
 * a new list from this interface.
 */
class ListCreationForm extends Form {
    constructor(dom, listContainer) {
        super(dom, listContainer);
        this.bindEventListeners();
    }

    bindEventListeners() {
        const createNewListButton = document.getElementById('create-new-list-button');
        const listName = document.getElementById('list-name-input');
        const confirmCreation = document.getElementById('list-form-confirm-creation');
        const closeButton = document.getElementById('close-list-creation-form-button');

        createNewListButton.addEventListener('click', () => {
            super.show(true);
        });

        closeButton.addEventListener('click', () => {
            super.hide();
        });

        confirmCreation.addEventListener('click', () => {     
            const newListName = listName.value;
            const list = new List(newListName);
            list.saveInLocalStorage();
            super.hide();
        });
    }
}

const listCreationFormDOM = document.getElementById('list-creation-form');
const listCreationForm = new ListCreationForm(listCreationFormDOM, listContainer);
