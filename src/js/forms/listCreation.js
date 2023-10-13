class ListCreationForm extends Form {
    constructor(dom, listContainer) {
        super(dom, listContainer); 

        this.createNewListButton = document.getElementById('create-new-list-button');
        this.listName = document.getElementById('list-name-input');
        this.confirmCreation = document.getElementById('list-form-confirm-creation');
        this.closeButton = document.getElementById('close-list-creation-form-button');

        this.bindEventListeners();
    }

    bindEventListeners() {
        this.createNewListButton.addEventListener('click', () => {
            super.show(true);
        });

        this.closeButton.addEventListener('click', () => {
            this.hide();
        });

        this.confirmCreation.addEventListener('click', () => {     
            const newListName = this.listName.value;
            const list = new List(newListName);
            list.saveInLocalStorage();
            this.hide();
        });
    }
}

const listCreationFormDOM = document.getElementById('list-creation-form');
const listCreationForm = new ListCreationForm(listCreationFormDOM, listContainer);
