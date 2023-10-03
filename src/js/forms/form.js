// Base class for forms.
class Form {
    constructor(domParent, listContainer) {
        this.dom = domParent;
        this.listContainer = listContainer;
    }

    /**
     * Set a callback triggered when the form is opened/shown.
     * @param {Function} callback 
     */
    setOnOpenCallback(callback) {
        this.onOpen = callback;
    }

    /**
     * Set a callback triggered when the form is closed/hidden.
     * @param {Function} callback 
     */
    setOnCloseCallback(callback) {
        this.onClose = callback;
    }

    /**
     * Show form interface.
     * @param {Boolean} blur 
     */
    show(blur) {
        this.dom.classList.remove('hidden');

        if (blur) {
            this.listContainer.classList.add('blurred');
        }

        if(this.onOpen) {
            this.onOpen();
        }
    }

    /**
     * Hide form interface.
     */
    hide() {
        this.dom.classList.add('hidden');

        if (this.listContainer.classList.contains('blurred')) {
            this.listContainer.classList.remove('blurred');
        }

        if (this.onClose) {
            this.onClose();
        }
    }
}
