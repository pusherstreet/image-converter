
const maxWith = 200;
const maxHeight = 200;
const chars = ['@', '&', 'R', 'H', 'N', 'G', 'I', '#', 'q', 'o', 'j', 'i', 'r',  ';', '*', ':', '^', '"', '`', ',', '.', '&nbsp'];

var canvas = document.createElement('canvas');
var container = document.getElementById('container');
var upload = document.getElementById('uploadImage');
var ctx = canvas.getContext('2d');

canvas.height = maxHeight;
canvas.width = maxWith;


upload.onchange = function(e){
    let image = new Image();
    image.onload = imageLoadHandler;
    clear();
    const file = e.target.files[0];
    try{
        let reader = new FileReader();
        reader.onloadend = function(){
            console.log(reader.result);
            image.src = reader.result;
        }
        reader.readAsDataURL(file);
    }
    catch (error){
        console.log(error);
        alert('Error. Please try select another file.')
    }
 
}

const imageLoadHandler = (e) => {
    let brightArr = [];
    let image = e.target;
    prepareImage(image);
    const width = image.width;
    const height = image.height;
    
    ctx.drawImage(image, 0, 0, width, height);
    for(let i = 0; i < height; i++){
        let row = [];
        for(let j = 0; j < width; j++){
            let rgb = ctx.getImageData(j, i, 1, 1).data;
            var bright = Math.sqrt (0.241 * Math.pow(rgb[0], 2) + 0.691 * Math.pow(rgb[1], 2) + 0.68 * Math.pow(rgb[2], 2));
            row.push(bright);
        }
        brightArr.push(row);
    }
    document.getElementById('container').innerHTML = getStr(brightArr);
    
}


function getStr(arr){
    var min = arr[0][0];
    var max = 0;
    arr.forEach(row => {
        row.forEach(col => {
            if(min > col) min = col;
            if(max < col) max = col;
        })
    });
    let symbols = getCharsArray(min, max);
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

function getCharsArray(min, max){
    let output = [];
    let step = (max - min) / chars.length;
    let pos = 0;
    while(min <= max){
        output.push({
            val: min,
            symbol: chars[pos]
        });
        min += step;
        pos++;
    }
    return output;
}

function clear(){
    document.getElementById('container').innerHTML = '<span style="font-size: 16px;">Loading...</span>';
    
}

function prepareImage(image){
    if(!image.width || !image.width) throw "Invalid image";
    if(image.height <= maxHeight && image.width <= maxWith) return;
    let scale = 1;
    if(image.width > image.height){
        scale = maxWith / image.width;
    }
    else{
        scale = maxHeight / image.height;
    }

    image.width = image.width * scale;
    image.height = image.height * scale;
}



