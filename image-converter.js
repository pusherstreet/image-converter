var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var image = document.getElementById('image');

ctx.drawImage(image, 0, 0);

console.log(ctx.getImageData(0, 0, 1, 1).data);