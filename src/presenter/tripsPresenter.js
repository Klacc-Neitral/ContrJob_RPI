import { render, RenderPosition } from '../framework/view/render.js';
import TripListComponent from '../view/Listtrip-component.js';
import TripItemComponent from '../view/trip-component.js';
import EditTripModalComponent from '../view/ChangeTrip-component.js';
import TripFilterComponent from '../view/Filtertrip-component.js';

export default class TripsPresenter {
  #tripModel = null;
  #boardContainer = null;
  #tripListComponent = new TripListComponent();
  #editModalComponent = null; 
  #editingTripComponent = null; 
  
  #currentFilter = { dateFrom: '', dateTo: '', onlyCompleted: false }; 

  constructor({ boardContainer, tripModel }) {
    this.#boardContainer = boardContainer;
    this.#tripModel = tripModel;
    this.#tripModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    this.#renderFilter(); 
    render(this.#tripListComponent, this.#boardContainer);
    this.#renderTrips();
  }



#renderFilter() {
    const filterComponent = new TripFilterComponent({
        onChange: this.#handleFilterChange.bind(this),
    });
    
    render(filterComponent, this.#boardContainer, RenderPosition.BEFOREEND); 
  }
  
  #renderTrips() {

    this.#closeEditModal(); 
    
    const listElement = this.#tripListComponent.element.querySelector("#trip-list");
    listElement.innerHTML = "";
    
    const filteredTrips = this.#tripModel.getFilteredTrips(
        this.#currentFilter.dateFrom, 
        this.#currentFilter.dateTo, 
        this.#currentFilter.onlyCompleted
    );
    
    if (filteredTrips.length === 0) {
        listElement.innerHTML = '<li>Нет поездок, соответствующих фильтру.</li>';
        return;
    }

    for (const trip of filteredTrips) {
      this.#renderTrip(trip, listElement);
    }
  }

  #renderTrip(trip, container) {
      const tripComponent = new TripItemComponent({
          trip,
          onDelete: this.#handleDeleteTrip.bind(this),
          onEdit: this.#handleEditTrip.bind(this),
      });

      render(tripComponent, container);
  }

  #handleModelChange() {
    this.#renderTrips();
  }

  #handleFilterChange = ({ dateFrom, dateTo, onlyCompleted }) => {
    this.#currentFilter = { dateFrom, dateTo, onlyCompleted };
    this.#renderTrips();
  }


  addTrip(trip) {
    this.#tripModel.addTrip(trip);
  }

  #handleDeleteTrip(id) {
    this.#tripModel.removeTrip(id);
  }

  #handleEditTrip = (tripComponent) => {
   
    this.#closeEditModal();

    const trip = tripComponent.trip; 

    this.#editingTripComponent = tripComponent;

    this.#editModalComponent = new EditTripModalComponent({
      trip,
      onSave: this.#handleUpdateTrip.bind(this),
      onCancel: this.#handleCancelEdit.bind(this),
    });


    const parentElement = this.#editingTripComponent.element.parentElement;
    const nextSibling = this.#editingTripComponent.element.nextSibling;


    parentElement.insertBefore(this.#editModalComponent.element, nextSibling);
    
    this.#editingTripComponent.element.style.display = 'none'; 
  }

  #handleUpdateTrip = (id, updatedTrip) => {
    this.#tripModel.updateTrip(id, updatedTrip);
  }

  #handleCancelEdit = () => {
    this.#closeEditModal();
  }


  #closeEditModal = () => {
    if (this.#editModalComponent) {
      this.#editModalComponent.element.remove();
      this.#editModalComponent.removeElement(); 
      this.#editModalComponent = null;
      
     
      if (this.#editingTripComponent) {
        this.#editingTripComponent.element.style.display = '';
        this.#editingTripComponent = null; 
      }
    }
  }
}