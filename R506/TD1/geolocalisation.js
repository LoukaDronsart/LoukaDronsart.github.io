navigator.geolocation.getCurrentPosition((position) => {
  document.getElementById('longitude').textContent = position.coords.longitude;
  document.getElementById('latitude').textContent = position.coords.latitude;
  document.getElementById('altitude').textContent = position.coords.altitude;
});