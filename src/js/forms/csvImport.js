const listContainer = document.getElementById('list-container');

const csvImportForm = document.getElementById('csv-import-form');
const closeCSVImportFormButton = document.getElementById('close-csv-import-form-button');
const loadCSVImportFormButton = document.getElementById('load-csv-button');

/**
 * Shows the CSV import form.
 */
function showCSVImportForm() {
    listContainer.classList.add('blurred');
    csvImportForm.classList.remove('hidden');
}

/**
 * Hides the CSV import form.
 */
function hideCSVImportForm() {
    listContainer.classList.remove('blurred');
    csvImportForm.classList.add('hidden');
}

closeCSVImportFormButton.addEventListener('click', hideCSVImportForm);

loadCSVImportFormButton.addEventListener('click', () => {
    const textArea = document.getElementById('csv-import-form-input-text');
    firstList.loadFromCSV(textArea.value);
    hideCSVImportForm();
});
