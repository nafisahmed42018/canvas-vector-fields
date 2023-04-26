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
  vectorField.animate();
};

window.addEventListener("resize", () => {
  cancelAnimationFrame(vectorFieldAnimation);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  vectorField = new VectorField(ctx, canvas.width, canvas.height);
  vectorField.animate();
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
    this.angle = 0;
  }

  #draw(x, y) {
    let length = 300;
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y);
    this.#ctx.lineTo(x + length, y + length);
    this.#ctx.closePath();
    this.#ctx.stroke();
  }

  animate() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    this.angle += 0.1;
    this.#draw(
      this.#width / 2 + Math.sin(this.angle) * 100,
      this.#height / 2 + Math.cos(this.angle) * 100
    );
    // console.log("animating");

    vectorFieldAnimation = requestAnimationFrame(this.animate.bind(this));
  }
}
