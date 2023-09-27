document.addEventListener('DOMContentLoaded', () => {
    const lists = document.querySelectorAll('.list');
    const tasks = document.querySelectorAll('.task');
    let draggedTask = null;
    let dropTarget = null;

    function handleDragOver(event) {
        event.preventDefault();
        const taskAtPoint = document.elementFromPoint(event.clientX, event.clientY);
        if (taskAtPoint) {
            if (taskAtPoint.classList.contains('task')) {
                const offset = event.clientY - taskAtPoint.getBoundingClientRect().top;
                const insertBefore = offset < taskAtPoint.clientHeight / 2;
                taskAtPoint.parentElement.insertBefore(draggedTask, insertBefore ? taskAtPoint : taskAtPoint.nextSibling);
            } else if (taskAtPoint.classList.contains('list')) {
                taskAtPoint.appendChild(draggedTask);
            }
        }
    }

    function handleDragEnter(event) {
        event.preventDefault();
        const list = event.target;
        if (list.classList.contains('list')) {
            dropTarget = list;
        }
    }

    function handleDragLeave(event) {
        event.preventDefault();
        const list = event.target;
        if (list.classList.contains('list')) {
            dropTarget = null;
        }
    }

    function handleDrop() {
        if (draggedTask && dropTarget && dropTarget !== draggedTask.parentElement) {
            dropTarget.appendChild(draggedTask);
        }
        dropTarget = null;
    }

    lists.forEach((list) => {
        list.addEventListener('dragover', handleDragOver);
        list.addEventListener('dragenter', handleDragEnter);
        list.addEventListener('dragleave', handleDragLeave);
        list.addEventListener('drop', handleDrop);
    });

    tasks.forEach((task) => {
        task.draggable = true;

        task.addEventListener('dragstart', () => {
            draggedTask = task;
            task.classList.add('task-dragging');
        });

        task.addEventListener('dragend', () => {
            task.classList.remove('task-dragging');
            draggedTask = null;
        });
    });
});
