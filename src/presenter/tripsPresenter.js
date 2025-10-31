// 1. Убираем 'remove' из импорта
import { render } from '../framework/view/render.js';
import TripListComponent from '../view/Listtrip-component.js';
import TripItemComponent from '../view/trip-component.js';
import EditTripModalComponent from '../view/ChangeTrip-component.js';

export default class TripsPresenter {
  #tripModel = null;
  #boardContainer = null;
  #tripListComponent = new TripListComponent();
  #editModalComponent = null; 

  constructor({ boardContainer, tripModel }) {
    this.#boardContainer = boardContainer;
    this.#tripModel = tripModel;
    this.#tripModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    render(this.#tripListComponent, this.#boardContainer);
    this.#renderTrips();
  }

  #renderTrips() {
    const listElement = this.#tripListComponent.element.querySelector("#trip-list");
    listElement.innerHTML = "";

    const filteredTrips = this.#tripModel.trips;
    for (const trip of filteredTrips) {
      render(
        new TripItemComponent({
          trip,
          onDelete: this.#handleDeleteTrip.bind(this),
          onEdit: this.#handleEditTrip.bind(this),
        }),
        listElement
      )
    }
  }

  #handleModelChange() {
    this.#renderTrips();
  }

  addTrip(trip) {
    this.#tripModel.addTrip(trip);
  }

  #handleDeleteTrip(id) {
    this.#tripModel.removeTrip(id);
  }

  #handleEditTrip = (trip) => {
    this.#closeEditModal();

    this.#editModalComponent = new EditTripModalComponent({
      trip,
      onSave: this.#handleUpdateTrip.bind(this),
      onCancel: this.#handleCancelEdit.bind(this),
    });

    render(this.#editModalComponent, document.body);
  }

  #handleUpdateTrip = (id, updatedTrip) => {
    this.#tripModel.updateTrip(id, updatedTrip);
    this.#closeEditModal(); 
  }

  #handleCancelEdit = () => {
    this.#closeEditModal();
  }

  #closeEditModal = () => {
    if (this.#editModalComponent) {
      this.#editModalComponent.element.remove();
      this.#editModalComponent.removeElement();
      
      this.#editModalComponent = null;
    }
  }
}