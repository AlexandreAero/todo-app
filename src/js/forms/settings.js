/**
 * The settings form allows the user to interact
 * with the web application settings from this interface.
 */
class SettingsForm extends Form {
    constructor(dom, listContainer) {
        super(dom, listContainer);
        this.shown = false;

        this.bindEventListener();
    }

    bindEventListener() {
        const settingsButton = document.getElementById('application-settings-button');
        const colorPicker = document.getElementById('color-picker');
        const colorPalette = document.getElementById('board-bg-color-palette');
        const colors = colorPalette.querySelectorAll('div');

        settingsButton.addEventListener('click', () => {
            this.shown ? super.hide() : super.show(false);
            this.shown = !this.shown;
        });

        colorPicker.addEventListener('input', () => {
            this.setBackgroundColor(colorPicker.value);
        });

        colors.forEach((color) => {
            color.addEventListener('click', () => {
                const selectedColor = getComputedStyle(color).backgroundColor;
                this.setBackgroundColor(selectedColor);
            });
        });
    }

    /**
     * Sets the background color of the application.
     * @param {String} color 
     */
    setBackgroundColor(color) {
        document.body.style.backgroundColor = color;
    }
}

const settingsFormDom = document.getElementById('settings');
const settingsForm = new SettingsForm(settingsFormDom, listContainer);
