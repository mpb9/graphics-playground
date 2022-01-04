
// make an option for the type of butt a line should have

// check if first point
var cleared = 0; 

// check what shape to draw
var shapeTime = false;
var circleTime = false;

// milliseconds for slowFill
var ms = 0;

// IDs for svg shapes
var svgChildID = 0;
var svgIndices = new Array();

// first point of circle or polygon
var p0 = new Point(null, null);

// vars for svg lines
var svgLineWidth = 1;
var lineP0 = new Point(null, null);
var linePoints = new Array();

// general canvas info
let canvas = document.querySelector("#paintdest");
canvas.height = 512;
canvas.width= 770;

// canvas drawer
let ctx = canvas.getContext('2d');
ctx.beginPath();

// svg drawer and points in svg circle or polygon
let svg = document.querySelector("#shapesvg");
var svgPoints = new Array();
var circlePoints = new Array();

// listener for stroke type (linear, quadratic, cubic)
let strokeChange = document.getElementById('strokeStyles');

// listener for cap type (butt, square, round)
let capChange = document.getElementById('capStyles');

// checks the selected option in stroke/cap style form
function getSelectedOption(someChange) {
    var pathGeo;
    for ( var i = 0, len = someChange.options.length; i < len; i++ ) {
        pathGeo = someChange.options[i];
        if ( pathGeo.selected === true ) {
            break;
        }
    }
    return pathGeo.value;
}

//these appear unneeded rn
/*
var svgShapeCount = 0; 

const svgShapes = new Array();

var svgElement = document.createElementNS("http://www.w3.org/1999/xhtml", "pathShape");

var canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
*/

//end lines button has been pressed
let linesDone = document.querySelector('#endLinesButton');
linesDone.addEventListener("mousedown", function(){
    cleared = 0;
});

//circle button has been pressed
let stopForCircle = document.querySelector("#circleButton");
stopForCircle.addEventListener("mousedown", function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    circleTime = true;
    shapeTime = false;
    cleared = 0;
});

//polygon button has been pressed
let stopForShape = document.querySelector('#shapebutton');
stopForShape.addEventListener("mousedown", function(){
    ctx.beginPath();
    shapeTime = true;
    circleTime = false;
    cleared = 0;
});

//end polygon button has been pressed, calls getSelectedOption(strokeChange)
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

        if(svgChildID > svgIndices[svgIndices.length - 1]){
            svgIndices[svgIndices.length] = svgChildID;
        }
        p0.setX = null;
        p0.setY = null;

        svgPoints = [];
    } 

});

//clear button has been pressed
let clearCanvas = document.querySelector('#clearbutton');
clearCanvas.addEventListener("mousedown", function(){
    shapeTime = false;

    p0.setX = null;
    p0.setY = null;
    cleared = 0;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    //svg.removeChild(svgElement);

    let stillErasing = svgChildID;
    while(stillErasing != 0){
        eraseLastShape();
        stillErasing = svgChildID;
    }

});

//erase last shape button has been pressed
let eraseShape = document.querySelector('#eraseLast');
eraseShape.addEventListener("mousedown", eraseLastShape);

//function for erasing last shape (called mult times in clear)
function eraseLastShape(){
    shapeTime = false;

    p0.setX = null;
    p0.setY = null;
    cleared = 0;

    //ctx.clearRect(0,0,canvas.width,canvas.height);
    //svg.removeChild(svgElement);
    if(svgChildID != 0){
        var numChildrenInShape = svgIndices[svgIndices.length -1] - svgIndices[svgIndices.length -2];

        for(var i = svgChildID -1; i >= svgIndices[svgIndices.length - 2]; i--){
            svg.removeChild(svg.childNodes[i]);
        }
        var lastCID = svgIndices.pop();
        
        svgChildID = svgChildID - numChildrenInShape;
    } 
    ctx.beginPath();

}

//svg has been clicked... checks for shapes, lines, etc
svg.addEventListener("mousedown", function(e)
{
    let strokeColor = document.querySelector('#colorPicker');
    ctx.strokeStyle = strokeColor.value;

    if(shapeTime || circleTime){

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';

        if(cleared == 0){
            p0 = makePoint(e.layerX,e.layerY);
            if(shapeTime){
                createNewShape(canvas.height, canvas.width, p0, ctx);
            } else {
                ctx.strokeStyle = strokeColor.value;
                ctx.moveTo(p0.x-2,p0.y);
                ctx.lineWidth = 4;
                ctx.lineTo(p0.x+2, p0.y);
                ctx.stroke();
                cleared = 1;
            }
        } else {
            let p = makePoint(e.layerX, e.layerY);
            if(shapeTime){
                drawShape(canvas, canvas.height, canvas.width, p, ctx, cleared);
            } else {
                ctx.lineTo(p.x, p.y);
                ctx.stroke();

                circlePoints = addCircle(p0, Math.sqrt((p.x - p0.x)**2 + (p.y - p0.y)**2));

                ctx.strokeStyle = strokeColor.value;

                fillShape(circlePoints, circlePoints.length, canvas.height, canvas.width, ctx.strokeStyle, "quadratic");
                circleTime = false;

                if(svgChildID > svgIndices[svgIndices.length - 1]){
                    svgIndices[svgIndices.length] = svgChildID;
                }
            }
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
            svgLineWidth = 1;
        } else {
            ctx.lineWidth = Math.min(50, Math.max(1, (strokeSize.valueAsNumber) / 2));
            svgLineWidth = ctx.lineWidth;
        }

        //add a "done" button to and a line stroke or just change end shape to include lines?
        
        addPathClick(canvas, e, ctx, svgLineWidth);
    }
    
});

//used only for drawing path
function addPathClick(canvas, event, ctx, svgLineWidth){

    var x = event.layerX;
    var y = event.layerY;

    if(cleared == 0) {
        ctx.moveTo(x, y);
        lineP0 = makePoint(x,y);       
        cleared = 1; 
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();      
        
        var capy = getSelectedOption(capChange);

        linePoints = addLine(lineP0, makePoint(x,y), svgLineWidth, capy);

        fillShape(linePoints[0], linePoints[0].length, canvas.height, canvas.width, ctx.strokeStyle, "linear");

        if(svgChildID > svgIndices[svgIndices.length - 1]){
            svgIndices[svgIndices.length] = svgChildID;
        }

        if(capy == "round"){
            fillShape(linePoints[1], linePoints[1].length, canvas.height, canvas.width, ctx.strokeStyle, "quadratic");

            if(svgChildID > svgIndices[svgIndices.length - 1]){
                svgIndices[svgIndices.length] = svgChildID;
            }

            fillShape(linePoints[2], linePoints[2].length, canvas.height, canvas.width, ctx.strokeStyle, "quadratic");

            if(svgChildID > svgIndices[svgIndices.length - 1]){
                svgIndices[svgIndices.length] = svgChildID;
            }

        }

        lineP0 = makePoint(x,y);
        cleared = 1;

        

        linePoints = [];
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
            quadClip(ptsQ, edges, height, width);
            
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

    for(var y = GRoundToInt(edges[0].top.fY); y <= height; y++){

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

                //slowFill;

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

    x0 = clamp(x0, canvas.width);
    x1 = clamp(x1, canvas.width);

    let opacity = document.querySelector('#opacity');

    if(opacity.value == ""){
        opacity = 1.0;
    } else {
        opacity = opacity.valueAsNumber / 100;
    }

    if(y > 0 && y <= canvas.height){
        if(svgChildID == 0){
            svgIndices[svgIndices.length] = 0;
        }

        const shade = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect",
        );
        shade.setAttribute("x", x0.toString());
        shade.setAttribute("y", y.toString());
        shade.setAttribute("height", "1");
        shade.setAttribute("width", (x1-x0).toString());
        shade.setAttribute("fill", shapeColor.toString());
        shade.setAttribute("fill-opacity", opacity.toString());
        shade.setAttribute("id", svgChildID.toString());
            
        svg.appendChild(shade);

        svgChildID++;
    }
    
}


function slowFill(){
    ms++;
}
