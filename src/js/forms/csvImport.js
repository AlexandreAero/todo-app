/**
 * The CSV import form allows the user to create lists from a raw
 * and valid CSV string from this interface.
 */
class CSVImportForm extends Form {
    constructor(dom, listContainer) {
        super(dom, listContainer);
        this.bindEventListeners();
    }

    show(list) {
        super.show(true);
        this.list = list;
    }

    bindEventListeners() {
        const closeButton = document.getElementById('close-csv-import-form-button');
        const loadButton = document.getElementById('load-csv-button');

        closeButton.addEventListener('click', () => super.hide());
        
        loadButton.addEventListener('click', () => {
            const textArea = document.getElementById('csv-import-form-input-text');
            this.list.loadFromCSV(textArea.value);
            super.hide();
            textArea.value = '';
        });
    }
}

const listContainer = document.getElementById('list-container');
const csvImportFormDOM = document.getElementById('csv-import-form');

const csvImportForm = new CSVImportForm(csvImportFormDOM, listContainer);
