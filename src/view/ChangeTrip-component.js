import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTemplate(trip) {
  return `<div class="modal-overlay">
    <div class="modal">
      <h2>Редактировать поездку</h2>
      <form class="edit-trip-form">
        <input type="text" class="edit-trip-destination" value="${trip.destination}" required />
        <input type="date" class="edit-trip-date" value="${trip.date}" required />
        <input type="text" class="edit-trip-notes" value="${trip.notes}"/>
        <fieldset>
            <legend>Статус поездки:</legend>
            <label><input type="radio" name="edit-trip-status" value="Planned" required ${trip.status === 'Planned' ? 'checked' : ''} /> Запланировано</label>
            <label><input type="radio" name="edit-trip-status" value="Completed" required ${trip.status === 'Completed' ? 'checked' : ''} /> Выполнено</label>
        </fieldset>
        <div class="modal-buttons">
          <button type="submit" class="save-book">Сохранить</button>
          <button type="button" class="cancel">Отмена</button>
        </div>
      </form>
    </div>
  </div>`;
}

export default class EditTripModalComponent extends AbstractComponent {
  #trip = null;
  #onSave = null;
  #onCancel = null;

  constructor({ trip, onSave, onCancel }) {
    super();
    this.#trip = trip;
    this.#onSave = onSave;
    this.#onCancel = onCancel;

    this.element.querySelector('.edit-trip-form').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.cancel').addEventListener('click', this.#cancelHandler);
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    const destination = this.element.querySelector('.edit-trip-destination').value.trim();
    const date = this.element.querySelector('.edit-trip-date').value;
    const notes = this.element.querySelector('.edit-trip-notes').value.trim();  
    const status = this.element.querySelector('input[name="edit-trip-status"]:checked').value;

    if (destination && date) {
      this.#onSave(this.#trip.id, { id: this.#trip.id, destination, date, notes, status });
    }
  }

  #cancelHandler = () => this.#onCancel();

  get template() {
    return createTemplate(this.#trip);
  }
}