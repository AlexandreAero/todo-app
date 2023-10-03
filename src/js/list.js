/**
 * A list contains the todo tasks. This object has methods to 
 * manipulate the tasks contained in this list.
 */
class List {
    constructor(name) {
        this.name = name;

        this.tasks = [];
        this.tasksDOM = [];

        this.orderingTasksByDueDate = false;

        this.localStorageKey = `todo-app-tasks-${this.name}`;
        this.filteringState = 'none';

        this.initDOM();
        this.loadFromLocalStorage();
        this.bindEventListeners();
        this.render();
    }

    /**
     * Initialize the DOM element related to the list.
     */
    initDOM() {
        this.listContainer = document.getElementById('list-container');

        this.parent = document.createElement('div');
        this.header = document.createElement('div');
        this.headerName = document.createElement('h2');
        this.buttonHolder = document.createElement('div');
        this.deleteButton = document.createElement('input');
        this.saveAsCSVButton = document.createElement('input');
        this.loadCSVButton = document.createElement('input');
        this.filterButton = document.createElement('input');
        this.addNewTaskButton = document.createElement('input');
        this.orderByDueDateButton = document.createElement('input');

        this.parent.className = 'list';
        this.header.className = 'list-header';
        this.headerName.className = 'list-header-name';
        this.buttonHolder.className = 'list-header-buttons-holder';
        this.deleteButton.className = 'list-header-delete-button';
        this.saveAsCSVButton.className = 'list-header-save-as-csv-button';
        this.loadCSVButton.className = 'list-header-load-as-csv-button';
        this.filterButton.className = 'list-header-filter-button';
        this.addNewTaskButton.className = 'list-header-new-task-button';
        this.orderByDueDateButton.className = 'list-header-order-by-due-date-button';

        this.deleteButton.type = 'image';
        this.saveAsCSVButton.type = 'image';
        this.loadCSVButton.type = 'image';
        this.filterButton.type = 'image';
        this.addNewTaskButton.type = 'image';
        this.filterButton.type = 'image';
        this.orderByDueDateButton.type = 'image';

        this.deleteButton.alt = 'Delete list button';
        this.saveAsCSVButton.alt = 'Save list as CSV button';
        this.loadCSVButton.alt = 'Load list as CSV button';
        this.filterButton.alt = 'Filter tasks';
        this.addNewTaskButton.alt = 'Add new task';
        this.orderByDueDateButton.alt = 'Filter by due date';

        this.deleteButton.src = '../images/close.svg';
        this.saveAsCSVButton.src = '../images/download.svg';
        this.loadCSVButton.src = '../images/upload.svg';
        this.filterButton.src = '../images/filter.svg';
        this.addNewTaskButton.src = '../images/add.svg';
        this.orderByDueDateButton.src = '../images/calendar.svg';

        this.headerName.innerHTML = this.name;

        this.header.appendChild(this.headerName);
        this.buttonHolder.appendChild(this.deleteButton);
        this.buttonHolder.appendChild(this.saveAsCSVButton);
        this.buttonHolder.appendChild(this.loadCSVButton);
        this.buttonHolder.appendChild(this.filterButton);
        this.buttonHolder.appendChild(this.addNewTaskButton);
        this.buttonHolder.appendChild(this.orderByDueDateButton);
        this.header.appendChild(this.buttonHolder);
        this.parent.appendChild(this.header);
        this.listContainer.appendChild(this.parent);
    }

    /**
     * Add event listeners to the list header buttons.
     */
    bindEventListeners() {
        this.deleteButton.addEventListener('click', () => this.delete());
        this.saveAsCSVButton.addEventListener('click', () => this.saveAsCSV());
        this.loadCSVButton.addEventListener('click', () => csvImportForm.show(true));
        this.filterButton.addEventListener('click', () => this.toggleTaskFiltering());
        this.addNewTaskButton.addEventListener('click', () => showTaskForm());
        this.orderByDueDateButton.addEventListener('click', () => this.orderByDueDate());
    }

    /**
     * Render the list and its tasks.
     */
    render() {
        this.clearTaskDOM();

        this.tasks.forEach((task, index) => {
            if (
                (this.filteringState === 'doneonly' && task.done) ||
                (this.filteringState === 'undoneonly' && !task.done) ||
                this.filteringState === 'none'
            ) {
                this.renderTask(task, index);
            }
        });
    }

    /**
     * Clear the existing task DOM elements.
     */
    clearTaskDOM() {
        this.tasksDOM.forEach((taskDom) => {
            this.parent.removeChild(taskDom);
        });
        
        this.tasksDOM = [];
    }

    /**
     * Renders a single task object.
     * @param {Task} task 
     * @param {Number} index 
     */
    renderTask(task, index) {
        const holder = document.createElement('div');
        const name = document.createElement('h2');
        const date = document.createElement('h3');
        const content = document.createElement('h3');
        const deleteButton = document.createElement('input');
        const toggleCheckbox = document.createElement('input');

        holder.addEventListener('click', () => {
            taskEditionForm.show(false, this, task);
        });

        toggleCheckbox.addEventListener('change', () => {
            task.done = toggleCheckbox.checked;
            if (task.done) {
                holder.classList.add('task-done');
            } else {
                holder.classList.remove('task-done');
            }
            this.saveInLocalStorage();
        });

        deleteButton.addEventListener('click', () => {
            this.removeTask(index);
            this.saveInLocalStorage();
        });

        holder.className = 'task';
        name.className = 'task-name';
        date.className = 'task-date';
        content.className = 'task-content';
        deleteButton.className = 'task-delete-button';
        toggleCheckbox.className = 'task-toggle-status';

        deleteButton.type = 'image';
        deleteButton.alt = 'Delete task';
        deleteButton.src = '../images/close.svg';

        toggleCheckbox.type = 'checkbox';
        toggleCheckbox.alt = 'Toggle task status';

        name.innerHTML = task.name;
        date.innerHTML = task.date;
        content.innerHTML = task.content;

        holder.draggable = true;

        holder.appendChild(name);
        holder.appendChild(date);
        holder.appendChild(content);
        holder.appendChild(deleteButton);
        holder.appendChild(toggleCheckbox);
        this.parent.appendChild(holder);

        this.tasksDOM.push(holder);

        if (task.done) {
            toggleCheckbox.checked = true;
            holder.classList.add('task-done');
        }
    }

    /**
     * Creates a new task in the list. The task is immediatly
     * added to the list. Note that ``task.done`` is set to false.
     * @param {String} name 
     * @param {String} date 
     * @param {String} content 
     * @param {Boolean} done 
     */
    addTask(name, date, content, done = false) {
        const task = new Task(name, date, content, done);
        this.tasks.push(task);

        this.saveInLocalStorage();
        this.render();
    }

    /**
     * Removes the task located at index `taskIndex` in the list.
     * @param {Number} taskIndex target index in the list of the task to remove
     */
    removeTask(taskIndex) {
        if (taskIndex >= 0 && taskIndex < this.tasks.length) {
            this.tasks.splice(taskIndex, 1);

            const removedTaskDom = this.tasksDOM.splice(taskIndex, 1)[0];
            
            if (removedTaskDom) {
                this.parent.removeChild(removedTaskDom);
            }

            this.saveInLocalStorage();
            this.render();
        } else {
            throw new Error(`Invalid task index ${taskIndex}`);
        }
    }

    /**
     *  Transfers the task located at taskIndex to the target list
     * `newList` and at index `newIndex`.
     * @param {Number} taskIndex the index in the list of the task to be transfered
     * @param {List} newList new target list where the task should be tranfsered
     * @param {Number} newIndex new target task index in the targeted list
     */
    transferTask(taskIndex, newList, newIndex) {
        if (taskIndex >= 0 && taskIndex < this.tasks.length 
            && newIndex >= 0 && newIndex <= newList.tasks.length) {
            // TODO:
            
            this.saveInLocalStorage();
            this.render();
        } else {
            throw new Error(`Invalid task index ${taskIndex}`);
        }
    }

    /**
     * Remove the list from the app board. Data will be lost.
     */
    delete() {
        this.tasks = [];
        this.tasksDOM = [];
        this.parent.remove();
        localStorage.removeItem(this.localStorageKey);
    }

    /**
     * Order the tasks in this list based on their due date.
     */
    orderByDueDate() {
        const className = 'list-header-button-active';
        this.orderingTasksByDueDate = !this.orderingTasksByDueDate;

        if (this.orderingTasksByDueDate) {
            this.orderByDueDateButton.classList.add(className);

            this.tasks.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });
        } else {
            this.orderByDueDateButton.classList.remove(className);
            this.loadFromLocalStorage();
        }

        this.render();
    }

    /**
     * Toggle visibility between done and undone tasks.
     */
    toggleTaskFiltering() {
        const className = 'list-header-button-active';

        // Three possible states: 'none', 'doneonly' and 'undoneonly'
        switch (this.filteringState) {
            case 'none':
                this.filteringState = 'doneonly';
                this.filterButton.classList.add(className);
                break;
            case 'doneonly':
                this.filteringState = 'undoneonly';
                break;
            case 'undoneonly':
                this.filteringState = 'none';
                this.filterButton.classList.remove(className);
                break;
            default:
                throw new Error('Invalid filtering state');
        }

        this.render();
    }

    /**
     * Outputs a string containing the tasks formatted as CSV. The CSV
     * is shown with the following header: `name;date;content;done`.
     */
    saveAsCSV() {
        if (!this.tasks || this.tasks.length === 0) {
            alert('No CSV to copy!');
            return;
        }

        let outputString = 'name;date;content;done\n';

        this.tasks.forEach((task) => {
            outputString += `${task.name};${task.date};${task.content};${task.done}\n`;
        });

        // Remove last line break
        if (outputString.endsWith('\n')) {
            outputString = outputString.slice(0, -1);
        }

        navigator.clipboard.writeText(outputString);
        alert('Copied CSV to clipboard.');
    }

    /**
     * Loads the tasks from a CSV string buffer. The file should have
     * the following header: `name;date;content;done`.
     * @param {String} csvBuffer a string buffer of the CSV content.
     */
    loadFromCSV(csvBuffer) {
        const lines = csvBuffer.trim().split('\n');
        if (lines.length === 0) {
            throw new Error('CSV buffer is empty');
        }

        const header = lines[0].split(';');
        if (header.length !== 4) {
            throw new Error('CSV header is invalid');
        }

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
        const jsonTasks = JSON.stringify(this.tasks);
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
            this.tasks = JSON.parse(jsonTasks);
        }
    }
}
