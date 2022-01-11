
let imgsvg = document.querySelector("#imagesvg");
// general can info
let can = document.querySelector("#paintdest");
can.height = 512;
can.width= 770;

// can drawer
let context = can.getContext('2d');
context.beginPath();

// image vars
var imgHeight = 0;
var imgWidth = 0;
var image;
var imgAdded = false;
var rgba;
var pixels = new Array();
var numPixels = 0;
var imageBitmap;

//erase image if there is one
let removeImg = document.querySelector('#deleteImgButton');
removeImg.addEventListener("mousedown", function(e){
    if(imgAdded){
        
        for(var i = imgsvg.childNodes.length -1; i>=0; i--){
            imgsvg.removeChild(imgsvg.childNodes[i]);
        }
    
        imgAdded = false;
        imgHeight = 0;
        imgWidth = 0;
        image = new Image();
        rgba = null;
        pixels = new Array();
        numPixels = 0;
        imageBitmap = null;
    }
});

// image file inputed 
let userImage = document.querySelector('#file');
userImage.addEventListener("change", function(e){
    //image = document.getElementById('output');

    var image = new Image();
    if(!imgAdded){
        context.font = "40px Comic Sans MS";
        context.fillStyle = "mediumpurple";
        context.textAlign = "center";
        context.fillText("loading...", can.width/2, can.height/2);
    }
    image.onload = function(){

        

        context.drawImage(image, 0, 0);
        imgHeight = image.height;
        imgWidth = image.width;

        rgba = context.getImageData( 
            0, 0, image.width, image.height 
        ).data;

        for(var i = 0; i < rgba.length; i += 4){
            pixels[numPixels] = packRGBA(
                rgba[i], rgba[i+1], rgba[i+2], rgba[i+3]
            );
            numPixels++;
        }

        imageBitmap = makeImageBitmap(imgWidth, imgHeight, pixels);

        createInitialSvgImage(imageBitmap, imgsvg);

        context.clearRect(0,0,can.width, can.height);
        
    };

    image.src = URL.createObjectURL(e.target.files[0]);

    imgAdded = true;

    
});

function createInitialSvgImage(imageBitmap, imgsvg){

    // i should definitely be making this with matrix/final exam

    var pixID = 0;
    
    for(var y = 0; y< Math.min(imageBitmap.h, can.height); y++){


        for(var x = 0; x<Math.min(imageBitmap.w, can.width); x++){
            
            var pix;

            var pixSize = 1.1;
            
            if(imageBitmap.w * imageBitmap.h > 200000){
                var pix0 = imageBitmap.getAddress(x,y);
                var pix1 = imageBitmap.getAddress(x+1,y);
                var pix2 = imageBitmap.getAddress(x,y+1);
                var pix3 = imageBitmap.getAddress(x+1,y+1);

                
                pix = new Pixel( 
                    (pix0.r + pix1.r + pix2.r + pix3.r)/4,
                    (pix0.g + pix1.g + pix2.g + pix3.g)/4,
                    (pix0.b + pix1.b + pix2.b + pix3.b)/4,
                    (pix0.a + pix1.a + pix2.a + pix3.a)/4,
                );
                pixSize = 4.1;
            } else {
                pix = imageBitmap.getAddress(x,y);
            }
            

            
            //this doing a row shade is probably quicker

            let pixColor = "rgb(" + pix.r.toString() + " ," 
                            + pix.g.toString() + " ," + pix.b.toString() + ")";

            const imgShade = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect",
            );
            imgShade.setAttribute("x", (x+1).toString());
            imgShade.setAttribute("y", (y+1).toString());
            imgShade.setAttribute("height", pixSize.toString());
            imgShade.setAttribute("width", pixSize.toString());
            imgShade.setAttribute("fill", pixColor);
            imgShade.setAttribute("fill-opacity", (pix.a / 800).toString());
            imgShade.setAttribute("id", pixID.toString());

            imgsvg.appendChild(imgShade);

            pixID++;

            
            if(imageBitmap.w * imageBitmap.h > 200000){
                x++;
            } 
        }
        
        if(imageBitmap.w * imageBitmap.h > 200000){
            y++;
        } 
    }
}