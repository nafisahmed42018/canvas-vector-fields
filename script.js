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
    this.#ctx.strokeStyle = "white";
    this.#width = width;
    this.#height = height;
    this.lastTime = 0;
    this.interval = 1000 / 60;
    this.timer = 0;
  }

  #drawLine(x, y) {
    let length = 300;
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y);
    this.#ctx.lineTo(mouse.x, mouse.y);
    this.#ctx.closePath();
    this.#ctx.stroke();
  }

  animate(timeStamp) {
    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
    if (this.timer > this.interval) {
      this.#ctx.clearRect(0, 0, this.#width, this.#height);
      this.#drawLine(this.#width / 2, this.#height / 2);
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    vectorFieldAnimation = requestAnimationFrame(this.animate.bind(this));
  }
}
