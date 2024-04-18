class Locations {
  #items = new Map();

  constructor() {}

  addLocation(locationName, value) {
    this.#items.set(locationName, value);
  }

  removeLocation(locationName) {
    this.#items.delete(locationName)
  }

  getLocation(locationName) {
    return this.#items.get(locationName);
  }

  currentLocationColor(locationName) {
    return locations.getLocation(locationName) === location.pathname
    ? 'green'
    : '#2c2c2c';
  }
  
  getLocations() {
    return this.#items;
  }
}

const locations = new Locations();
locations.addLocation('home', '/');
locations.addLocation('profile', '/profile');
locations.addLocation('offers', '/offers');

export default locations;
