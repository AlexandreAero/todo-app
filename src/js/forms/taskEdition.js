/**
 * The task edition form allows the user to edit a specific task
 * from a list with this interface.
 */
class TaskEditionForm extends Form {
    constructor(dom, listContainer) {
        super(dom, listContainer);

        this.saveButton = document.getElementById('save-task-button');
        this.taskName = document.getElementById('task-detail-name');
        this.taskDate = document.getElementById('task-detail-date');
        this.taskContent = document.getElementById('task-detail-content');

        this.bindEventListeners();
    }
    
    show(list, task) {
        super.show(false);

        this.list = list;
        this.task = task;

        this.taskName.innerHTML = this.task.name;
        this.taskDate.innerHTML = this.task.date;
        this.taskContent.value = this.task.content;
    }

    bindEventListeners() {
        this.saveButton.addEventListener('click', () => {
            this.saveChanges();
            super.hide();
        });

        this.taskName.addEventListener('click', () => {
            this.taskName.contentEditable = true;
            this.taskName.focus(); 
        });
         
        this.taskDate.addEventListener('click', () => {
            this.taskDate.contentEditable = true;
            this.taskDate.focus();
        });
    }

    saveChanges() {
        if (this.task && this.list) {
            this.task.name = this.taskName.innerHTML;
            this.task.date = this.taskDate.innerHTML;
            this.task.content = this.taskContent.value;
        
            this.list.saveInLocalStorage();
            this.list.render();
        } else {
            throw new Error('Trying to save data on a null list or task.');
        }
    }
}

const taskEditionFormDOM = document.getElementById('task-detail');
const taskEditionForm = new TaskEditionForm(taskEditionFormDOM, listContainer);
