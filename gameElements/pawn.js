
class Pawn{
    constructor(x, y){
        // Initial model
        
        Object.assign(this, { x, y})
        
        // Initial view
        this.pawnDiv = document.createElement('div')
        Object.assign(this.pawnDiv.style, {
        left: `${x}px`,
        top: `${y}px`,
        width: `10px`,
        height: `12px`,
        backgroundColor: `rgba(224, 109, 28, 1)`,
        position: 'absolute',
        })
        container.appendChild(this.pawnDiv)
        
        
    }
    
      
    move() {
    // Update the model
    let top = container.offsetTop +5;
    let left = container.offsetLeft +5;
    [this.x, this.y] = [this.x + this.dx, this.y + this.dy]
    if (this.x < left 
        || this.x > container.clientWidth + left -this.diameter ) {

        this.x = Math.max(left, Math.min(this.x, container.clientWidth + left -this.diameter))
        this.dx = -this.dx
    } 
    if (this.y < top 
        || this.y > container.clientHeight - this.diameter  + top) {

        this.y = Math.max(top, Math.min(this.y, container.clientHeight - this.diameter + top))
        this.dy = -this.dy
    } 

    // Update the view
    [this.pawnDiv.style.left, this.pawnDiv.style.top] = [`${this.x}px`, `${this.y}px`]
    
    
    }

    remove() {
    [this.pawnDiv.style.width, this.pawnDiv.style.height] = [`0px`, `0px`]
    }

}
    