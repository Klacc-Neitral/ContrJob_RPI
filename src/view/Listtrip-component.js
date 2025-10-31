import { AbstractComponent } from '../framework/view/abstract-component.js';


export default class TripListComponent extends AbstractComponent {
    get template() {
        return `
        <div class="trip-list">
            <h2>Поездки</h2>
            <ul id="trip-list">
                
            </ul>
        </div>`
    }
}