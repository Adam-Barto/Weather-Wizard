export class Controls {
    constructor() {
        this.from_slider = document.getElementById("from_slider")
        this.to_slider = document.getElementById("to_slider")
        this.from_display = document.getElementById("from_display")
        this.to_display = document.getElementById("to_display")
        this.months = [0, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }

    Month(value){
        return this.months[value]
    }

};
