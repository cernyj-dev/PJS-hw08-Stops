function fetchStopsData() {
    return new Promise(resolve => {
        setTimeout(() => resolve(window.stopsData), 1000);
    });
}

window.fetchStopsData = fetchStopsData;
