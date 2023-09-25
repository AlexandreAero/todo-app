/**
 * A task is a todo card/element that contains informations
 * about the task.
 */
class Task {
    constructor(name, date, content) {
        this.name = name;
        this.date = date;
        this.content = content;
        this.done = false;
    }
}
