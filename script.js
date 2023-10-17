//Ejercicio 1
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

navigator.geolocation.getCurrentPosition((position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  const mapId = "map1";
  const map1 = L.map(mapId).setView([latitude, longitude], 13);
  var Stadia_AlidadeSmoothDark = L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }
  ).addTo(map1);
  const marker = L.marker([latitude, longitude]).addTo(map1);
});


//Ejercicio 2
const mapId = "map2";
  const map2 = L.map(mapId).setView([34.052235, -118.243683], 13);
  var Stadia_AlidadeSmoothDark = L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }
  ).addTo(map2);

let markers = []; 
let contador = 0; 

async function getPublicTransport() {
    try {
        let metroJson = await fetch('https://api.metro.net/LACMTA/vehicle_positions/all?geojson=false');
        let metro = await metroJson.json();
        metro = await metro.map(element => {return {pos: element.position,
                                            vehicleId: element.vehicle.vehicle_id }});

        if (contador === 0) {
            for (let i = 0; i < metro.length; i++) {
                markers.push(L.marker([metro[i].pos.latitude, metro[i].pos.longitude]).bindPopup(`Vehicle_id: ${metro[i].vehicleId}`).addTo(map2));
            }
        } else {
            for (let i = 0; i < markers.length; i++) {
                let lat = metro[i].pos.latitude;
                let lng = metro[i].pos.longitude;
                let newLatLng = new L.LatLng(lat, lng);
                markers[i].setLatLng(newLatLng);
            }
        }

        contador++;

    } catch (error) {
        console.error("Error fetching or updating data:", error);
    }
}


getPublicTransport();


setInterval(getPublicTransport, 5000);


  