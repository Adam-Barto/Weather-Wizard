import { Transfer } from "./transfer.js";
import { Controls } from "./controls.js";


let control = new Controls()


//Enable Controls
control.from_display.textContent = control.Month(control.from_slider.value);
control.to_display.textContent = control.Month(control.to_slider.value);


//Create Connections
control.from_slider.addEventListener("input", (event) => {
    control.from_display.textContent = control.Month(control.from_slider.value)
    let transfer = new Transfer()
    transfer.sendData(control.Month(control.to_slider.value))
    });
control.to_slider.addEventListener("input", (event) => {
    control.to_display.textContent = control.Month(control.to_slider.value)
    let transfer = new Transfer()
    transfer.sendData(control.Month(control.to_slider.value))
    });
//
//function Preform_Data

