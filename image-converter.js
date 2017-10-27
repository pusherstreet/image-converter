
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

var brightArr = [];

var image = new Image();
image.onload = () => {
    const width = image.width;
    const height = image.height;
    
    ctx.drawImage(image, 0, 0);
    for(let i = 0; i < height; i++){
        let row = [];
        for(let j = 0; j < width; j++){
            let rgb = ctx.getImageData(j, i, 1, 1).data;
            var bright = Math.sqrt (0.241 * Math.pow(rgb[0], 2) + 0.691 * Math.pow(rgb[1], 2) + 0.68 * Math.pow(rgb[2], 2));
            row.push(bright);
        }
        brightArr.push(row);
    }
    document.body.innerHTML = getStr(brightArr);
    console.log('i am free!');
}

function getStr(arr){
    var sum = 0;
    var count = 0;
    var min = arr[0][0];
    var max = 0;
    arr.forEach(row => {
        row.forEach(col => {
            count++;
            sum += col;
            if(min > col) min = col;
            if(max < col) max = col;
        })
    });
    let brightLimit = sum / count;
    let symbols = split(brightLimit, min, max);
    console.log(symbols);

    let str = '';
    arr.forEach(row => {
        row.forEach(col => {
            for(let i = symbols.length - 1; i >= 0; i--){
                if(col >= symbols[i].val){
                    str += `<span class="point">${symbols[i].symbol}</span>`;
                    break;
                }
            }
        })
        str += "<br />"
    });
    return str;
}
function split(number, min, max){
    let output = [{val: min, symbol: '@'}];
    output.push({val:(number + min) / 2, symbol: '#'});
    output.push({val:number, symbol: '"'});
    output.push({val:(number + max) / 2, symbol:'.'});
    output.push({val: max, symbol: '&nbsp'});
    return output;
}

image.src = 'poroh.jpg';


