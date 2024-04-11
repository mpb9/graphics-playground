window.addEventListener("load", () => {
  const container = document.querySelector("#gameDisplay");

  // MARK: Player class
  class Player {
    constructor(x, y, xSpeed, ySpeed, width, height, color) {
      Object.assign(this, { x, y, xSpeed, ySpeed, width, height });

      // Initial view
      this.userdiv = document.createElement("div");
      Object.assign(this.userdiv.style, {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
        position: "absolute",
      });
      container.appendChild(this.userdiv);

      // Initiate arrow key event listeners
      document.addEventListener("keydown", (e) => {
        switch (e.code) {
          case "ArrowUp":
            this.userMove(0, -1);
            break;
          case "ArrowDown":
            this.userMove(0, 1);
            break;
          case "ArrowLeft":
            this.userMove(-1, 0);
            break;
          default:
            this.userMove(1, 0);
        }
      });
    }

    // Update Player position based on user input
    userMove(xMove, yMove) {
      [this.x, this.y] = [this.x + xMove * this.xSpeed, this.y + yMove * this.ySpeed];
      [this.userdiv.style.left, this.userdiv.style.top] = [`${this.x}px`, `${this.y}px`];
    }

    // Make sure the player doesn't go out of the container
    movePlayer() {
      let top = container.offsetTop + 5;
      let left = container.offsetLeft + 5;
      [this.x, this.y] = [this.x + this.xSpeed, this.y + this.ySpeed];
      if (this.x < left || this.x > container.clientWidth + left - this.width) {
        this.x = Math.max(left, Math.min(this.x, container.clientWidth + left - this.width));
        this.xSpeed = -this.xSpeed;
      }
      if (this.y < top || this.y > container.clientHeight - this.width + top) {
        this.y = Math.max(top, Math.min(this.y, container.clientHeight - this.width + top));
        this.ySpeed = -this.ySpeed;
      }

      [this.userdiv.style.left, this.userdiv.style.top] = [`${this.x}px`, `${this.y}px`];
    }

    // Game over
    removePlayer() {
      [this.userdiv.style.width, this.userdiv.style.height] = [`0px`, `0px`];
    }
  }

  // MARK: Game class
  class Game {
    constructor(pawns, player, arena) {
      this.pawns = pawns;
      this.player = player;
      this.arena = arena;

      requestAnimationFrame(advance);
    }

    // Game OVER!
    pawnsWin() {
      this.player.removePlayer();
      this.pawns.forEach((pawn) => pawn.removePawn());
      this.arena.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
      document.removeEventListener("keydown", this.player.userMove);
      document.querySelector("#gameDisplay").addEventListener("click", () => {
        location.reload();
      });
    }

    // Shut down the entire game container (chaos scenario)
    remove() {
      [this.div.style.width, this.div.style.height] = [`0px`, `0px`];
    }
  }

  // MARK: Update Pawn position & check for collision
  const advance = () => {
    game.pawns.forEach((pawn) => {
      if (
        game.player.x + game.player.width >= pawn.x &&
        game.player.x <= pawn.x + pawn.width &&
        game.player.y <= pawn.y + pawn.height &&
        game.player.y + game.player.height >= pawn.y
      ) {
        return game.pawnsWin();
      }
      pawn.move();
    });
    requestAnimationFrame(advance);
  };

  // MARK: Initialize new Player, Pawns, Game & Arena
  const arena = new Arena(container);

  const playerW = 80;
  const playerH = 30;
  const player = new Player(
    container.offsetLeft + 5 + container.clientWidth / 2 - playerW / 2,
    container.offsetTop + 5 + container.clientHeight - playerH,
    14,
    14,
    playerW,
    playerH,
    "rgba(29, 29, 29, 1)"
  );
  const pawns = [
    new Pawn(container.offsetLeft + 5, container.offsetTop + 5, 3, 20, 24),
    new Pawn(container.offsetLeft + container.clientWidth / 2, container.offsetTop + 5, 3, 30, 36),
  ];

  const game = new Game(pawns, player, arena);
});
