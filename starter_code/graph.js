var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var width = 400;
var height = 400;

function graphData() {
    ctx.clearRect(0, 0, width, height);
    var length = data.length;

    for (var i = 0; i < length; i++) {

        var color = selectColor(data[i].type);
        drawPoint(data[i].rooms, data[i].area, color);
    }
}

function drawPoint(rooms, area, color) {

    ctx.fillStyle = color;

    var x = (rooms - roomsMin) * (width / roomsRange);
    var y = (area - areaMin) * (height / areaRange);
    y = Math.abs(y - height);

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2, true);
    ctx.fill();
}


function drawKCircle(rooms, area, type, k) {
    drawPoint(rooms, area, 'gray');
    ctx.strokeStyle = selectColor(type);

    var x = (rooms - roomsMin) * (width / roomsRange);
    var y = (area - areaMin) * (height / areaRange);
    y = Math.abs(y - height);

    var radius = data[k - 1].distance * width;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();
}

function selectColor(type) {
    if (type === 'apartment') return 'red';
    if (type === 'house') return 'green';
    if (type === 'flat') return 'blue';
    return 'gray';
}