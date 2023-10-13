class InfoForm extends Form {
    constructor(dom, listConstructor) {
        super(dom, listConstructor);

        this.infoButton = document.getElementById('application-info-button');
        this.shown = false;

        this.bindEventListeners();
    }

    bindEventListeners() {
        this.infoButton.addEventListener('click', () => {
            if (this.shown) {
                super.hide();
            } else {
                super.show(true);
            }
            
            this.shown = !this.shown;
        });
    }
}

const infoFormDOM = document.getElementById('info-form');
const infoForm = new InfoForm(infoFormDOM, listContainer);
