import { AbstractComponent } from '../framework/view/abstract-component.js';


function createTemplate() {
    return `
        <div class="trip-form">
            <h2>Добавить новую поездку</h2>
            <form id="trip-form">
                <label for="trip-destination">Путешествие:</label>
                <input type="text" id="trip-destination" placeholder="Destination" required />
                <label for="trip-date">Дата:</label>
                <input type="date" id="trip-date" required />
                <label for="trip-notes">Заметки:</label>
                <textarea id="trip-notes" placeholder="Notes" rows="3"></textarea>

                <fieldset>
                    <legend>Статус поездки:</legend>
                    <label><input type="radio" name="trip-status" value="Planned" required /> Запланировано</label>
                    <label><input type="radio" name="trip-status" value="Completed" required /> Выполнено</label>
                </fieldset>

                <button type="submit">Добавить поездку</button>
            </form>
        </div>`;
}

export default class AddTripComponent extends AbstractComponent {
    #onSubmit = null;


    constructor({ onSubmit }) {
        super();
        this.#onSubmit = onSubmit;
        this.element.querySelector('#trip-form').addEventListener('submit', this.#submitHandler);
    }


    #submitHandler = (evt) => {
        evt.preventDefault();
        const destination = this.element.querySelector('#trip-destination').value.trim();
        const date = this.element.querySelector('#trip-date').value;
        const notes = this.element.querySelector('#trip-notes').value.trim();
        const status = this.element.querySelector('input[name="trip-status"]:checked').value;


        if (destination && date) {
            this.#onSubmit({ destination, date, notes, status });
            evt.target.reset();
            this.element.querySelector('input[name="trip-status"][value="Planned"]').checked = true;
        }
    }


    get template() {
        return createTemplate();
    }
}