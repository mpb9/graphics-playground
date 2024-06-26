window.addEventListener("load", () => {
  const container = document.querySelector("#bounceContainer");

  let hiddenWhenLoadingImage = false;

  let imaging = document.querySelector("#file");
  imaging.addEventListener("change", function () {
    hiddenWhenLoadingImage = true;
  });

  class Ball {
    constructor(x, y, dx, dy, diameter, color) {
      // Initial model
      Object.assign(this, { x, y, dx, dy, diameter });

      // Initial view
      this.div = document.createElement("div");
      Object.assign(this.div.style, {
        left: `${x + 205}px`,
        top: `${y}px`,
        width: `${diameter}px`,
        height: `${diameter}px`,
        borderRadius: `${diameter / 2}px`,
        backgroundColor: color,
        position: "absolute",
      });
      container.appendChild(this.div);

      requestAnimationFrame(advance);
    }

    move() {
      // Update the model
      [this.x, this.y] = [this.x + this.dx, this.y + this.dy];
      if (this.x < 205 || this.x > container.clientWidth - this.diameter + 205) {
        this.x = Math.max(0, Math.min(this.x, container.clientWidth - this.diameter + 205));
        this.dx = -this.dx;
      }
      if (this.y < 5 || this.y > container.clientHeight - this.diameter + 5) {
        this.y = Math.max(0, Math.min(this.y, container.clientHeight - this.diameter));
        this.dy = -this.dy;
      }

      // Update the view
      [this.div.style.left, this.div.style.top] = [`${this.x}px`, `${this.y}px`];
    }

    hide() {
      [this.div.style.width, this.div.style.height] = [`0px`, `0px`];
    }

    appear() {
      [this.div.style.width, this.div.style.height] = [`${this.diameter}px`, `${this.diameter}px`];
    }
  }

  const advance = () => {
    if (!hiddenWhenLoadingImage) {
      balls.forEach((ball) => ball.move());
      requestAnimationFrame(advance);
    } else {
      balls.forEach((ball) => ball.hide());
      setTimeout(() => {
        balls.forEach((ball) => ball.appear());
        hiddenWhenLoadingImage = false;
        advance();
      }, 4000);
    }
  };

  const balls = [
    new Ball(500, 50, 1 / 2, 2 / 6, 30, "rgba(90, 255, 95, 0.8)"),
    new Ball(500, 50, -1 / 2, -1 / 2, 35, "rgba(200, 41, 199, 0.9)"),
    new Ball(500, 50, 4 / 6, 4 / 6, 40, "rgba(100, 149, 237, 0.85)"),
  ];
});
