
var request = new XMLHttpRequest();
request.open("GET", "data.json", false);
request.send(null)
var json = JSON.parse(request.responseText);
console.log(json); // this will show the info in firebug console

var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');
ValueReference = 100;


// koordinat village
var village = new Array();
for (var i = 0; i < 8; i++) {
    village[i] = new Array(json[i].x, json[i].y, json[i].nama);
}
var radiusvillage = 15;

//data matriks distance
var distance = new Array(8);
var x = ValueReference;
distance[0] = new Array(0, x, x, x, 1, x, x, x);
distance[1] = new Array(x, 0, 1, x, 1, x, x, x);
distance[2] = new Array(x, 1, 0, 1, 1, x, x, x);
distance[3] = new Array(x, x, 1, 0, x, x, x, x);
distance[4] = new Array(1, 1, 1, x, 0, 1, 1, x);
distance[5] = new Array(x, x, x, x, 1, 0, x, x);
distance[6] = new Array(x, x, x, x, 1, x, 0, 1);
distance[7] = new Array(x, x, x, x, x, x, 1, 0);

//data line jalan antar village
var line = new Array();
for (var i = 0; i < village.length; i++)
    line[i] = new Array(0, 0, 0, 0, 0, 0, 0, 0);
    line[0][4] = new Array(542);
    line[1][4] = new Array(542);
    line[1][2] = new Array(542);
    line[2][3] = new Array(542);
    line[2][4] = new Array(542);
    line[4][6] = new Array(542);
    line[4][5] = new Array(542);
    line[6][7] = new Array(542);


//membuat titik kantor village
function drawvillage(x, y, radius, colorMid, colorCircle, colorShadow, widthShadow, letter, colorLetter, Keterangan) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = colorMid;
    ctx.shadowColor = colorShadow;
    ctx.shadowBlur = widthShadow;
    ctx.fill();
    ctx.strokeStyle = colorCircle;
    ctx.stroke();
    ctx.font = "20px Calibri";
    ctx.fillStyle = colorLetter;
    ctx.fillText(letter, x - (radius / 2), y + (radius / 2));
    ctx.font = "20px Calibri";
    ctx.fillStyle = colorLetter;
    ctx.fillText(Keterangan, x + (radius) + 4, y + (radius / 2));
}

//membuat line antar village
function drawline(start, end, color) {
    ctx.beginPath();
    if (end < start) {
    var temp = end;
    end = start;
    start = temp;
    }
    ctx.moveTo(village[start][0], village[start][1]);
    for (var i = 0; i <= (line[start][end].length); i += 2) {
    ctx.lineTo(line[start][end][i], line[start][end][i + 1]);

    }

    ctx.lineTo(village[end][0], village[end][1]);

    ctx.strokeStyle = color;
    ctx.stroke();
}

//Inisialisasi Peta
function showvillage() {
    ctx.lineWidth =
    1;
    for (var i = 0; i < (village.length); i++) {
    drawvillage(village[i][0], village[i][1], radiusvillage, "White", "Black  ", "Blue", 10, i, "Blue", village[i][2]);
    }

}

function showJalan() {
    ctx.lineWidth = 2;
    for (var i = 0; i < (village.length); i++) {
    for (var j = 0; j < (village.length); j++) {
        if (line[i][j] != 0) {
        drawline(i, j, "black");
        }
    }
    }
}

function showMap() {
    ctx.drawImage(img, 0, 0);
}

//Load image untuk peta
var img = new Image();
img.onload = function () {

    showMap();
    showJalan();
    showvillage();

};

// ambil data dari matriks distance
function worth(a, b) {
    return distance[a][b];
}

function bruteforce(end, start) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    showMap();
    showJalan();
    showvillage();
    start = parseInt(start);
    end = parseInt(end);
    ctx.lineWidth = 4;
    if(start==0){
      if(end==1){
        drawline(4, 1, "Yellow");
        drawline(0, 4, "Yellow");

      }
      if(end==2){
        drawline(4, 2, "Yellow");
        drawline(0, 4, "Yellow");
      }
      if(end==3){
        drawline(2, 3, "Yellow");
        drawline(4, 2, "Yellow");
        drawline(0, 4, "Yellow");
      }
      if(end==4){
        drawline(0, 4, "Yellow");
      }
      if(end==5){
        drawline(4, 5, "Yellow");
        drawline(0, 4, "Yellow");
      }
      if(end==6){
        drawline(4, 6, "Yellow");
        drawline(0, 4, "Yellow");
      }
      if(end==7){
        drawline(6, 7, "Yellow");
        drawline(4, 6, "Yellow");
        drawline(0, 4, "Yellow");
      }
    }
    if(start==1){
      if(end==2){
        drawline(1, 2, "Yellow");

      }
      if(end==0){
        drawline(4, 1, "Yellow");
        drawline(0, 4, "Yellow");
      }
      if(end==3){
        drawline(1, 2, "Yellow");
        drawline(2, 3, "Yellow");
      }
      if(end==4){
        drawline(1, 4, "Yellow");
      }
      if(end==5){
        drawline(4, 5, "Yellow");
        drawline(1, 4, "Yellow");
      }
      if(end==6){
        drawline(4, 6, "Yellow");
        drawline(1, 4, "Yellow");
      }
      if(end==7){
        drawline(6, 7, "Yellow");
        drawline(4, 6, "Yellow");
        drawline(1, 4, "Yellow");
      }
    }
    if(start==2){
      if(end==1){
        drawline(1, 2, "Yellow");

      }
      if(end==0){
        drawline(4, 2, "Yellow");
        drawline(0, 4, "Yellow");
      }
      if(end==3){
        drawline(2, 3, "Yellow");
      }
      if(end==4){
        drawline(2, 4, "Yellow");
      }
      if(end==5){
        drawline(4, 5, "Yellow");
        drawline(2, 4, "Yellow");
      }
      if(end==6){
        drawline(4, 6, "Yellow");
        drawline(2, 4, "Yellow");
      }
      if(end==7){
        drawline(6, 7, "Yellow");
        drawline(4, 6, "Yellow");
        drawline(2, 4, "Yellow");
      }
    }
    if(start==3){
      if(end==2){
        drawline(3, 2, "Yellow");

      }
      if(end==0){
        drawline(3, 2, "Yellow");
        drawline(4, 2, "Yellow");
        drawline(0, 4, "Yellow");
      }
      if(end==1){
        drawline(1, 2, "Yellow");
        drawline(2, 3, "Yellow");
      }
      if(end==4){
        drawline(2, 3, "Yellow");
        drawline(2, 4, "Yellow");
      }
      if(end==5){
        drawline(2, 3, "Yellow");
        drawline(4, 5, "Yellow");
        drawline(2, 4, "Yellow");
      }
      if(end==6){
        drawline(2, 3, "Yellow");
        drawline(4, 6, "Yellow");
        drawline(2, 4, "Yellow");
      }
      if(end==7){
        drawline(2, 3, "Yellow");
        drawline(6, 7, "Yellow");
        drawline(4, 6, "Yellow");
        drawline(2, 4, "Yellow");
      }
    }
    if(start==5){
      if(end==2){
        drawline(4, 5, "Yellow");
        drawline(4, 2, "Yellow");

      }
      if(end==0){
        drawline(4, 5, "Yellow");
        drawline(0, 4, "Yellow");
      }
      if(end==1){
        drawline(4, 5, "Yellow");
        drawline(1, 4, "Yellow");
      }
      if(end==3){
        drawline(4, 5, "Yellow");
        drawline(2, 3, "Yellow");
        drawline(2, 4, "Yellow");
      }
      if(end==4){
        drawline(4, 5, "Yellow");
      }
      if(end==6){
        drawline(4, 5, "Yellow");
        drawline(4, 6, "Yellow");
      }
      if(end==7){
        drawline(4, 5, "Yellow");
        drawline(6, 7, "Yellow");
        drawline(4, 6, "Yellow");
      }
    }
    if(start==4){
      if(end==2){
        drawline(4, 2, "Yellow");

      }
      if(end==0){
        drawline(0, 4, "Yellow");
      }
      if(end==1){
        drawline(1, 4, "Yellow");
      }
      if(end==3){
        drawline(2, 3, "Yellow");
        drawline(2, 4, "Yellow");
      }
      if(end==5){
        drawline(4, 5, "Yellow");
      }
      if(end==6){
        drawline(4, 6, "Yellow");
      }
      if(end==7){
        drawline(6, 7, "Yellow");
        drawline(4, 6, "Yellow");
      }
    }
    if(start==6){
      if(end==2){
        drawline(4, 6, "Yellow");
        drawline(4, 2, "Yellow");

      }
      if(end==0){
        drawline(4, 6, "Yellow");
        drawline(0, 4, "Yellow");
      }
      if(end==1){
        drawline(4, 6, "Yellow");
        drawline(1, 4, "Yellow");
      }
      if(end==3){
        drawline(4, 6, "Yellow");
        drawline(2, 3, "Yellow");
        drawline(2, 4, "Yellow");
      }
      if(end==5){
        drawline(4, 6, "Yellow");
        drawline(4, 5, "Yellow");
      }
      if(end==4){
        drawline(4, 6, "Yellow");
      }
      if(end==7){
        drawline(6, 7, "Yellow");
      }
    }
    if(start==7){
      if(end==2){
        drawline(7, 6, "Yellow");
        drawline(4, 6, "Yellow");
        drawline(4, 2, "Yellow");

      }
      if(end==0){
        drawline(7, 6, "Yellow");
        drawline(4, 6, "Yellow");
        drawline(0, 4, "Yellow");
      }
      if(end==1){
        drawline(7, 6, "Yellow");
        drawline(4, 6, "Yellow");
        drawline(1, 4, "Yellow");
      }
      if(end==3){
        drawline(7, 6, "Yellow");
        drawline(4, 6, "Yellow");
        drawline(2, 3, "Yellow");
        drawline(2, 4, "Yellow");
      }
      if(end==5){
        drawline(7, 6, "Yellow");
        drawline(4, 6, "Yellow");
        drawline(4, 5, "Yellow");
      }
      if(end==4){
        drawline(7, 6, "Yellow");
        drawline(4, 6, "Yellow");
      }
      if(end==6){
        drawline(6, 7, "Yellow");
      }
    }
    showvillage();


}
