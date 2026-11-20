import {LeafletMap, TileLayer, Marker, Circle, Polygon, Polyline, LatLng, GeoJSON} from 'leaflet';

navigator.geolocation.getCurrentPosition((position) => {
    let maLat = position.coords.latitude;
    let maLon = position.coords.longitude;
    let maPrecision = position.coords.accuracy;

    let nice = [43.7102, 7.2620];
    let marseille = [43.2965, 5.3698];

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

    const circle = new Circle([maLat, maLon], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: maPrecision
    }).addTo(map);

    new Polyline([marseille, nice], { color: 'green' }).addTo(map);

    const pointMoi = new LatLng(maLat, maLon);
    const pointMarseille = new LatLng(marseille[0], marseille[1]);
    const distanceKm = (pointMoi.distanceTo(pointMarseille) / 1000).toFixed(2);

    marker.bindPopup("Distance avec Marseille : " + distanceKm + " km").openPopup();

    fetch('https://geo.api.gouv.fr/departements/15/communes?fields=code,nom,centre&format=geojson&geometry=centre')
        .then(response => response.json())
        .then(data => {
            new GeoJSON(data).addTo(map);
        });

    const urlOsrm = `https://router.project-osrm.org/route/v1/driving/${maLon},${maLat};${nice[1]},${nice[0]}?geometries=geojson`;

    fetch(urlOsrm)
        .then(response => response.json())
        .then(data => {
            const route = data.routes[0].geometry;
            new GeoJSON(route, {
                style: { color: 'purple', weight: 4 }
            }).addTo(map);
        });
});
