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

        this.targetList = list;
        this.targetTask = task;

        this.taskName.innerHTML = this.targetTask.name;
        this.taskDate.innerHTML = this.targetTask.date;
        this.taskContent.value = this.targetTask.content;
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
        if (this.targetTask && this.targetList) {
            this.targetTask.name = this.taskName.innerHTML;
            this.targetTask.date = this.taskDate.innerHTML;
            this.targetTask.content = this.taskContent.value;
        
            this.targetList.saveInLocalStorage();
            this.targetList.render();
        } else {
            throw new Error('Trying to save data on a null list/task.');
        }
    }
}

const taskEditionFormDOM = document.getElementById('task-detail');

const taskEditionForm = new TaskEditionForm(taskEditionFormDOM, listContainer);
