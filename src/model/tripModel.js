export default class TripModel {
    #trips = [];
    #observers = [];

    constructor(initialTrips = []) {
        this.#trips = [...initialTrips];
    }

    get trips() {

        return this.#trips;
    }

    addTrip(trip) {
        this.#trips.push(trip);
        this.#notifyObservers();
    }

    removeTrip(id) {
        this.#trips = this.#trips.filter(t => t.id !== id);
        this.#notifyObservers();
    }

    updateTrip(id, updatedTrip) {
        const index = this.#trips.findIndex(t => t.id === id);

        if (index !== -1) {
            this.#trips[index] = updatedTrip;
            this.#notifyObservers();
        }
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    #notifyObservers() {
        for (const observer of this.#observers) {
            observer();
        }
    }

    getFilteredTrips(dateFrom, dateTo, onlyCompleted) {
        return this.#trips.filter((trip) => {
            const tripDateTimestamp = Date.parse(trip.date);

            let matchDate = true;
            
            if (dateFrom) {
                const dateFromTimestamp = Date.parse(dateFrom);
                matchDate = matchDate && (tripDateTimestamp >= dateFromTimestamp);
            }

            if (dateTo) {
                const dateToTimestamp = Date.parse(dateTo);
                matchDate = matchDate && (tripDateTimestamp <= dateToTimestamp);
            }
            
            const matchStatus = !onlyCompleted || trip.status === 'Completed';
            
            return matchDate && matchStatus;
        });
    }
}