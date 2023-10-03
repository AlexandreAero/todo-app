const listContainer = document.getElementById('list-container');

const csvImportFormDOM = document.getElementById('csv-import-form');
const closeCSVImportFormButton = document.getElementById('close-csv-import-form-button');
const loadCSVImportFormButton = document.getElementById('load-csv-button');

const csvImportForm = new Form(csvImportFormDOM, listContainer);

closeCSVImportFormButton.addEventListener('click', () => csvImportForm.hide());

loadCSVImportFormButton.addEventListener('click', () => {
    const textArea = document.getElementById('csv-import-form-input-text');
    firstList.loadFromCSV(textArea.value);
    csvImportForm.hide();
});
