/**
 * A list contains the todo tasks. This object has methods
 * do manipulate the tasks contained in this list.
 */
class List {
    constructor(name) {
        this.name = name;
        this.tasks = [];
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
        this.container = document.getElementById('list-container');

        this.holder = document.createElement('div');
        this.header = document.createElement('div');
        this.headerName = document.createElement('h2');
        this.buttonHolder = document.createElement('div');
        this.deleteButton = document.createElement('input');
        this.saveAsCSVButton = document.createElement('input');
        this.loadCSVButton = document.createElement('input');
        this.filterButton = document.createElement('input');
        this.addNewTaskButton = document.createElement('input');
        this.orderByDueDateButton = document.createElement('input');

        this.holder.className = 'list';
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
        this.holder.appendChild(this.header);
        this.container.appendChild(this.holder);
    }

    /**
     * Add event listeners to the list header buttons.
     */
    bindEventListeners() {
        this.deleteButton.addEventListener('click', () => this.drop());
        this.saveAsCSVButton.addEventListener('click', () => this.saveAsCSV());
        this.filterButton.addEventListener('click', () => this.toggleTaskFiltering());

        // TODO: open form
        this.addNewTaskButton.addEventListener('click', () => {
            // TODO: Get data from form
            this.addTask('test', '2023-09-08', 'lorem ipsum');
            this.addTask('test', '2023-07-23', 'lorem ipsum');
            this.addTask('test', '2023-10-15', 'lorem ipsum');
        });

        this.orderByDueDateButton.addEventListener('click', () => this.orderByDueDate());
    }

    /**
     * Render the list and its tasks.
     */
    render() {
        this.tasks.forEach((task, index) => {
            this.renderTask(task, index);
        });
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

        toggleCheckbox.checked = task.done;

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

        holder.appendChild(name);
        holder.appendChild(date);
        holder.appendChild(content);
        holder.appendChild(deleteButton);
        holder.appendChild(toggleCheckbox);
        this.holder.appendChild(holder);

        this.tasksDOM.push(holder);
    }

    /**
     * Clear the existing task DOM elements
     */
    clearTaskDOM() {
        this.tasksDOM.forEach((taskDom) => {
            this.holder.removeChild(taskDom);
        });
    
        this.tasksDOM = [];
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

        this.clearTaskDOM();
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
                this.holder.removeChild(removedTaskDom);
            }

            this.saveInLocalStorage();
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
        this.tasks = [];
        this.tasksDOM = [];
        this.holder.remove();
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
            
            const sortedTasks = [...this.tasks];
            sortedTasks.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });

            this.clearTaskDOM();
            sortedTasks.forEach((task, index) => {
                this.renderTask(task, index);
            });
        } else {
            this.orderByDueDateButton.classList.remove(className);

            this.clearTaskDOM();
            this.tasks.forEach((task, index) => {
                this.renderTask(task, index);
            });
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
        if (!this.tasks || this.tasks.length === 0) {
            alert('No CSV to copy!');
            return;
        }

        let outputString = '';
        outputString += 'name;date;content;done\n';

        this.tasks.forEach((task) => {
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
     * @param {String} csvBuffer a string buffer of the CSV content.
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
