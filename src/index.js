let inputs = document.querySelectorAll(".form-input");

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
