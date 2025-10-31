import { AbstractComponent } from '../framework/view/abstract-component.js';


function createTemplate() {
    return `
        <div class="trip-filter">
            <label for="date-filter">Фильтр по дате:</label>
            <input type="date" id="date-filter" />
            
            <label><input type="checkbox" id="completed-filter" /> Показывать только завершенные поездки</label>
        </div>`;
}

export default class TripFilterComponent extends AbstractComponent {
    #onChange = null;


    constructor({ onChange }) {
        super();
        this.#onChange = onChange;
        this.element.querySelector('#date-filter').addEventListener('change', this.#changeHandler);
        this.element.querySelector('#completed-filter').addEventListener('change', this.#changeHandler);
    }


    #changeHandler = () => {
        const date = this.element.querySelector('#date-filter').value;
        const onlyCompleted = this.element.querySelector('#completed-filter').checked;
        this.#onChange({ date, onlyCompleted });
    }


    get template() {
        return createTemplate();
    }
}