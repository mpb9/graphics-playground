const containerP = document.querySelector("#gameDisplay");

// MARK: Pawn class
class Pawn {
  constructor(x, y, ySpeed, width, height) {
    // Initial model
    Object.assign(this, { x, y, ySpeed, width, height });

    // Initial view
    this.pawnDiv = document.createElement("div");

    Object.assign(this.pawnDiv.style, {
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: `rgba(224, 109, 28, 1)`,
      position: "absolute",
    });

    this.prevY = this.y;

    containerP.appendChild(this.pawnDiv);
  }

  move() {
    // Update the model
    let top = containerP.offsetTop + 5;
    this.y = this.y + this.ySpeed;

    if (this.y + this.height > containerP.clientHeight + top) {
      this.y = (this.y - this.prevY) / 4 + this.prevY;
      this.prevY = this.y;

      if (this.prevY >= containerP.clientHeight + top - 160) {
        this.prevY = top + containerP.clientHeight / 4;
      }
    }

    // Update the view
    this.pawnDiv.style.top = `${this.y}px`;
  }
}
