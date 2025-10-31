import TripFilterComponent from './view/Filtertrip-component.js';
import TripsPresenter from './presenter/tripsPresenter.js';
import TripModel from './model/tripModel.js';
import { trips } from './mock/trips.js';
import { render, RenderPosition } from './framework/view/render.js';
import HeaderComponent from './view/Header-component.js';
import AddTripComponent from './view/AddTrip-component.js';
import ContainerComponent from './view/containerComponent.js';

const bodyContainer = document.querySelector('.body');
const containerComponent = new ContainerComponent();

render(containerComponent, bodyContainer);

const tripModel = new TripModel(trips);
const tripsPresenter = new TripsPresenter({
  boardContainer: containerComponent.element,
  tripModel
});

function handleAddTrip(trip) {
  tripsPresenter.addTrip(trip);
}

function handleFilterChange(filterState) {
  tripsPresenter.setFilter(filterState);
}

render(new HeaderComponent(), containerComponent.element, RenderPosition.AFTERBEGIN);
render(new AddTripComponent({ onSubmit: handleAddTrip }), containerComponent.element, RenderPosition.AFTERBEGIN);
render(new TripFilterComponent({ onChange: handleFilterChange }), containerComponent.element, RenderPosition.BEFOREEND);

tripsPresenter.init();
