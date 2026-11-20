import {LeafletMap, TileLayer, Marker, Circle, Polygon} from 'leaflet';

navigator.geolocation.getCurrentPosition((position) => {
    let maLat = position.coords.latitude;
    let maLon = position.coords.longitude;
    let maPrecision = position.coords.accuracy;

    let nice = [43.7102, 7.2620];

    const map = new LeafletMap('map').setView([maLat, maLon], 13);
    new TileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png?api_key=eed6a6b4-d171-43e4-8215-e5f8490b4245', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const marker = new Marker([maLat, maLon]).addTo(map);
    new Marker(nice).addTo(map);

    const polygon = new Polygon([
        [25.7617, -80.1918],
        [32.3078, -64.7505],
        [18.4655, -66.1057]
    ], { color: 'red', }).addTo(map);
});
