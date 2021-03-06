var alt = require('../alt');

class LocationActions {
    updateLocations(locations) {
        this.dispatch(locations);
    }

    fetchLocations() {
        // we dispatch an event here so we can have "loading" state.
        this.dispatch();
        LocationSource.fetch()
            .then((locations) => {
                // we can access other actions within our action through `this.actions`
                this.actions.updateLocations(locations);
            })
            .catch((errorMessage) => {
                this.actions.locationsFailed(errorMessage);
            });
    }
    locationsFailed(errorMessage) {
        this.dispatch(errorMessage);
    }
}

module.exports = alt.createActions(LocationActions);
