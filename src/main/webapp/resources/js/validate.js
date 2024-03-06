let slider;
let zoom = 1;
let r_value = 3
let r_selector;
let selected_x;
let lastReq = null;

redrawGraph(r_value, zoom);
// r_selector = $(".r");
// selected_x = $(".selected_x");
// //slider = document.getElementById("resize_slider");
//
// function resize(){
//     //alert(slider.value);
//     zoom = 1 + slider.value/30;
//     redrawGraph(r_value, zoom);
// }
//
// slider.addEventListener("change",resize);
//
//
//
// $(".x").click(function() {
//
//     selected_x.prop("class", "x");
//     $(this).prop("class", "selected_x");
//     $("#x_value").attr("value", $(this).attr("value"));
//     selected_x = $(this)
// });
// r_selector.on("change", function() {
//     r_value = $(this).val();
//     if ($(this).is(":invalid")){
//         generateError();
//         return;
//     }
//     redrawGraph(r_value, zoom);
// });
// function generateError(){
//     alert("ฅ^•ﻌ•^ฅ  \n R value must be an integer between 0 and 5 \n ฅ^•ﻌ•^ฅ");
// }
// function validate(){
//     console.log("validation ...");
//     const re = new RegExp("[0-5]");
//     if (!re.test(r_selector.attr("value"))){
//         generateError();
//         console.log("failed");
//         return false;
//     }
//     console.log("success");
//     return true;
// }
// function successful(data){
//     console.log(data);
//
//     $(".validate_button").attr("disabled", false);
//
//
//     $("#result_table").html(data);
//     lastReq = new Dot($("#last_x").text(), $("#last_y").text(), $("#last_res").text());
//     redrawGraph(r_value, zoom);
// }
// function error_ajax(error){
//     console.log(error);
//     $(".validate_button").attr("disabled", false);
// }
// function getCursorPosition(canvas, event) {
//     const rect = canvas.getBoundingClientRect()
//     let x = event.clientX - rect.left
//     //let y = event.clientY - rect.top
//     let y = rect.bottom - event.clientY
//     y = y/(rect.bottom - rect.top) * h
//     x = x /(rect.right - rect.left)* w;
//     y = h - y;
//
//
//     y = (h/2 - y);
//     x -= w/2
//
//
//     x/= (hatchGapHor*2)
//     y /= (hatchGapVer*2)
//     x = x.toFixed(2)
//     y = y.toFixed(2)
//     console.log("x: " + x + " y: " + y)
//     $.ajax({
//         url: 'control',     method: "post",
//         data: `&x_coordinate=${x}&y_coordinate=${y}&r_coordinate=${r_value}&timezone=${new Date().getTimezoneOffset()}`,
//         dataType: "html",
//
//         success: successful,
//         error: error_ajax,
//     });
//     //y = y / rect.top * h;
//
//
// }
// canvas.addEventListener('mousedown', function(e) {
//     e.preventDefault();
//     getCursorPosition(canvas, e)
// })
// $("#input_form").on("submit", function(event){
//     event.preventDefault();
//
//     if(!validate()){
//         return
//     }
//
//
//     $(".validate_button").attr("disabled", true);
//     $.ajax({
//         url: 'control',     method: "post",
//         data: $(this).serialize() + `&timezone=${new Date().getTimezoneOffset()}`,
//         dataType: "html",
//
//         success: successful,
//         error: error_ajax,
//     });
// });