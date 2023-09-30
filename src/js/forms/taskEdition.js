const taskEditionForm = document.getElementById('task-detail');

// const editTaskButton = document.getElementById('edit-task-button');
const saveTaskButton = document.getElementById('save-task-button');

const taskDetailName = document.getElementById('task-detail-name');
const taskDetailDate = document.getElementById('task-detail-date');
const taskDetailContent = document.getElementById('task-detail-content');

let targetList = null;
let targetTask = null;

/**
 * Shows the task edition form.
 * @param {List} list - the list where the task is located.
 * @param {Task} task - the task to make changes on.
 */
function showTaskEditionForm(list, task) {
    taskEditionForm.classList.remove('hidden');

    // Populate labels
    taskDetailName.innerHTML = task.name;
    taskDetailDate.innerHTML = task.date;
    taskDetailContent.value = task.content;
    
    targetList = list;
    targetTask = task;
}

/**
 * Hides the task edition form.
 */
function hideTaskEditionForm() {
    taskEditionForm.classList.add('hidden');
}

/**
 * Modifies the ``task`` object to reflect the changes
 * made with the edition form.
 */
function saveChanges() {
    if (targetTask && targetList) {
        targetTask.name = taskDetailName.innerHTML;
        targetTask.date = taskDetailDate.innerHTML;
        targetTask.content = taskDetailContent.value;
    
        targetList.saveInLocalStorage();
        targetList.render();
    } else {
        throw new Error('Trying to save data on a null list');
    }
}

saveTaskButton.addEventListener('click', () => {
    saveChanges();
    hideTaskEditionForm();
});

taskDetailName.addEventListener('click', () => {
   taskDetailName.contentEditable = true;
   taskDetailName.focus(); 
});

taskDetailDate.addEventListener('click', () => {
    taskDetailDate.contentEditable = true;
    taskDetailDate.focus();
});
