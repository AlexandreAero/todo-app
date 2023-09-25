const createNewListButton = document.getElementById('open-list-form-button');

const listCreationForm = document.getElementsByClassName('list-creation-form')[0];
const taskCreationForm = document.getElementsByClassName('task-creation-form')[0];

createNewListButton.addEventListener('click', showListForm);

/**
 * 
 */
function showListForm() {
    const confirmListCreationButton = document.getElementById('list-form-confirm-creation');
    confirmListCreationButton.addEventListener('click', () => {
        // Hide list form
        // Create new list
    });
}

/**
 * 
 */
function showTaskForm() {
    const taskNameInput = document.getElementsByName('task-name-input')[0];
    taskNameInput.placeholder = getRandomTaskName();

    // create task from selected list

    // hide task form when confirmed task creation
}

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
