import { AbstractComponent } from '../framework/view/abstract-component.js';


function createTemplate(trip) {
    return `
        <li class="trip-item" data-id="${trip.id}">
            <div class="trip-item-main">
                <span class="trip-item-destination">${trip.destination}</span>
                <span class="trip-item-date">${trip.date}</span>
                <span class="trip-item-status">${trip.status === 'Completed' ? 'Выполнено' : 'Запланировано'}</span>
            </div>
        <div class="trip-item-notes">${trip.notes || ''}</div>
        <div class="trip-item-buttons">
            <button class="trip-item-edit">Редактировать</button>
            <button class="trip-item-delete">Удалить</button>
        </div>
        </li>`;
}

export default class TripItemComponent extends AbstractComponent {
    #trip = null;
    #onDelete = null;
    #onEdit = null;


    constructor({ trip, onDelete, onEdit }) {
        super();
        this.#trip = trip;
        this.#onDelete = onDelete;
        this.#onEdit = onEdit;


        this.element.querySelector('.trip-item-delete').addEventListener('click', this.#deleteHandler);
        this.element.querySelector('.trip-item-edit').addEventListener('click', this.#editHandler);
    }


    #deleteHandler = () => this.#onDelete(this.#trip.id);
    #editHandler = () => this.#onEdit(this.#trip);


    get template() {
        return createTemplate(this.#trip);
    }
}