/**
 * Base class to create forms.
 */
class Form {
    constructor(domParent, listContainer) {
        this.dom = domParent;
        this.listContainer = listContainer;
    }

    /**
     * Show form interface.
     * @param {Boolean} blur - Specifies if the list container should be
     * blurred.
     */
    show(blur) {
        this.dom.classList.remove('hidden');

        if (blur) {
            this.listContainer.classList.add('blurred');
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
    }
}
