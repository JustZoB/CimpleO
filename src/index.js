const inputs = document.querySelectorAll(".form-input");

inputs.forEach(function(el, index) {
    el.addEventListener('focus', () => {
        el.parentElement.classList.add("focused");
    });
    el.addEventListener('blur', () => {
        if (el.value == "") {
            el.classList.remove("filled");
            el.parentElement.classList.remove("focused");
        } else {
            el.classList.add("filled");
        }
    });
});

const carousel = document.querySelector(".carousel__wrap__elements");
const carouselElements = document.querySelectorAll(".carousel__wrap__elements .carousel__item");
const carouselButtons = document.querySelector(".carousel__buttons");

let counter = 2;
const button = "<span></span>";
const size = carouselElements[0].clientWidth;
carousel.style.transform = "translateX(" + (-size * counter) + "px)";

for (let i = 0; i < carouselElements.length; i++) {
    carouselButtons.innerHTML += button;
}

window.addEventListener('resize', () => {
    const size = carouselElements[0].clientWidth;
    carousel.style.transform = "translateX(" + (-size * counter) + "px)";
});

const carouselButtonsAll = document.querySelectorAll(".carousel__buttons span");
for (let i = 0; i < carouselElements.length; i++) {
    carouselButtonsAll[i].onclick = function() {
        const speed = Math.abs(i - counter);

        if (i < counter) {
            move(i, speed, false);
            changeButton(counter);
        } else if (i > counter) {
            move(i, speed, true);
            changeButton(counter);
        }
    }
    if (i === counter) {
        carouselButtonsAll[i].classList.add("active");
    }
}

function move(end, speed, direction) {
    const size = carouselElements[0].clientWidth;
    const sizeSpeed = size / 60;
    let startAnimation = -size * counter;
    let endAnimation = -size * end;
    counter = end;

    if (direction) {
        let prevSlide = setInterval(function() {
            startAnimation -= sizeSpeed * speed;
            if (startAnimation <= endAnimation) {
                clearInterval(prevSlide);
            }
            carousel.style.transform = "translateX(" + startAnimation + "px)";
        }, 10);
    } else {
        let prevSlide = setInterval(function() {
            startAnimation += sizeSpeed * speed;
            if (startAnimation >= endAnimation) {
                clearInterval(prevSlide);
            }
            carousel.style.transform = "translateX(" + startAnimation + "px)";
        }, 10);
    }
}

function changeButton (counter) {
    for (let i = 0; i < carouselButtonsAll.length; i++) {
        carouselButtonsAll[i].classList.remove("active");
    }
    carouselButtonsAll[counter].classList.add("active");
}
