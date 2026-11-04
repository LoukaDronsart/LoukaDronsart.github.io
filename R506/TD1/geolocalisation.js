navigator.geolocation.getCurrentPosition((position) => {
    document.getElementById('longitude').textContent = position.coords.longitude;
    document.getElementById('latitude').textContent = position.coords.latitude;
    document.getElementById('altitude').textContent = position.coords.altitude;
    document.getElementById('precision').textContent = position.coords.accuracy;
    document.getElementById('vitesse').textContent = position.coords.speed;

    let date = new Date(position.timestamp);
    document.getElementById('date').textContent = date.toLocaleString();
});