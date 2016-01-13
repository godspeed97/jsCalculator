window.onload = function () {

    var calcDisplay = document.querySelector('.display'),
        calcMemory = document.querySelector('.memory'),
        calc = document.querySelector('.calculator');

    calc.addEventListener('click', calcControl, false);

    function calcControl(e) {
        if (e.target !== e.currentTarget) {
            var result = Calculator.keyPressed(e.target.textContent);
            calcDisplay.value = result[0];
            calcMemory.value = result[1];
        }
    }

};