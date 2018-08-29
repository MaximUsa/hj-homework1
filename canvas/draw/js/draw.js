'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let curves = [];
let drawing = false;
let raiseHue = true;
let raiseLine = true;
let needsRepaint = false;
let colorsHue = getRandom(0, 359);
let brushRadius = 100;

document.body.style.overflow = 'hidden';
window.addEventListener('load', changeCanvasSize);
window.addEventListener('resize', changeCanvasSize);
canvas.addEventListener('dblclick', clearCanvas);
canvas.addEventListener("mousedown", startNewCurve);
canvas.addEventListener("mousemove", drawCurve);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

class CurvePoint {
    constructor(x, y, hue, brushRadius) {
        this.x = x;
        this.y = y;
        this.hue = hue;
        this.brushRadius = brushRadius;
    }
}

function changeCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    clearCanvas();
}

function clearCanvas() {
    curves = [];
    needsRepaint = true;
}

function startNewCurve(event) {
    const curve = [];
    drawing = true;
    raiseHue = !event.shiftKey;

    curve.push(new CurvePoint(event.offsetX, event.offsetY, colorsHue, brushRadius));
    curves.push(curve);
    needsRepaint = true;
}

function drawCurve(event) {
    if (drawing) {
        const point = new CurvePoint(event.offsetX, event.offsetY, colorsHue, brushRadius);

        curves[curves.length - 1].push(point);
        needsRepaint = true;
    }
}

function circle(point) {
    const pointCoords = [point.x, point.y];
    ctx.beginPath();
    ctx.arc(...pointCoords, point.brushRadius / 2, 0, 2 * Math.PI);
    ctx.fillStyle = `hsl(${point.hue}, 100%, 50%)`;
    ctx.fill();
}

function smoothCurve(points) {
    for (let i = 0; i < points.length - 1; i++) {
        let pointFrom = points[i];
        let pointTo = points[i + 1];

        ctx.beginPath();
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        ctx.lineWidth = pointFrom.brushRadius;
        ctx.strokeStyle = `hsl(${pointFrom.hue}, 100%, 50%)`;
        ctx.lineTo(pointFrom.x, pointFrom.y);
        ctx.stroke();

        ctx.lineWidth = pointTo.brushRadius;
        ctx.strokeStyle = `hsl(${pointTo.hue}, 100%, 50%)`;
        ctx.lineTo(pointTo.x, pointTo.y);
        ctx.stroke();

        ctx.closePath();
    }
}

function repaint() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    curves
        .forEach((curve) => {
            circle(curve[0]);

            smoothCurve(curve);
        });
}

function tick() {
    if (needsRepaint) {
        repaint();
        needsRepaint = false;

        raiseHue ? colorsHue++ : colorsHue--;
        raiseLine ? brushRadius++ : brushRadius--;

        if (colorsHue > 359) {
            colorsHue = 0;
        } else if (colorsHue < 0) {
            colorsHue = 359;
        }

        if (brushRadius >= 100) {
            raiseLine = false;
        } else if (brushRadius <= 5) {
            raiseLine = true;
        }
    }

    window.requestAnimationFrame(tick);
}

function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function stopDrawing() {
    drawing = false;
}

tick();