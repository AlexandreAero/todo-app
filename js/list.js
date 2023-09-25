/**
 * A list contains the todo tasks. This object has methods
 * do manipulate the tasks contained in this list.
 */
class List {
    constructor(name) {
        this.name = name;
        this.tasks = []; // Keeps track of the objects themselves
        this.tasksDom = []; // Keep track of the created DOM elements
        this.filteringTasks = false;

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
        this.domDelete = document.createElement('input');
        this.domSaveCSV = document.createElement('input');
        this.domLoadCSV = document.createElement('input');
        this.domFilter = document.createElement('input');

        this.domParent.className = 'list';
        this.domHeader.className = 'list-header';
        this.domName.className = 'list-header-name';
        this.domDelete.className = 'list-header-delete-button';
        this.domSaveCSV.className = 'list-header-save-as-csv-button';
        this.domLoadCSV.className = 'list-header-load-as-csv-button';
        this.domFilter.className = 'list-header-filter-button';

        this.domDelete.type = 'image';
        this.domSaveCSV.type = 'image';
        this.domLoadCSV.type = 'image';
        this.domFilter.type = 'image';

        this.domDelete.alt = 'Delete list button';
        this.domSaveCSV.alt = 'Save list as CSV button';
        this.domLoadCSV.alt = 'Load list as CSV button';
        this.domFilter.alt = 'Filter tasks';
        
        this.domDelete.src = '../images/close.svg';
        this.domSaveCSV.src = '../images/download.svg';
        this.domLoadCSV.src = '../images/upload.svg';
        this.domFilter.src = '../images/filter.svg';

        this.domName.innerHTML = this.name;

        this.domHeader.appendChild(this.domName);
        this.domHeader.appendChild(this.domDelete);
        this.domHeader.appendChild(this.domSaveCSV);
        this.domHeader.appendChild(this.domLoadCSV);
        this.domHeader.appendChild(this.domFilter);
        this.domParent.appendChild(this.domHeader);
        this.holder.appendChild(this.domParent);
    }

    /**
     * Add event listeners to the list header buttons.
     */
    bindEventListeners() {
        this.domDelete.addEventListener('click', () => this.drop());
        this.domSaveCSV.addEventListener('click', () => this.saveAsCSV());
        this.domLoadCSV.addEventListener('click', () => this.loadFromCSV());

        this.domFilter.addEventListener('click', () => {
            this.filteringTasks = !this.filteringTasks;
            this.filterTasks(this.filteringTasks);
        });
    }

    /**
     * Render the list and its tasks.
     */
    render() {
        this.tasks.forEach((task) => {
            this.renderSingleTask(task);
        });
    }

    /**
     * Renders a single task object. 
     */
    renderSingleTask(task) {
        const domHolder = document.createElement('div');
        const domName = document.createElement('h2');
        const domDate = document.createElement('h3');
        const domContent = document.createElement('h3');

        domHolder.className = 'task';
        domName.className = 'task-name';
        domDate.className = 'task-date';
        domContent.className = 'task-content';

        domName.innerHTML = task.name;
        domDate.innerHTML = task.date;
        domContent.innerHTML = task.content;

        domHolder.appendChild(domName);
        domHolder.appendChild(domDate);
        domHolder.appendChild(domContent);
        this.domParent.appendChild(domHolder);

        this.tasksDom.push(domHolder);
    }

    /**
     * Creates a new task in the list. The task is immediatly
     * added to the list. Note that ``task.done`` is set to false.
     */
    createNewTask(name, date, content) {
        const task = new Task(name, date, content);
        this.tasks.push(task);

        this.tasksDom.forEach((taskDom) => {
            this.domParent.removeChild(taskDom);
        });

        this.tasksDom = [];

        this.saveInLocalStorage();
        this.render();
    }

    /**
     * Removes the task located at index `taskIndex` in the list.
     */
    removeTask(taskIndex) {
        if (taskIndex >= 0 && taskIndex < this.tasks.length) {
            // Remove object
            this.tasks.splice(taskIndex, 1);

            // Remove DOM element
            const removedTaskDom = this.tasksDom.splice(taskIndex, 1)[0];
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
        if (taskIndex >= 0 && taskIndex < this.tasks.length 
            && newIndex >= 0 && newIndex < newList.tasks.length) {

            this.saveInLocalStorage();
        } else {
            throw new Error(`Invalid task index ${taskIndex}`);
        }
    }

    /**
     * Remove the list from the app board. Data will be lost.
     */
    drop() {
        this.tasks = [];
        this.domParent.remove();        

        localStorage.removeItem(`todo-apps-tasks-${this.name}`);
    }

    /**
     * Order the tasks in this list based on their due date.
     */
    orderByDueDate() {

    }

    /**
     * Toggle visibility between done and undone tasks. If ``doneOnly``
     * is set to true then only done tasks will be rendered.
     */
    filterTasks(doneOnly) {
        this.tasks.forEach((task, index) => {
            if ((!task.done && !doneOnly) || (task.done && doneOnly)) {
                this.tasksDom[index].style.display = 'block';
            } else {
                this.tasksDom[index].style.display = 'none';
            }
        });
    }

    /**
     * Outputs a file containing the tasks formatted as CSV. The file
     * is saved with the following header: `name;date;content;done`.
     */
    saveAsCSV() {
        if (!this.tasks || this.tasks.length === 0) {
            alert('No tasks to copy!');
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
     */
    loadFromCSV(csvBuffer) {
        const lines = csvBuffer.split('\n');
        lines.shift(); // Remove header

        lines.forEach((line) => {
            let subLines = line.split(';');
            this.createNewTask(subLines[0], subLines[1], subLines[2]);
        });
    }

    /**
     * Updates or sets the stored task in the browser local storage.
     */
    saveInLocalStorage() {
        const jsonTasks = JSON.stringify(this.tasks);
        localStorage.setItem(`todo-apps-tasks-${this.name}`, jsonTasks);
    }

    /**
     * Loads the tasks into the list from the browser local storage.
     */
    loadFromLocalStorage() {
        const jsonTasks = localStorage.getItem(`todo-apps-tasks-${this.name}`);
        if (jsonTasks !== null) {
            this.tasks = JSON.parse(jsonTasks);
        }
    }
}
