let canvas = document.getElementById("graph"),
    ctx = canvas.getContext('2d');

canvas.height *= 10;
canvas.width *= 10;
let w = canvas.width, h = canvas.height;
let hatchGapHor, hatchGapVer;
console.log(w);
console.log(h);

const baseHatchGap= w/16 ;

function drawYAxis(){
    // y axis
    ctx.beginPath();
    ctx.moveTo(w / 2, 10);
    ctx.lineTo(w / 2 - 15, 30);
    ctx.moveTo(w / 2, 10);
    ctx.lineTo(w / 2 + 15, 30);
    ctx.moveTo(w / 2, 10);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.closePath();
}
function drawXAxis(){
    // x axis
    ctx.beginPath();
    ctx.moveTo(w-10, h / 2);
    ctx.lineTo(w - 40, h / 2 - 10);
    ctx.moveTo(w-10, h / 2);
    ctx.lineTo(w - 40, h / 2 + 10);
    ctx.moveTo(w-10, h / 2);
    ctx.lineTo(0, h / 2);
    ctx.stroke();
    ctx.closePath();

}
function verticalHatches(hatchWidth, factor){
    hatchGapHor = ((w-100)/20)*factor;
    let c = w/2
    let cnt = 0;
    while (c < w){
        ctx.moveTo(c, h / 2 - hatchWidth);
        ctx.lineTo(c, h / 2 + hatchWidth);
        c += hatchGapHor;
        cnt++;
        if (cnt === 11) break;
    }
    c = w/2 - hatchGapHor;
    cnt = 0;
    while (c > 0){
        ctx.moveTo(c, h / 2 - hatchWidth);
        ctx.lineTo(c, h / 2 + hatchWidth);
        c -= hatchGapHor;
        cnt++;
        if (cnt === 10) break;
    }
}
function horizontalHatches(hatchWidth, factor){
    let c = h/2
    hatchGapVer = ((h-100)/20)*factor;
    let cnt = 0;
    while (c < h){
        ctx.moveTo(w / 2 - hatchWidth, c);
        ctx.lineTo(w / 2 + hatchWidth, c);
        c += hatchGapVer;
        cnt++;
        if (cnt === 11) break;
    }
    c = h/2 - hatchGapVer;
    cnt = 0;
    while (c > 0){
        ctx.moveTo(w / 2 - hatchWidth, c);
        ctx.lineTo(w / 2 + hatchWidth, c);
        c -= hatchGapVer;
        cnt++;
        if (cnt === 10) break;
    }
    ctx.stroke();
}
function drawLabels(hatchWidth){
    let label = 0.5;
    while (label <= 5){
        let l = label.toString();
        if (l.length === 1) l = " " + l;
        ctx.fillText(l, w / 2 + hatchGapHor*2*label - 15 , h / 2 + hatchWidth * 3.5);
        label += 0.5;
    }
    label = -0.5;
    while (label >= -5){
        let l = label.toString();
        if (l.length === 2) l = " " + l;
        ctx.fillText(l, w / 2 + hatchGapHor*2*label - 15 , h / 2 + hatchWidth * 3.5);
        label -= 0.5;
    }
    label = 0.5;
    while (label <= 5){
        let l = label.toString();
        if (l.length === 1) l = " " + l;
        ctx.fillText(l, w / 2 + hatchWidth*1.5 , h / 2 - hatchGapVer*2*label+20 );
        label += 0.5;
    }
    label = -0.5;
    while (label >= -5){
        let l = label.toString();
        if (l.length === 2) l = " " + l;
        ctx.fillText(l, w / 2 + hatchWidth*1.5, h / 2 - hatchGapVer*2*label +20);
        label -= 0.5;
    }
}
function drawCircle(rad){
    ctx.fillStyle = 'rgba(80,92,236,0.33)';
    ctx.beginPath();
    ctx.moveTo(w/2, h/2);
    ctx.lineTo(w/2 + hatchGapHor*rad*2, h/2);
    ctx.lineTo(w/2, h/2 - hatchGapVer*rad*2);
    ctx.lineTo(w/2, h/2 - hatchGapVer*rad);
    ctx.lineTo(w/2 - hatchGapHor*rad*2,h/2 - hatchGapVer*rad);
    ctx.lineTo(w/2 - hatchGapHor*rad*2,h/2);
    ctx.ellipse(w/2, h/2, hatchGapHor*rad*2, hatchGapVer*rad*2, 0, Math.PI, Math.PI / 2, true);
    ctx.lineTo(w/2,h/2);
    ctx.fill();
    ctx.strokeStyle = '#0115fd';
    ctx.stroke();
    ctx.closePath();
}
function drawDot(hatchWidth, axisFontSize){
    ctx.fillStyle = lastReq.inside ? "lime" : "red";
    ctx.beginPath();
    const x = w/2 + lastReq.x * hatchGapHor*2;
    const y = h/2 - lastReq.y * hatchGapVer*2;
    ctx.arc(x, y, hatchWidth, 0, 2 * Math.PI);
    ctx.fill()
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.font = ` ${axisFontSize}px Roboto`;
    ctx.fillText(`(${lastReq.x}, ${lastReq.y})`, x + hatchWidth, y + 2*hatchWidth);
}
function redrawGraph(rad, factor) {

    let hatchWidth = 15;
    if (factor < 0.4) hatchWidth = 10;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 4   ;
    ctx.strokeStyle = 'black';

    drawYAxis();
    drawXAxis();

    // hatches
    ctx.beginPath();
    verticalHatches(hatchWidth, factor);
    horizontalHatches(hatchWidth, factor);
    ctx.closePath();


    // print labels
    const axisFontSize = baseHatchGap/5;
    ctx.fillStyle = 'black';
    ctx.font = ` ${axisFontSize * 1.4}px Roboto`;
    ctx.fillText('y', w / 2 - hatchWidth * 2.8, 40);
    ctx.fillText('x', w - 40, h / 2 - hatchWidth * 2.4);
    ctx.font = ` ${axisFontSize}px Roboto`;
    drawLabels(hatchWidth);


    if (rad !== 0){
        drawCircle(rad);
    }
    if (lastReq != null){
        drawDot(hatchWidth, axisFontSize);
    }
}
