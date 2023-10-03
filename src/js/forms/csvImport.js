class CSVImportForm extends Form {
    constructor(dom, listContainer) {
        super(dom, listContainer);
        this.bindEventListeners();
    }

    bindEventListeners() {
        const closeButton = document.getElementById('close-csv-import-form-button');
        const loadButton = document.getElementById('load-csv-button');

        closeButton.addEventListener('click', () => super.hide());
        loadButton.addEventListener('click', () => {
            const textArea = document.getElementById('csv-import-form-input-text');
            firstList.loadFromCSV(textArea.value);
            super.hide();
        });
    }
}

const listContainer = document.getElementById('list-container');
const csvImportFormDOM = document.getElementById('csv-import-form');

const csvImportForm = new CSVImportForm(csvImportFormDOM, listContainer);
