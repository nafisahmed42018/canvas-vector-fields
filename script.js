let canvas;
let ctx;
let vectorField;
let vectorFieldAnimation;

window.onload = function () {
  canvas = document.getElementById("canvas1");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  vectorField = new VectorField(ctx, canvas.width, canvas.height);
  vectorField.animate(0);
};

window.addEventListener("resize", () => {
  cancelAnimationFrame(vectorFieldAnimation);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  vectorField = new VectorField(ctx, canvas.width, canvas.height);
  vectorField.animate(0);
});

const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// for flow  field effect

class VectorField {
  #ctx;
  #width;
  #height;
  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#width = width;
    this.#height = height;
    this.lastTime = 0;
    this.interval = 1000 / 60;
    this.timer = 0;
    // 5
    this.cellSize = 15;
    this.gradient;
    this.curvatureRadius = 0;
    this.curveVelocity = 0.03;
    this.#drawGradient();
    this.#ctx.strokeStyle = this.gradient;
  }
  //Private method to draw the line
  #drawLine(x, y, angle) {
    // 20
    let length = 15;
    // .2/.3
    this.#ctx.lineWidth = 1;
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y);
    this.#ctx.lineTo(
      x + Math.sin(angle) * length,
      y + Math.cos(angle) * length
    );
    this.#ctx.closePath();
    this.#ctx.stroke();
  }
  // Private method to create gradien spectrum in the canvas
  #drawGradient() {
    this.gradient = this.#ctx.createLinearGradient(
      0,
      0,
      this.#width,
      this.#height
    );
    this.gradient.addColorStop(".1", "#9400d3");
    this.gradient.addColorStop(".2", "#4b0082");
    this.gradient.addColorStop(".3", "#0000ff");
    this.gradient.addColorStop(".5", "#00ff00");
    this.gradient.addColorStop(".7", "#ffff00");
    this.gradient.addColorStop(".8", "#ff7f00");
    this.gradient.addColorStop(".9", "#ff0000");
  }
  // Method to draw the line in canvas and animate it
  animate(timeStamp) {
    // deltaTime to get the interval of animation frame
    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
    console.log(deltaTime);
    if (this.timer > this.interval) {
      this.#ctx.clearRect(0, 0, this.#width, this.#height);
      this.curvatureRadius += this.curveVelocity;
      if (this.curvatureRadius > 10 || this.curvatureRadius < -10)
        this.curveVelocity *= -1;
      for (let i = 0; i < this.#height; i += this.cellSize) {
        for (let j = 0; j < this.#width; j += this.cellSize) {
          // The multiplier outside decides how much the pattern is curving on itself
          // The value multiplier inside sine and cosine function zooms in or out of the Pattern
          // Lower value results in zooming out
          // .005
          const angle =
            (Math.cos(j * 0.0075) + Math.sin(i * 0.0075)) *
            this.curvatureRadius;
          this.#drawLine(j, i, angle);
        }
      }
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    vectorFieldAnimation = requestAnimationFrame(this.animate.bind(this));
  }
}
