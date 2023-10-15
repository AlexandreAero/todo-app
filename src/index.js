document.addEventListener('DOMContentLoaded', () => {
    const lists = document.querySelectorAll('.list');
    const tasks = document.querySelectorAll('.task');

    let dropTarget = null;
    let draggedTask = null;
    
    lists.forEach((list) => {
        list.addEventListener('dragover', (event) => {
            event.preventDefault();
            const taskAtPoint = document.elementFromPoint(event.clientX, event.clientY);

            if (taskAtPoint) {
                if (taskAtPoint.classList.contains('task')) {
                    // Distance between the cursor and taskAtPoint
                    const offset = event.clientY - taskAtPoint.getBoundingClientRect().top;

                    // Determine where we should insert the dragged task
                    const insertBefore = offset < taskAtPoint.clientHeight / 2;
                    taskAtPoint.parentElement.insertBefore(draggedTask, insertBefore ? taskAtPoint : taskAtPoint.nextSibling);
                } else if (taskAtPoint.classList.contains('list')) {
                    taskAtPoint.appendChild(draggedTask);
                }
            }
        });

        list.addEventListener('drop', (event) => {
            if (draggedTask && dropTarget && dropTarget !== draggedTask.parentElement) {
                dropTarget.appendChild(draggedTask);
            }

            dropTarget = null;
        });
    });

    tasks.forEach((task) => {
        task.addEventListener('dragstart', () => {
            draggedTask = task;
            task.classList.add('task-dragging');
        });

        task.addEventListener('dragend', () => {
            draggedTask = null;
            task.classList.remove('task-dragging');
        });
    });
});

let lists = [];

/**
 * Loads the lists from the local storage memory.
 */
function loadListsFromLocalStorage() {
    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('todo-app-tasks-')) {
            const name = key.replace('todo-app-tasks-', '');
            lists.push(new List(name));
        }
    });
}

loadListsFromLocalStorage();
