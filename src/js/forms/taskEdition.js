const taskEditionFormDOM = document.getElementById('task-detail');

// const editTaskButton = document.getElementById('edit-task-button');
const saveTaskButton = document.getElementById('save-task-button');

const taskDetailName = document.getElementById('task-detail-name');
const taskDetailDate = document.getElementById('task-detail-date');
const taskDetailContent = document.getElementById('task-detail-content');

const taskEditionForm = new Form(taskEditionFormDOM, listContainer);

let targetList = null;
let targetTask = null;

taskEditionForm.setOnOpenCallback(() => {
    taskDetailName.innerHTML = task.name;
    taskDetailDate.innerHTML = task.date;
    taskDetailContent.value = task.content;
    
    targetList = list;
    targetTask = task;
});

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
        throw new Error('Trying to save data on a null list/task.');
    }
}

saveTaskButton.addEventListener('click', () => {
    saveChanges();
    taskEditionForm.hide();
});

taskDetailName.addEventListener('click', () => {
   taskDetailName.contentEditable = true;
   taskDetailName.focus(); 
});

taskDetailDate.addEventListener('click', () => {
    taskDetailDate.contentEditable = true;
    taskDetailDate.focus();
});
