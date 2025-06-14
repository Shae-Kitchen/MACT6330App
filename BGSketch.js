let balls = [];
let num = 25;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < num; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(350, 400);
    balls[i] = new Circle(x, y, r);
  }
}

function draw() {
  background("#FAF6F2");

  for (let i = 0; i < num; i++) {
    balls[i].update();
    balls[i].display();
  }
}

class Circle {
  constructor(x, y, radius) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.radius = radius;

    this.ctx = drawingContext;

    this.pastelPalette = paletteCreator();
    this.c = this.getPastelColor();
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.x > width + this.radius) {
      this.vel.x *= -random(0.5, 1.25);
      this.pos.x = width + (this.radius - 1);
    } else if (this.pos.x < 0 - this.radius) {
      this.vel.x *= -random(0.5, 1.25);
      this.pos.x = 0 - (this.radius - 1);
    }
    if (this.pos.y > height + this.radius) {
      this.vel.y *= -random(0.5, 1.25);
      this.pos.y = height + (this.radius - 1);
    } else if (this.pos.y < 0 - this.radius) {
      this.vel.y *= -random(0.5, 1.25);
      this.pos.y = 0 - (this.radius - 1);
    }
  }

  display() {
    let gradient = this.ctx.createRadialGradient(
      this.pos.x,
      this.pos.y,
      0,
      this.pos.x,
      this.pos.y,
      this.radius
    );

    let r = red(this.c);
    let g = green(this.c);
    let b = blue(this.c);

    gradient.addColorStop(0, `rgb(${r}, ${g}, ${b}, 0.95)`);
    gradient.addColorStop(0.8, `rgb(${r}, ${g}, ${b}, 0.2)`);
    gradient.addColorStop(1, `rgb(${r}, ${g}, ${b}, 0)`);

    // gradient.addColorStop(0, "green");
    // gradient.addColorStop(0.7, "white");
    // gradient.addColorStop(1, "pink");
    this.ctx.fillStyle = gradient;

    noStroke();
    ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
  }

  getPastelColor() {
    return random(this.pastelPalette); // Picks a random element automatically
  }
}

function paletteCreator() {
  return [
    color(205, 171, 242),
    color(251, 227, 246),
    color(187, 237, 239),
    color(59, 135, 227),
    color(123, 83, 147),
  ];
}
