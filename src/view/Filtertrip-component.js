import { AbstractComponent } from '../framework/view/abstract-component.js';


function createTemplate() {
    return `
        <div class="trip-filter">
            <h4>Фильтр поездок:</h4>
            
            <label for="date-from-filter">Дата С:</label>
            <input type="date" id="date-from-filter" />
            
            <label for="date-to-filter">Дата ПО:</label>
            <input type="date" id="date-to-filter" />
            
            <label><input type="checkbox" id="completed-filter" /> Показывать только завершенные поездки</label>
        </div>`;
}

export default class TripFilterComponent extends AbstractComponent {
    #onChange = null;

    constructor({ onChange }) {
        super();
        this.#onChange = onChange;
        this.element.querySelector('#date-from-filter').addEventListener('change', this.#changeHandler);
        this.element.querySelector('#date-to-filter').addEventListener('change', this.#changeHandler);
        this.element.querySelector('#completed-filter').addEventListener('change', this.#changeHandler);
    }

    #changeHandler = () => {
        const dateFrom = this.element.querySelector('#date-from-filter').value;
        const dateTo = this.element.querySelector('#date-to-filter').value;
        const onlyCompleted = this.element.querySelector('#completed-filter').checked;
        this.#onChange({ dateFrom, dateTo, onlyCompleted });
    }

    get template() {
        return createTemplate();
    }
}