/**
 * Info form is an interface to provide informations related
 * to the development of the web application.
 */
class InfoForm extends Form {
    constructor(dom, listConstructor) {
        super(dom, listConstructor);
        this.shown = false;

        this.bindEventListeners();
    }

    bindEventListeners() {
        const infoButton = document.getElementById('application-info-button');

        infoButton.addEventListener('click', () => {
            this.shown ? super.hide() : super.show(true);
            this.shown = !this.shown;
        });
    }
}

const infoFormDOM = document.getElementById('info-form');
const infoForm = new InfoForm(infoFormDOM, listContainer);
