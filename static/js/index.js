import { Transfer } from "./transfer.js";
import { Controls } from "./controls.js";


let control = new Controls()


//Enable Controls
control.from_display.textContent = control.Month(control.from_slider.value);
control.to_display.textContent = control.Month(control.to_slider.value);


//Create Connections
control.from_slider.addEventListener("input", (event) => {
    control.from_display.textContent = control.Month(control.from_slider.value)
    });

control.to_slider.addEventListener("input", (event) => {
    control.to_display.textContent = control.Month(control.to_slider.value)
    });

document.getElementById("submit").addEventListener("click", (event) => {
        build_data()
});

//Create Back to Front
var map = L.map('map').setView([38, -98], 4);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = null;
function onMapClick(e) {
//    alert("You clicked the map at " + e.latlng);
    if (marker == null) {
        marker = new L.marker(e.latlng).addTo(map);

    } else {
        map.removeLayer(marker)
        marker = new L.marker(e.latlng).addTo(map);
    }

//    alert(typeof(e.latlng))
}

map.on('click', onMapClick);


function build_data() {
    let from = control.from_display.textContent
    let to = control.to_display.textContent
    if (marker) {
        let target_point = marker.getLatLng()
        let data = {
            'from' : from,
            'to' : to,
            'lat' : target_point.lat,
            'lng' : target_point.lng
            }
            let transfer = new Transfer()
            transfer.sendData(data)
    }

    //    grab_data(transfer)
}



