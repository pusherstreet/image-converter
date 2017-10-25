var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var image = document.getElementById('image');

ctx.drawImage(image, 0, 0);

var rgb = ctx.getImageData(0, 0, 1, 1).data;
var bright = 0.33 * rgb[0] + 0.5 * rgb[1] + 0.16 * rgb[2];

console.log(bright);
