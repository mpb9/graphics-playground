class Edge {
    /**
     * @param {Point} pointA pointA
     * @param {Point} pointB pointB
     * @param {number} winder winder
     * @param {number} currX current x-value
     */
    constructor(pointA, pointB, winder, currX){
        this.pointA = pointA;
        this.pointB = pointB;
        this.winder = winder;
        this.currX = currX;

        /**
         * @param {Edge} e new Edge
         * @returns {boolean} equals?
         */
        this.equals = function(e){
            return this.pointA.equals(e.pointA) && this.pointB.equals(e.pointB);
        }
        /**
         * @property
         * @param {Edge} e new Edge
         * @returns {boolean} notequal?
         */
        this.notEqual = function(e){
            return !(this.equals(e));
        }

        /**
         * @property 
         * @param {Edge} e new Edge
         * @returns {boolean} lessthan?
         */
        this.lessThan = function(e) {
            let pntA = this.pointA;
            let pntB = this.pointB;
            let pntA2 = e.pointA;
            let pntB2 = e.pointB;
    
            let top1 = pntA;
            let bottom1 = pntB;
    
            let top2 = pntA2;
            let bottom2 = pntB2;

            if (GRoundToInt(top1.y) != GRoundToInt(top2.y)){
                return top1.y < top2.y; //higher top y value
            } 
            if (top1.x != top2.x){
                return top1.x < top2.x; //lefter top x value
            } else return (top1.y-bottom1.y)/(top1.x-bottom1.x) < (top2.y-bottom2.y)/(top2.x-bottom2.x); //less slope
        }

        /**
         * @param {Edge} e new Edge
         */
        this.greaterThan = function(e){
            let pntA = this.pointA;
            let pntB = this.pointB;
            let pntA2 = e.pointA;
            let pntB2 = e.pointB;
    
            let top1 = pntA;
            let bottom1 = pntB;
    
            let top2 = pntA2;
            let bottom2 = pntB2;
            if (GRoundToInt(top1.y) != GRoundToInt(top2.y)){
                return top1.y > top2.y; //higher top y value
            } 
            if (top1.x != top2.x){
                return top1.x > top2.x; //lefter top x value
            } else return (top1.y-bottom1.y)/(top1.x-bottom1.x) > (top2.y-bottom2.y)/(top2.x-bottom2.x); //less slope
        }
    }
    get pA(){ return this.pointA; }
    get pB() { return this.pointB; }

    //slope of edge
    get m(){
        let m = -(Number.MAX_VALUE);
        if(this.pointA.x != this.pointB.x){
            m = (this.pointA.y - this.pointB.y)/(this.pointA.x - this.pointB.x);
        }
        return m; 
    }
    
    //y-intercept
    get b() {
        let b = this.pointA.y - (this.pointA.x * (this.pointA.y - this.pointB.y)/(this.pointA.x - this.pointB.x));
        return b;
    }

    //returns GPoint with larger y
    get top() {
        let t = new Point;
        if (this.pointA.y < this.pointB.y) {
            t = this.pointA;
        } else if (this.pointA.y == this.pointB.y){
            if (this.pointA.x < this.pointB.x){
                t = this.pointA;
            } else {
                t = this.pointB;
            }
        } else {
            t = this.pointB;
        }
        return t;
    }
    //returns GPoint with smaller y
    get bottom() {
        let b = new Point;
        if (this.pointA.y > this.pointB.y) {
            b = this.pointA;
        } else if (this.pointA.y == this.pointB.y){
            if (this.pointA.x < this.pointB.x){
                b = this.pointB;
            } else {
                b = this.pointA;
            }
        } else {
            b = this.pointB;
        }
        return b;
    }
    
    /**
     * @param {number} y
     */
    set setCurrx(y) {
        if (this.pointA.x == this.pointB.x){
            this.currX = this.pointA.x;
        } else this.currX = (y+0.5 - this.b)/(this.m);
    }
    
    

    /**
     * @param {Point} a new point a
     */
    set setEdgePointA(a) {
        this.pointA = a;
    }

    /**
     * @param {Point} b
     */
    set setEdgePointB(b){ 
        this.pointB = b;
    }
    
}

/**
 * @param {Point} a new point a
 * @param {Point} b new point b
 * @param {number} winder new winder
 */
const makeEdge = (a, b, winder) => { 
    if(a.y > b.y){
        winder = -winder;
        var temp = a;
        a = b;
        b = temp;
    }
    return new Edge(a, b, winder, 0.0);
}

const newEdge = (e) =>{
    return makeEdge(e.pA, e.pB, e.winder);
}
/**
 * @param {Edge} edge edge to clip
 * @param {number} height canvas height
 */
const yClip = (edge, height) => {
    let pntA = edge.pointA;
    let pntB = edge.pointB;
    if (pntA.y > pntB.y){
        let tempP = pntA;
        pntA = pntB;
        pntB = tempP;
        edge.winder *= -1;
    }
    if (pntA.y < 0){
        let ax = pntA.x + (pntB.x - pntA.x) * (0-pntA.y)/(pntB.y - pntA.y);
        pntA.setPoint(ax, 0);
    }
    if (pntB.y > height){
        let bx = pntB.x - (pntB.x - pntA.x) * (pntB.y - height)/(pntB.y - pntA.y);
        pntB.setPoint(bx, height);
    }

    return new Edge(pntA, pntB, edge.winder, 0.0);
} 

const clipEdges = (tPntA, tPntB, height, width, clippedEdges) =>{ 
    var w = 1;

    // Ensure p0.y <= p1.y
    if (tPntA.fY > tPntB.fY) {
        swap(tPntA, tPntB);
        w = -w;
    }
    
    if ((tPntA.y < height) && (tPntB.y > 0) && (tPntB.y != tPntA.y)){
        var newEdge = makeEdge(tPntA, tPntB,w);
        var tempEdge = yClip(newEdge, height);
        if (!(tempEdge.pointA.x < 0 && tempEdge.pointB.x < 0) 
                && !(tempEdge.pointA.x > width && tempEdge.pointB.x > width)){ //? check
            if(tempEdge.pointA.x > tempEdge.pointB.x){
                var tP = tempEdge.pointA;
                tempEdge.pointA = tempEdge.pointB;
                tempEdge.pointB = tP;
                tempEdge.winder = -tempEdge.winder;
            }
            // add left projection, clip left side
            if(tempEdge.pointA.x < 0){
                var aY = (tempEdge.pointA.y + (0 - tempEdge.pointA.x) * 
                            (tempEdge.pointB.y - tempEdge.pointA.y)/(tempEdge.pointB.x - tempEdge.pointA.x));
                var lProj = makeEdge(makePoint(0, aY), makePoint(0, tempEdge.pointA.y), tempEdge.winder);
                if(lProj.pointA.y > lProj.pointB.y){
                    var tP = lProj.pointA;
                    lProj.pointA = lProj.pointB;
                    lProj.pointB = tP;
                    lProj.winder = -lProj.winder;
                }
                clippedEdges[clippedEdges.length] = lProj;
                tempEdge.pointA.setX(0);
                tempEdge.pointB.setY(aY);
            }
            // add right projection, clip right side
            if(tempEdge.pointB.x > width){
                var bY = (tempEdge.pointB.y - (tempEdge.pointB.x - width) * 
                            (tempEdge.pointB.y - tempEdge.pointA.y)/(tempEdge.pointB.x - tempEdge.pointA.x));
                var rProj = makeEdge(makePoint(width, bY), makePoint(width, tempEdge.pointB.y), tempEdge.winder);
                if(rProj.pointA.y > rProj.pointB.y){
                    var tP = rProj.pointA;
                    rProj.pointA = rProj.pointB;
                    rProj.pointB = tP;
                    rProj.winder = -rProj.winder;
                }
                clippedEdges[clippedEdges.length] = rProj;
                tempEdge.pointB.setX(width); 
                tempEdge.pointB.setY(bY);
            }
            //add the clipped segment
            var edgeC = tempEdge;
            if(edgeC.pointA.y > edgeC.pointB.y){
                    var tPop = edgeC.pointA;
                    edgeC.pointA = edgeC.pointB;
                    edgeC.pointB = tPop;
                    edgeC.winder = -edgeC.winder;
            }
            clippedEdges[clippedEdges.length] = edgeC;
        } else {
            if(tempEdge.pointA.x > tempEdge.pointB.x){
                var tP = tempEdge.pointA;
                tempEdge.pointA = tempEdge.pointB;
                tempEdge.pointB = tP;
                tempEdge.winder = -tempEdge.winder;
            }
            if (tempEdge.pointB.x < 0){
                var lOut = makeEdge(makePoint(0, tempEdge.pointA.y), makePoint(0, tempEdge.pointB.y), tempEdge.winder);
                if(lOut.pointA.y > lOut.pointB.y){
                    var tPo = lOut.pointA;
                    lOut.pointA = lOut.pointB;
                    lOut.pointB = tPo;
                    lOut.winder = -lOut.winder;
                }
                clippedEdges[clippedEdges.length] = lOut;
            }
            if (tempEdge.pointA.x > width){
                var rOut = makeEdge(makePoint(width, tempEdge.pointA.y), makePoint(width, tempEdge.pointB.y), tempEdge.winder);
                if(rOut.pointA.y > rOut.pointB.y){
                    var tPoi = rOut.pointA;
                    rOut.pointA = rOut.pointB;
                    rOut.pointB = tPoi;
                    rOut.winder = -rOut.winder;
                }
                clippedEdges[clippedEdges.length] = rOut;
            }
        }
    }
}

const edgeSort = (edge1, edge2) =>{
    let pntA = edge1.pointA;
    let pntB = edge1.pointB;
    let pntA2 = edge2.pointA;
    let pntB2 = edge2.pointB;

    let top1 = pntA;
    let bottom1 = pntB;

    let top2 = pntA2;
    let bottom2 = pntB2;

    if (GRoundToInt(top1.y) != GRoundToInt(top2.y)){
        if (top1.y < top2.y){ //higher top y value
            return -1;   
        } else {
            return 1;
        }
    } 
    if (top1.x != top2.x){
        if (top1.x < top2.x){ //lefter top x value
            return -1;
        } else {
            return 1;
        }
    } else {
        if ((top1.y-bottom1.y)/(top1.x-bottom1.x) < (top2.y-bottom2.y)/(top2.x-bottom2.x)){ //less slope
            return -1;
        } else {
            return 1;
        }
    }
}

const edgeSortByX = (edge1, edge2) => {
    if (edge1.currX != edge2.currX){
        if (edge1.currX < edge2.currX){
            return -1;
        } 
        return 1;
    } else if (edge1.winder != edge2.winder){
        if (edge1.winder < edge2.winder){
            return -1;
        }
        return 1;
    } else return edgeSort(edge1, edge2);

}


const quadClip = (src /*[3]*/, edges, height, width) => {
    var errorP = makePoint(((src[0].fX - 2*src[1].fX + src[2].fX)/4), 
                                ((src[0].fY - 2*src[1].fY + src[2].fY)/4));
    var error = Math.sqrt((errorP.fX * errorP.fX) + (errorP.fY * errorP.fY));

    if (error <= 0.25){
        //clipEdges(src[0], src[2], height, width, edges);
        edges[edges.length] = makeEdge(src[0], src[2], 1);
    } else { 
        var callbase = (-2)*Math.log(2);
        var numChops = GCeilToInt(Math.log((0.25)/error) / callbase);
        var numPoints = 1 + 2**(numChops);           
        var qPoints = new Array();
        qPoints[qPoints.length] = src[0];
        for(var i = 0; i<= numPoints; i++){
            var t = i/numPoints;
            var choptX = (1-t)*(1-t)*src[0].fX + 2*(1-t)*t*src[1].fX + t*t*src[2].fX;
            var choptY = (1-t)*(1-t)*src[0].fY + 2*(1-t)*t*src[1].fY + t*t*src[2].fY;
            qPoints[qPoints.length] = makePoint(choptX, choptY);
            //clipEdges(qPoints[i], qPoints[i+1], height, width, edges);

            edges[edges.length] = makeEdge(qPoints[i], qPoints[i+1], 1);
        }
        qPoints = [];
    }
}

const cubicClip = (src /*[4]*/, edges) => {
    var errorP1 = makePoint(((src[0].fX - 2*src[1].fX + src[2].fX)/4), 
                                ((src[0].fY - 2*src[1].fY + src[2].fY)/4));
    var errorP2 = makePoint(((src[1].fX - 2*src[2].fX + src[3].fX)/4), 
                                ((src[1].fY - 2*src[2].fY + src[3].fY)/4));
    var error1 = Math.sqrt((errorP1.fX * errorP1.fX) + (errorP1.fY * errorP1.fY));
    var error2 = Math.sqrt((errorP2.fX * errorP2.fX) + (errorP2.fY * errorP2.fY));

    var error = Math.max(error1, error2);

    if (error <= 0.25){
        //confused y this wouldnt be 0 and 3
        edges[edges.length] = makeEdge(src[0], src[2], 1);
    } else { 
        var callbase = (-2)*Math.log(2);
        var numChops = GCeilToInt(Math.log((0.25)/error) / callbase);
        var numPoints = 1 + 2**(numChops);           
        var cPoints = new Array();
        cPoints[cPoints.length] = src[0];
        for(var i = 0; i<= numPoints; i++){
            var t = i/numPoints;
            var choptX = Math.pow((1-t),3)*src[0].fX + 3*Math.pow((1-t),2)*t*src[1].fX 
                            + 3*Math.pow(t,2)*(1-t)*src[2].fX + Math.pow(t,3)*src[3].fX;
            var choptY = Math.pow((1-t),3)*src[0].fY + 3*Math.pow((1-t),2)*t*src[1].fY 
                            + 3*Math.pow(t,2)*(1-t)*src[2].fY + Math.pow(t,3)*src[3].fY;
            cPoints[cPoints.length] = makePoint(choptX, choptY);
            edges[edges.length] = makeEdge(cPoints[i], cPoints[i+1], 1);

        }
        cPoints = [];
    }
}
