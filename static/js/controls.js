
const from_slider = document.getElementById("from_slider");
const to_slider = document.getElementById("to_slider");

const from_display = document.getElementById("from_display");
const to_display = document.getElementById("to_display");

const months = [0, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function Month(value){
    return months[value]
}

from_display.textContent = Month(from_slider.value);
to_display.textContent = Month(to_slider.value);

from_slider.addEventListener("input", (event) => {  from_display.textContent = Month(from_slider.value) });
to_slider.addEventListener("input", (event) => {    to_display.textContent = Month(to_slider.value) });