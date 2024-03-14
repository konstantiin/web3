let slider;
let zoom = 1;
let r_value = 0
let lastReq = null;

document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById("graph");
    ctx = canvas.getContext('2d');
    canvas.height *= 10;
    canvas.width *= 10;
    w = canvas.width;
    h = canvas.height;

    baseHatchGap= w/16 ;
    axisFontSize = baseHatchGap/5;
    redrawGraph(r_value, zoom);

    slider = document.getElementById("resize_slider");

    slider.addEventListener("change",resize);
    canvas.addEventListener('mousedown', function(e) {
        e.preventDefault();
        getCursorPosition(canvas, e)
    });
})

function rListener() {
    let r_selector = document.getElementsByClassName("r")[0];
    r_value = r_selector.value;
    console.log(r_selector)
    console.log(r_value)
    if (!isNumeric(r_value) ||parseFloat(r_value) < 0 || parseFloat(r_value) > 5){
        console.log("R wrong");
        generateError();
    }
    else{
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
    y = y/(rect.bottom - rect.top) * h
    x = x /(rect.right - rect.left)* w;
    y = h - y;


    y = (h/2 - y);
    x -= w/2


    x/= (hatchGapHor*2)
    y /= (hatchGapVer*2)
    x = x.toFixed(2)
    y = y.toFixed(2)
    console.log("x: " + x + " y: " + y)
}
function setLastReq(x, y, isOk){
    lastReq = {x: parseFloat(x), y: parseFloat(y), inside: isOk === "true"}
    redrawGraph(r_value, zoom)
}
