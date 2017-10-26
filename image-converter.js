
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

var brightArr = [];

var image = new Image();
image.onload = () => {
    const width = image.width;
    const height = image.height;
    console.log(width)
    
    ctx.drawImage(image, 0, 0);
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            let rgb = ctx.getImageData(j, i, 1, 1).data;
            var bright = Math.floor (0.33 * rgb[0] + 0.5 * rgb[1] + 0.16 * rgb[2]);
            document.write(bright > 200 ? "&nbsp;" : "@");
        }
        document.write('</br>');
    }
}
image.src = 'happy.jpg';


