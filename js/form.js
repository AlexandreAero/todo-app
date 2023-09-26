const listCreationForm = document.getElementById('list-creation-form');
const taskCreationForm = document.getElementById('task-creation-form');
const csvForm = document.getElementById('csv-import-form');

/**
 * Shows the CSV import form.
 */
function showCSVImportForm() {
    csvForm.classList.toggle('hidden');
}

document.getElementById('load-csv-button').addEventListener('click', () => {
    const textArea = document.getElementById('csv-import-form-input-text');
    firstList.loadFromCSV(textArea.value);
});

/**
 * Returns a random task based on predefined names.
 */
function getRandomTaskName() {
    const possibleNames = [
        'Do morning exercices',
        'Prepare healthy breakfast',
        'Plan my day',
        'Study computer science',
        'Water plants',
        'Go out with my dog'
    ];

    const randomIndex = Math.floor(Math.random() * possibleNames.length);
    return possibleNames[randomIndex];
}
