let imgsvg = document.querySelector("#imagesvg");
// general can info
let can = document.querySelector("#paintdest");
can.height = 512;
can.width = 770;

// can drawer
let context = can.getContext("2d");
context.beginPath();

// fill type
let whichFill = document.querySelector("#fillButton");

// image vars
var image;
var imgAdded = false;
var rgba;
var pixels = new Array();
var numPixels = 0;
var imageBitmap;

// tint vars
var hasTint = false;
var oldTintColor;
var oldTintOpacity;

// scaling for fitting img (shuold make them matrices in future)
var canvasOverBitWidth = 0;
var canvasOverBitHeight = 0;

//erase image if there is one
let removeImg = document.querySelector("#deleteImgButton");
removeImg.addEventListener("mousedown", eraseImg);

// image file inputed
let userImage = document.querySelector("#file");
userImage.addEventListener("change", function (e) {
  if (imgAdded) {
    for (var i = imgsvg.childNodes.length - 1; i >= 0; i--) {
      imgsvg.removeChild(imgsvg.childNodes[i]);
    }

    imgAdded = false;
    image = new Image();
    rgba = null;
    pixels = new Array();
    numPixels = 0;
    imageBitmap = null;
    hasTint = false;
  }
  var image = new Image();

  context.font = "40px Comic Sans MS";
  context.fillStyle = "mediumpurple";
  context.textAlign = "center";
  context.fillText("loading...", can.width / 2, can.height / 2);

  image.onload = function () {
    var tempCan = document.createElement("canvas");
    tempCan.width = image.width;
    tempCan.height = image.height;

    var tempCtx = tempCan.getContext("2d");
    tempCtx.drawImage(image, 0, 0);

    rgba = tempCtx.getImageData(0, 0, image.width, image.height).data;

    for (var i = 0; i < rgba.length; i += 4) {
      pixels[numPixels] = packRGB(rgba[i], rgba[i + 1], rgba[i + 2]);
      numPixels++;
    }

    imageBitmap = makeImageBitmap(image.width, image.height, pixels);

    bitWidthRatio = imageBitmap.w / can.width;
    bitHeightRatio = imageBitmap.h / can.height;

    createFittedImage(bitWidthRatio, bitHeightRatio);

    context.clearRect(0, 0, can.width, can.height);
  };

  image.src = URL.createObjectURL(e.target.files[0]);

  imgAdded = true;
});

// adds tint to the image (only if img is there)... currently tints whole canvas
let imgTint = document.querySelector("#tintButton");
imgTint.addEventListener("mousedown", function () {
  if (imgAdded) {
    let tintColor = document.querySelector("#colorPicker").value;
    let tintColor2 = document.querySelector("#colorPicker2").value;

    let tintOpacity = document.querySelector("#opacity");

    if (tintOpacity.value == "") {
      tintOpacity = 0.2;
    } else if (tintOpacity.valueAsNumber >= 96) {
      tintOpacity = 0.8;
    } else {
      tintOpacity = opacity.valueAsNumber / 100;
    }

    if (whichFill.value == "solid") {
      const tint = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      tint.setAttribute("x", "1");
      tint.setAttribute("y", "1");
      tint.setAttribute("height", can.height.toString());
      tint.setAttribute("width", can.width.toString());
      tint.setAttribute("fill", tintColor.toString());
      tint.setAttribute("fill-opacity", tintOpacity.toString());
      tint.setAttribute("id", "tint");

      imgsvg.appendChild(tint);
    } else {
      for (var y = 1; y <= can.height; y++) {
        // should be subtracting 1 from y and can.height but that only messes it up a v small tad bit
        var r =
          GFloorToInt((1 - y / can.height) * getDec(tintColor.substring(1, 2), tintColor.substring(2, 3))) +
          GFloorToInt((y / can.height) * getDec(tintColor2.substring(1, 2), tintColor2.substring(2, 3)));

        var g =
          GFloorToInt((1 - y / can.height) * getDec(tintColor.substring(3, 4), tintColor.substring(4, 5))) +
          GFloorToInt((y / can.height) * getDec(tintColor2.substring(3, 4), tintColor2.substring(4, 5)));

        var b =
          GFloorToInt((1 - y / can.height) * getDec(tintColor.substring(5, 6), tintColor.substring(6, 7))) +
          GFloorToInt((y / can.height) * getDec(tintColor2.substring(5, 6), tintColor2.substring(6, 7)));

        const tint = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        tint.setAttribute("x", "1");
        tint.setAttribute("y", y.toString());
        tint.setAttribute("height", "1");
        tint.setAttribute("width", can.width.toString());
        tint.setAttribute("fill", "rgb(" + r.toString() + " ," + g.toString() + " ," + b.toString() + ")");
        tint.setAttribute("fill-opacity", tintOpacity.toString());
        tint.setAttribute("id", "tint");

        imgsvg.appendChild(tint);
      }
    }

    hasTint = true;
  }
});

// erases img and tint
function eraseImg() {
  if (imgAdded) {
    for (var i = imgsvg.childNodes.length - 1; i >= 0; i--) {
      imgsvg.removeChild(imgsvg.childNodes[i]);
    }

    imgAdded = false;
    image = new Image();
    rgba = null;
    pixels = new Array();
    numPixels = 0;
    imageBitmap = null;
    hasTint = false;
  }
}

//invert img
let invertImg = document.querySelector("#invertButton");
invertImg.addEventListener("mousedown", function () {
  if (imgAdded) {
    for (var i = 0; i < imgsvg.childNodes.length; i++) {
      var oldColor = imgsvg.childNodes[i].getAttribute("fill");

      var red = oldColor.substring(4, oldColor.indexOf(" ,"));
      var greenblue = oldColor.substring(red.length + 6, oldColor.indexOf(")"));

      var invR = 255 - parseFloat(red);
      var invG = 255 - parseFloat(greenblue);
      var invB = 255 - parseFloat(greenblue.substring(greenblue.indexOf(" ,") + 2, greenblue.length));

      var invColor = "rgb(" + invR.toString() + " ," + invG.toString() + " ," + invB.toString() + ")";

      imgsvg.childNodes[i].setAttribute("fill", invColor);
    }
  }
});

// erase tint (only if added after img)
let noTint = document.querySelector("#noTintButton");
noTint.addEventListener("mousedown", eraseTint);

function eraseTint() {
  if (hasTint) {
    while (imgsvg.childNodes[imgsvg.childNodes.length - 1].id == "tint") {
      imgsvg.removeChild(imgsvg.childNodes[imgsvg.childNodes.length - 1]);
    }
  }
  hasTint = false;
}

function createFittedImage(wRatio, hRatio) {
  const imgBackground = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  imgBackground.setAttribute("x", "0");
  imgBackground.setAttribute("y", "0");
  imgBackground.setAttribute("height", can.height.toString());
  imgBackground.setAttribute("width", can.width.toString());
  imgBackground.setAttribute("fill", "rgb(0,0,0)");
  imgBackground.setAttribute("fill-opacity", "0.9");

  imgsvg.appendChild(imgBackground);

  for (var y = 0; y < 512; y += 1.2) {
    for (var x = 0; x < 770; x += 1.2) {
      var pix = imageBitmap.getAddress(GFloorToInt(wRatio * x), GFloorToInt(hRatio * y));

      //this doing a row shade is probably quicker

      let pixColor = "rgb(" + pix.r.toString() + " ," + pix.g.toString() + " ," + pix.b.toString() + ")";

      const imgShade = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      imgShade.setAttribute("x", (x + 1).toString());
      imgShade.setAttribute("y", (y + 1).toString());
      imgShade.setAttribute("height", "1.3");
      imgShade.setAttribute("width", "1.3");
      imgShade.setAttribute("fill", pixColor);
      imgShade.setAttribute("fill-opacity", "1");
      //imgShade.setAttribute("id", pixID.toString());

      imgsvg.appendChild(imgShade);
    }
  }
}
