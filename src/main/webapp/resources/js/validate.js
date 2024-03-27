let slider;
let zoom = 1;
let r_value = 0
let lastReq = null;
let r_selector;
document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById("graph");
    ctx = canvas.getContext('2d');
    canvas.height *= 10;
    canvas.width *= 10;
    w = canvas.width;
    h = canvas.height;

    baseHatchGap= w/16 ;
    axisFontSize = baseHatchGap/5;
    r_selector = document.getElementsByClassName("r")[0];
    r_value = r_selector.value;
    redrawGraph(r_value, zoom);

    slider = document.getElementById("resize_slider");

    slider.addEventListener("change",resize);
    canvas.addEventListener("mousedown", function(e) {
        e.preventDefault();
        getCursorPosition(canvas, e);
    });
});

function rListener() {
    if (!isNumeric(r_selector.value) ||parseFloat(r_selector.value) < 0 || parseFloat(r_selector.value) > 5){
        console.log("R wrong");
        generateError();
    }
    else{
        r_value = r_selector.value;
        redrawGraph(r_value, zoom);
    }
}
function isNumeric(x) {
    return !isNaN(parseFloat(x)) && isFinite(x);
}
function generateError(){
    alert("ฅ^•ﻌ•^ฅ  \n R value must be an integer between 0 and 5 \n ฅ^•ﻌ•^ฅ");
}
function resize(){
    //alert(slider.value);
    zoom = 1 + slider.value/30;
    redrawGraph(r_value, zoom);
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    let x = event.clientX - rect.left
    //let y = event.clientY - rect.top
    let y = rect.bottom - event.clientY
    y = y / (rect.bottom - rect.top) * h
    x = x / (rect.right - rect.left) * w;
    y = h - y;


    y = (h / 2 - y);
    x -= w / 2


    x /= (hatchGapHor * 2)
    y /= (hatchGapVer * 2)
    x = x.toFixed(2)
    y = y.toFixed(2)
    console.log("x: " + x + " y: " + y)

    let inputElement = document.getElementById("hidden_input_form:x-value");
    console.log(inputElement)
    inputElement.value = x;

    inputElement = document.getElementById("hidden_input_form:y-value");
    console.log(inputElement)
    inputElement.value = y;
    console.log(inputElement);

    inputElement = document.getElementById("hidden_input_form:r-value");
    console.log(inputElement)
    inputElement.value = r_value;
    console.log(inputElement);


    let submitButton = document.getElementById('hidden_input_form:send');

    submitButton.click();

}

function setLastReq(x, y, isOk) {
    console.log(x);
    console.log(y);
    console.log(isOk);
    lastReq = {x: parseFloat(x), y: parseFloat(y), inside: isOk === "true"}
    redrawGraph(r_value, zoom)
}
