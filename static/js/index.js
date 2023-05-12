import { Transfer } from "./transfer.js";
import { Controls } from "./controls.js";


let control = new Controls()


//Enable Controls
control.from_display.textContent = control.Month(control.from_slider.value);
control.to_display.textContent = control.Month(control.to_slider.value);


//Create Connections
control.from_slider.addEventListener("input", (event) => {
    control.from_display.textContent = control.Month(control.from_slider.value)
    build_data()
    });

control.to_slider.addEventListener("input", (event) => {
    control.to_display.textContent = control.Month(control.to_slider.value)
    build_data()
    });
//Create Back to Front

//fetch('/')
//    .then(response => response.json())
//    .then(data => {
//        console.log(data)
//    });
//function grab_data(transfer) {
//    let data_from_backend = transfer.data_grabbed.value
//    console.log(typeof(data_from_backend))
//    console.log(data_from_backend)
//}


function build_data() {
    let from = control.from_display.textContent
    let to = control.to_display.textContent
    let data = {
        'from' : from,
        'to' : to,
    }
    let transfer = new Transfer()
    transfer.sendData(data)
//    grab_data(transfer)
}



