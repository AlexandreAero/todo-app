/**
 * A list contains the todo tasks. This object has methods
 * do manipulate the tasks contained in this list.
 */
class List {
    constructor(name) {
        this.name = name;
        this.tasks = []; // Keeps track of the objects themselves
        this.tasksDom = []; // Keep track of the created DOM elements

        this.holder = document.getElementById('list-container');

        this.domParent = document.createElement('div');
        this.domHeader = document.createElement('div');
        this.domName = document.createElement('h2');
        this.domDelete = document.createElement('input');
        this.domSaveCSV = document.createElement('input');
        this.domLoadCSV = document.createElement('input');

        this.domParent.id = 'list';
        this.domHeader.id = 'list-header';
        this.domName.id = 'list-header-name';
        this.domDelete.id = 'list-header-delete-button';
        this.domSaveCSV.id = 'list-header-save-as-csv-button';
        this.domLoadCSV.id = 'list-header-load-as-csv-button';

        this.domDelete.type = 'image';
        this.domSaveCSV.type = 'image';
        this.domLoadCSV.type = 'image';

        this.domDelete.alt = 'Delete list button';
        this.domSaveCSV.alt = 'Save list as CSV button';
        this.domLoadCSV.alt = 'Load list as CSV button';
        
        this.domDelete.src = '../images/close.svg';
        this.domSaveCSV.src = '../images/download.svg';
        this.domLoadCSV.src = '../images/upload.svg';

        this.domName.innerHTML = name;

        this.domHeader.appendChild(this.domName);
        this.domHeader.appendChild(this.domDelete);
        this.domHeader.appendChild(this.domSaveCSV);
        this.domHeader.appendChild(this.domLoadCSV);
        this.domParent.appendChild(this.domHeader);
        this.holder.appendChild(this.domParent);

        if (localStorage.getItem(`todo-apps-tasks-${this.name}`) !== null) {
            this.loadFromLocalStorage();
            this.render();
        }

        this.domDelete.addEventListener('click', () => this.drop());
        this.domSaveCSV.addEventListener('click', () => this.saveAsCSV());
        this.domLoadCSV.addEventListener('click', () => this.loadFromCSV());
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
        const holder = document.createElement('div');
        const name = document.createElement('h2');
        const date = document.createElement('h3');
        const content = document.createElement('h3');

        holder.id = 'task';
        name.id = 'task-name';
        date.id = 'task-date';
        content.id = 'task-content';

        name.innerHTML = task.name;
        date.innerHTML = task.date;
        content.innerHTML = task.content;

        holder.appendChild(name);
        holder.appendChild(date);
        holder.appendChild(content);
        this.domParent.appendChild(holder);

        this.tasksDom.push(holder);
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
     * Toggle visibility between done and undone tasks.
     */
    toggleDoneUndoneVisibility() {

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

        if (outputString.endsWith('\n')) {
            outputString = outputString.slice(0, -1);
        }

        alert('Outputed CSV content to console!');
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
        this.tasks = JSON.parse(jsonTasks);
    }
}
