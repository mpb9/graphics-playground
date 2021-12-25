var cleared = 0;
var shapeTime = false;
var circleTime = false;

var p0 = new Point(null, null);

let canvas = document.querySelector("#paintdest");
canvas.height = 512;
canvas.width= 770;

let ctx = canvas.getContext('2d');
ctx.beginPath();

let svg = document.querySelector("#shapesvg");
var svgPoints = new Array();

let stopForCircle = document.querySelector("#circleButton");
stopForCircle.addEventListener("mousedown", function(){
    ctx.beginPath();
    circleTime = true;
    shapeTime = false;
    cleared = 0;
});


let strokeChange = document.getElementById('strokeStyles');
function getSelectedOption(strokeChange) {
    var pathGeo;
    for ( var i = 0, len = strokeChange.options.length; i < len; i++ ) {
        pathGeo = strokeChange.options[i];
        if ( pathGeo.selected === true ) {
            break;
        }
    }
    return pathGeo.value;
}

var svgShapeCount = 0; 
//const svgShapes = new Array();

// var svgElement = document.createElementNS("http://www.w3.org/1999/xhtml", "pathShape");


var canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);

let stopForShape = document.querySelector('#shapebutton');
stopForShape.addEventListener("mousedown", function(){
    ctx.beginPath();
    shapeTime = true;
    circleTime = false;
    cleared = 0;
});

let shapeDone = document.querySelector('#endShapeButton');
shapeDone.addEventListener("mousedown", function(){
    shapeTime = false;
    
    if(p0.x != null){
        ctx.lineTo(p0.x, p0.y);
        ctx.stroke();

        cleared = 0;

        ctx.beginPath();

        let path = getSelectedOption(strokeChange);

        let strokeColor = document.querySelector('#colorPicker');
        ctx.strokeStyle = strokeColor.value;

        fillShape(svgPoints, svgPoints.length, canvas.height, canvas.width, ctx.strokeStyle, path);

        p0.setX = null;
        p0.setY = null;

        svgPoints = [];
    } 

});

let clearCanvas = document.querySelector('#clearbutton');
clearCanvas.addEventListener("mousedown", function(){
    shapeTime = false;

    p0.setX = null;
    p0.setY = null;
    cleared = 0;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    //svg.removeChild(svgElement);

    ctx.beginPath();

});

svg.addEventListener("mousedown", function(e)
{
    let strokeColor = document.querySelector('#colorPicker');
    ctx.strokeStyle = strokeColor.value;

    if(shapeTime){

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';

        if(cleared == 0){
            p0 = makePoint(e.layerX,e.layerY);
            createNewShape(canvas.height, canvas.width, p0, ctx);
        } else {
            let p = makePoint(e.layerX, e.layerY);
            drawShape(canvas, canvas.height, canvas.width, p, ctx, cleared);
        }
        

    // have circleTime set up like shapeTime... need to make it 
    // with mpb9_path stuff... yay
    /*
    } else if (circleTime){
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
        if(cleared == 0){
            p0 = makePoint(e.layerX,e.layerY);
            ctx.moveTo(p0.x, p0.y)
            cleared = 1;
        } else if (cleared == 1){
            let p = makePoint(e.layerX, e.layerY);
            ctx.lineTo(p.x,p.y);
            ctx.stroke();

            drawCircle(p0, p);

            cleared = 0;
        }
    */
    } else {
        let strokeSize = document.querySelector('#sSize');
        
        if(strokeSize.valueAsNumber === NaN){
            ctx.lineWidth = 1;
        } else {
            ctx.lineWidth = Math.min(33, Math.max(1, (strokeSize.valueAsNumber) / 3));
        }
        
        addPathClick(canvas, e, ctx);
    }
    
});

function addPathClick(canvas, event, ctx){

    var x = event.layerX;
    var y = event.layerY;

    if(cleared == 0) {
        ctx.moveTo(x, y);       
        cleared = 1; 
    }
    else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function createNewShape(height, width, p0, ctx){
    ctx.moveTo(p0.x, p0.y);
    cleared = 1;

    svgPoints[svgPoints.length] = p0;


    //var svgElement = document.createElementNS("http://www.w3.org/1999/xhtml", "pathShape");
    
}

function drawShape(canvas, height, width, p, ctx, cleared){
    ctx.lineTo(p.x, p.y);
    ctx.stroke();

    svgPoints[svgPoints.length] = p;
}

function fillShape(pts, count, height, width, color, path){
    //NOT CLIPPING EDGES, NO SHADERS, NO CUBID OR QUAD
    const ptsSize = count+1;
    pts[pts.length] = pts[0];
    var edges = new Array();

    if(path == "linear"){
        for(var i = 0; i<ptsSize-1; i++){
            var e = makeEdge(pts[i], pts[i+1], 1);
            edges[i] = e;
        }            
    } else if(path == "quadratic"){
        for(var i = 0; i<ptsSize-2; i+=2){
            var ptsQ = [pts[i], pts[i+1], pts[i+2]];
            quadClip(ptsQ, edges);
            
        }
        if(ptsSize % 2 == 0){
            edges[edges.length] = makeEdge(pts[ptsSize-2], pts[ptsSize-1], 1);
        }
    } else if(path == "cubic"){
        for(var i = 0; i<ptsSize-3; i+=3){
            var ptsC = [pts[i], pts[i+1], pts[i+2], pts[i+3]];
            cubicClip(ptsC, edges);
        }
        if((ptsSize-2) % 3  == 0){
            edges[edges.length] = makeEdge(pts[ptsSize-2], pts[ptsSize-1], 1);
        } else if ((ptsSize) % 3 == 0){
            edges[edges.length] = makeEdge(pts[ptsSize-3], pts[ptsSize-2], 1);
            edges[edges.length] = makeEdge(pts[ptsSize-2], pts[ptsSize-1], 1);
        }
    } 

    edges.sort(edgeSort);


    //c++ convert function

    const size = edges.length;

    var tempEs = new Array();

    var x0; 
    var x1;

    for(var y = GRoundToInt(edges[0].top.fY); y < height; y++){

        for(var i = 0; i < size; i++){
            if(GRoundToInt(edges[i].top.fY) <= y && GRoundToInt(edges[i].bottom.fY) > y){
                edges[i].setCurrx = y;
                tempEs[tempEs.length] = (edges[i]);
            }
        }
        tempEs.sort(edgeSortByX);
        var w = 0;
        var tempSize = tempEs.length;
        for(var i = 0; i < tempSize; i++){

            if(w == 0 ){
                x0 = tempEs[i].currX;
            }
            w += tempEs[i].winder;
            if (w==0){
                x1 = tempEs[i].currX;

                var shapeColor = color;
                //testing
                //if(path != "quadratic"){
                    fillIt(x0, x1, y, shapeColor);
                //}
            }
        }
        tempEs= [];
    }
    shapeTime = false;

    p0.setX = null;
    p0.setY = null;
    cleared = 0;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    //svg.removeChild(svgElement);

    ctx.beginPath();
    
}

function fillIt(x0, x1, y, shapeColor){
    const shade = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
    );
    shade.setAttribute("x", x0.toString());
    shade.setAttribute("y", y.toString());
    shade.setAttribute("height", "1");
    shade.setAttribute("width", (x1-x0).toString());
    shade.setAttribute("fill", shapeColor.toString());

    svg.appendChild(shade);


}

