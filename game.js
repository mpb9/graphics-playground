
window.addEventListener('load', () => {
    const container = document.querySelector('#gameDisplay');
    
    class Player {
        constructor(x, y, xSpeed, ySpeed, width, height, color) {
            // Initial model
            
            Object.assign(this, { x, y, xSpeed, ySpeed, width, height})
            
            // Initial view
            this.userdiv = document.createElement('div')
            Object.assign(this.userdiv.style, {
              left: `${x}px`,
              top: `${y}px`,
              width: `${width}px`,
              height: `${height}px`,
              backgroundColor: color,
              position: 'absolute',
            })
            container.appendChild(this.userdiv)

            
            
            document.addEventListener('keydown', (e) => {
                if (e.code === "ArrowUp") {
                    this.userMove(0,-1)
                    /*
                    document.addEventListener('keyup', (e) => {
                        this.userMove(0,-1)
                    });    */
                }
                else if (e.code === "ArrowDown") this.userMove(0,1)
                else if (e.code === "ArrowLeft") this.userMove(-1,0)
                else if (e.code === "ArrowRight") this.userMove(1,0)
            }); 
            
            //requestAnimationFrame(advance)
    
            
          }
          userMove(xMove,yMove){
              if(xMove!=0){
                [this.x, this.y] = [this.x + xMove*this.xSpeed, this.y ];

                [this.userdiv.style.left, this.userdiv.style.top] = [`${this.x + xMove*this.xSpeed}px`, `${this.y }px`]
              } else {
                [this.x, this.y] = [this.x, this.y + yMove*this.ySpeed];

                [this.userdiv.style.left, this.userdiv.style.top] = [`${this.x}px`, `${this.y + yMove*this.ySpeed}px`]
              }
          }
          movePlayer() {
            // Update the model
            let top = container.offsetTop +5;
            let left = container.offsetLeft +5;
            [this.x, this.y] = [this.x + this.xSpeed, this.y + this.ySpeed]
            if (this.x < left || this.x > container.clientWidth + left -this.width ) {
              this.x = Math.max(left, Math.min(this.x, container.clientWidth + left -this.width))
              this.xSpeed = -this.xSpeed
            } 
            if (this.y < top || this.y > container.clientHeight - this.width  + top) {
              this.y = Math.max(top, Math.min(this.y, container.clientHeight - this.width + top))
              this.ySpeed = -this.ySpeed
            } 
      
            // Update the view
            [this.userdiv.style.left, this.userdiv.style.top] = [`${this.x}px`, `${this.y}px`]
            
            
          } 

          removePlayer() {
            [this.userdiv.style.width, this.userdiv.style.height] = [`0px`, `0px`]
          }
    }
    
    class Game {
      constructor(x, y, dx, dy, diameter, color, player) {
        // Initial model
        Object.assign(this, { x, y, dx, dy, diameter })
        
        // Initial view
        this.div = document.createElement('div')
        Object.assign(this.div.style, {
          left: `${x}px`,
          top: `${y}px`,
          width: `${diameter}px`,
          height: `${diameter}px`,
          backgroundColor: color,
          position: 'absolute',
        })
        container.appendChild(this.div)

        
        this.player = player;

        requestAnimationFrame(advance)

        
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
        [this.div.style.left, this.div.style.top] = [`${this.x}px`, `${this.y}px`]
        
        
      }

      remove() {
        [this.div.style.width, this.div.style.height] = [`0px`, `0px`]
      }

    }
  
    
    const advance = () => {
      
        
        if(game.player.x+(game.player.width) >= game.x 
            && game.player.x <= game.x + game.diameter
            && game.player.y <= game.y + game.diameter
            && game.player.y + game.player.height >= game.y){
            
            /*if(game.player.width >= game.diameter){
                game.remove()
            } else { */
                game.player.removePlayer()
            //} 

        } 
        game.move()

        //game.player.movePlayer()
        
        
        requestAnimationFrame(advance)
      
    }
  
    const playerW = 100;
    const playerH = 30;
    const player = new Player(
        container.offsetLeft + 5 + container.clientWidth/2 - playerW/2,
        container.offsetTop + 5 + container.clientHeight - playerH,
        10,
        10,
        playerW,
        playerH,
        'rgba(29, 29, 29, 1)'
    );
    const game = new Game(500, 250, 1, 1, 80, 'rgba(90, 255, 95, 0.6)', player);
    
})