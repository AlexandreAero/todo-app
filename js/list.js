/**
 * A list contains the todo tasks. This object has methods
 * do manipulate the tasks contained in this list.
 */
class List {
    constructor(name) {
        this.name = name;
        this.taskObjects = [];
        this.tasksDOM = [];
        this.filteringTasks = false;
        this.orderingTasksByDueDate = false;
        this.localStorageKey = `todo-app-tasks-${this.name}`;

        this.initDOM();
        this.loadFromLocalStorage();
        this.bindEventListeners();
        this.render();
    }

    /**
     * Initialize the DOM element related to the list.
     */
    initDOM() {
        this.holder = document.getElementById('list-container');

        this.domParent = document.createElement('div');
        this.domHeader = document.createElement('div');
        this.domName = document.createElement('h2');
        this.domButtonParent = document.createElement('div');
        this.domDelete = document.createElement('input');
        this.domSaveCSV = document.createElement('input');
        this.domLoadCSV = document.createElement('input');
        this.domFilter = document.createElement('input');
        this.domNewTask = document.createElement('input');
        this.domFilterDate = document.createElement('input');

        this.domParent.className = 'list';
        this.domHeader.className = 'list-header';
        this.domName.className = 'list-header-name';
        this.domButtonParent.className = 'list-header-button-parent'
        this.domDelete.className = 'list-header-delete-button';
        this.domSaveCSV.className = 'list-header-save-as-csv-button';
        this.domLoadCSV.className = 'list-header-load-as-csv-button';
        this.domFilter.className = 'list-header-filter-button';
        this.domNewTask.className = 'list-header-new-task-button';
        this.domFilterDate.className = 'list-header-filter-due-date-button';

        this.domDelete.type = 'image';
        this.domSaveCSV.type = 'image';
        this.domLoadCSV.type = 'image';
        this.domFilter.type = 'image';
        this.domNewTask.type = 'image';
        this.domFilter.type = 'image';
        this.domFilterDate.type = 'image';

        this.domDelete.alt = 'Delete list button';
        this.domSaveCSV.alt = 'Save list as CSV button';
        this.domLoadCSV.alt = 'Load list as CSV button';
        this.domFilter.alt = 'Filter tasks';
        this.domNewTask.alt = 'Add new task';
        this.domFilterDate.alt = 'Filter by due date';

        this.domDelete.src = '../images/close.svg';
        this.domSaveCSV.src = '../images/download.svg';
        this.domLoadCSV.src = '../images/upload.svg';
        this.domFilter.src = '../images/filter.svg';
        this.domNewTask.src = '../images/add.svg';
        this.domFilterDate.src = '../images/calendar.svg';

        this.domName.innerHTML = this.name;

        this.domHeader.appendChild(this.domName);
        this.domButtonParent.appendChild(this.domDelete);
        this.domButtonParent.appendChild(this.domSaveCSV);
        this.domButtonParent.appendChild(this.domLoadCSV);
        this.domButtonParent.appendChild(this.domFilter);
        this.domButtonParent.appendChild(this.domNewTask);
        this.domButtonParent.appendChild(this.domFilterDate);
        this.domHeader.appendChild(this.domButtonParent);
        this.domParent.appendChild(this.domHeader);
        this.holder.appendChild(this.domParent);
    }

    /**
     * Add event listeners to the list header buttons.
     */
    bindEventListeners() {
        this.domDelete.addEventListener('click', () => this.drop());
        this.domSaveCSV.addEventListener('click', () => this.saveAsCSV());
        this.domFilter.addEventListener('click', () => this.toggleTaskFiltering());

        // TODO: open form
        this.domNewTask.addEventListener('click', () => {
            // TODO: Get data from form
            this.addTask('test', '2023-09-08', 'lorem ipsum');
            this.addTask('test', '2023-07-23', 'lorem ipsum');
            this.addTask('test', '2023-10-15', 'lorem ipsum');
        });

        this.domFilterDate.addEventListener('click', () => this.orderByDueDate());
    }

    /**
     * Render the list and its tasks.
     */
    render() {
        this.taskObjects.forEach((task, index) => {
            this.renderTask(task, index);
        });
    }

    /**
     * Renders a single task object. 
     */
    renderTask(task, index) {
        const domHolder = document.createElement('div');
        const domName = document.createElement('h2');
        const domDate = document.createElement('h3');
        const domContent = document.createElement('h3');
        const domDelete = document.createElement('input');
        const domToggle = document.createElement('input');

        domToggle.checked = task.done;

        domToggle.addEventListener('change', () => {
            task.done = domToggle.checked;
            if (task.done) {
                domHolder.classList.add('task-done');
            } else {
                domHolder.classList.remove('task-done');
            }
            this.saveInLocalStorage();
        });

        domDelete.addEventListener('click', () => {
            this.removeTask(index);
            this.saveInLocalStorage();
        });

        domHolder.className = 'task';
        domName.className = 'task-name';
        domDate.className = 'task-date';
        domContent.className = 'task-content';
        domDelete.className = 'task-delete-button';
        domToggle.className = 'task-toggle-status';

        domDelete.type = 'image';
        domDelete.alt = 'Delete task';
        domDelete.src = '../images/close.svg';

        domToggle.type = 'checkbox';
        domToggle.alt = 'Toggle task status';

        domName.innerHTML = task.name;
        domDate.innerHTML = task.date;
        domContent.innerHTML = task.content;

        domHolder.appendChild(domName);
        domHolder.appendChild(domDate);
        domHolder.appendChild(domContent);
        domHolder.appendChild(domDelete);
        domHolder.appendChild(domToggle);
        this.domParent.appendChild(domHolder);

        this.tasksDOM.push(domHolder);
    }

    /**
     * Clear the existing task DOM elements
     */
    clearTaskDOM() {
        this.tasksDOM.forEach((taskDom) => {
            this.domParent.removeChild(taskDom);
        });
    
        this.tasksDOM = [];
    }

    /**
     * Creates a new task in the list. The task is immediatly
     * added to the list. Note that ``task.done`` is set to false.
     */
    addTask(name, date, content, done = false) {
        const task = new Task(name, date, content, done);
        this.taskObjects.push(task);

        this.clearTaskDOM();
        this.saveInLocalStorage();
        this.render();
    }

    /**
     * Removes the task located at index `taskIndex` in the list.
     */
    removeTask(taskIndex) {
        if (taskIndex >= 0 && taskIndex < this.taskObjects.length) {
            this.taskObjects.splice(taskIndex, 1);

            const removedTaskDom = this.tasksDOM.splice(taskIndex, 1)[0];
            if (removedTaskDom) {
                this.domParent.removeChild(removedTaskDom);
            }

            this.saveInLocalStorage();
        } else {
            throw new Error(`Invalid task index ${taskIndex}`);
        }
    }

    /**
     * Transfers the task located at taskIndex to the target list
     * `newList` and at index `newIndex`.
     */
    transferTask(taskIndex, newList, newIndex) {
        if (taskIndex >= 0 && taskIndex < this.taskObjects.length 
            && newIndex >= 0 && newIndex < newList.tasks.length) {
            // TODO:
        } else {
            throw new Error(`Invalid task index ${taskIndex}`);
        }
    }

    /**
     * Remove the list from the app board. Data will be lost.
     */
    drop() {
        this.taskObjects = [];
        this.tasksDOM = [];
        this.domParent.remove();
        localStorage.removeItem(this.localStorageKey);
    }

    /**
     * Order the tasks in this list based on their due date.
     */
    orderByDueDate() {
        const className = 'list-header-button-active';
        this.orderingTasksByDueDate = !this.orderingTasksByDueDate;

        if (this.orderingTasksByDueDate) {
            this.domFilterDate.classList.add(className);
            
            this.taskObjects.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });

            this.clearTaskDOM();
            this.render();
        } else {
            this.domFilterDate.classList.remove(className);
        }
    }

    /**
     * Toggle visibility between done and undone tasks.
     */
    toggleTaskFiltering() {
        this.filteringTasks = !this.filteringTasks;
        // TODO:
    }

    /**
     * Outputs a file containing the tasks formatted as CSV. The file
     * is saved with the following header: `name;date;content;done`.
     */
    saveAsCSV() {
        if (!this.taskObjects || this.taskObjects.length === 0) {
            alert('No CSV to copy!');
            return;
        }

        let outputString = '';
        outputString += 'name;date;content;done\n';

        this.taskObjects.forEach((task) => {
            outputString += `${task.name};${task.date};${task.content};${task.done}\n`;
        });

        // Remove last line break
        if (outputString.endsWith('\n')) {
            outputString = outputString.slice(0, -1);
        }

        alert(outputString);
    }

    /**
     * Loads the tasks from a CSV string buffer. The file should have
     * the following header: `name;date;content;done`.
     */
    loadFromCSV(csvBuffer) {
        const lines = csvBuffer.split('\n');
        lines.shift(); // Remove header

        lines.forEach((line) => {
            const subLines = line.split(';');
            const done = subLines[3] === 'true' ? true : false;
            this.addTask(subLines[0], subLines[1], subLines[2], done);
        });
    }

    /**
     * Updates or sets the stored task in the browser local storage.
     */
    saveInLocalStorage() {
        const jsonTasks = JSON.stringify(this.taskObjects);
        localStorage.setItem(this.localStorageKey, jsonTasks);
    }
    
    /**
     * Loads the tasks into the list from the browser local storage.
     * Note this might silently fail it no content was saved in the
     * local storage.
     */
    loadFromLocalStorage() {
        const jsonTasks = localStorage.getItem(this.localStorageKey);
        if (jsonTasks !== null) {
            this.taskObjects = JSON.parse(jsonTasks);
        }
    }
}
