class Point{  
    /**
     * @param {number} fX x-coordinate
     * @param {number} fY y-coordinate
     */
    constructor(fX, fY){
        this.fX = fX;
        this.fY = fY;

        /**
         * @param {Point} p new-point
         * @returns {Point} added-point
         */
        this.add = function(p){
            var newX = this.fX + p.fX;
            var newY = this.fY + p.fY;
            return new Point(newX, newY);
        }
        /**
         * @param {Point} p new-point
         * @returns {Point} subtracted-point
         */
        this.subtract = function(p){
            var newX = this.fX - p.fX;
            var newY = this.fY - p.fY;
            return new Point(newX, newY);
        }
        /**
         * @param {Point} p new-point
         * @returns {boolean} equals?
         */
        this.equals = function(p){
            return this.fX == p.fX && this.fY == p.fY;
        }
        /**
         * @param {Point} p new-point
         * @returns {boolean} not equal?
         */
        this.notEqual = function(p){
            return this.fX != p.fX || this.fY != p.fY;
        }
        /**
         * @param {number} val mult-value
         * @returns {Point} multiplied-point
         */
        this.multiply = function(val){
            var newX = this.fX * val;
            var newY = this.fY * val;
            return new Point(newX, newY);
        }
        
    }
    /** 
    * @returns {number} fX
    */
    get x() {
        return this.fX;
    }
    /** 
    * @returns {number} fX
    */
    get y() {
        return this.fY;
    }

    get length() {
        return Math.sqrt(this.fX * this.fX + this.fY * this.fY);
    }

    /**
     * @param {number} x x-coordinate
     */
    set setX(x){
        this.fX = x;
    }

    /**
     * @param {number} y
     */
    set setY(y){
        this.fY = y;
    }
}
/**
 * @param {number} x x-coordinate
 * @param {number} y y-coordinate
 * @returns {Point} new-point
 */
function makePoint(x, y){
    return new Point(x,y);
}
/**
 * @param {Point} point x-coordinate
 */
function newPoint(point){
    return makePoint(point.x, point.y);
}
