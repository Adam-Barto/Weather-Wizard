export class Controls {
    constructor() {
        this.from_slider = document.getElementById("from_slider")
        this.to_slider = document.getElementById("to_slider")
        this.from_display = document.getElementById("from_display")
        this.to_display = document.getElementById("to_display")
        this.months = [0, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.from_slider.oninput = () => this.controlFromSlider(this.from_slider, this.to_slider);
        this.to_slider.oninput = () => this.controlToSlider(this.from_slider, this.to_slider);
        this.fillSlider(this.from_slider, this.to_slider, '#C6C6C6', '#25daa5', this.to_slider)
        this.setToggleAccessible(this.to_slider)
    }

    Month(value){
        return this.months[value]
    }

    controlFromSlider(fromSlider, toSlider) {
      this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    }

    controlToSlider(fromSlider, toSlider) {
      this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
      this.setToggleAccessible(toSlider);
    }

    fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
        const rangeDistance = to.max-to.min;
        const fromPosition = from.value - to.min;
        const toPosition = to.value - to.min;
        controlSlider.style.background = `linear-gradient(
          to right,
          ${sliderColor} 0%,
          ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
          ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
          ${rangeColor} ${(toPosition)/(rangeDistance)*100}%,
          ${sliderColor} ${(toPosition)/(rangeDistance)*100}%,
          ${sliderColor} 100%)`;
    }

    setToggleAccessible(currentTarget) {
      if (Number(currentTarget.value) <= 0 ) {
        this.to_slider.style.zIndex = 2;
      } else {
        this.to_slider.style.zIndex = 0;
      }
    }


};


