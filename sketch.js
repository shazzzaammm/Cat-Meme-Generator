class TextArea {
  constructor(x, y, t) {
    this.x = x;
    this.y = y;
    this.t = t;
  }
  addLetter(l) {
    this.t += l;
  }
  removeLetter() {
    this.t = this.t.slice(0, -1);
  }
  display() {
    if (this.y > extraCanvasHeight) {
      fill(255);
      stroke(0);
      strokeWeight(6);
    } else {
      fill(0);
      noStroke();
    }
    textSize(canvasSize / 15);
    textStyle(BOLD);
    text(
      this.t,
      this.x,
      this.y,
      canvasSize - this.x,
      canvasSize + extraCanvasHeight - this.y
    );
  }
}

let textAreas = [];
const getButton = document.querySelector(".get-image");
const imageURL = "https://cataas.com/cat?json=true";
let imgSrc = "";
let img;
let canvasSize = min(window.innerWidth / 3, window.innerHeight / 1.5);
let extraCanvasHeight = canvasSize / 5;
function setup() {
  createCanvas(canvasSize, canvasSize + extraCanvasHeight);
  getImage();
}

function draw() {
  background(255);
  if (img != null) {
    image(img, 0, extraCanvasHeight, canvasSize, canvasSize);
  }
  for (const t of textAreas) {
    t.display();
  }
}

function mousePressed() {
  textAreas.push(new TextArea(mouseX, mouseY, ""));
}

function keyPressed() {
  if (textAreas.length > 0) {
    if (key == "Backspace") {
      textAreas[textAreas.length - 1].removeLetter();
    } else if (key == "Enter") {
      textAreas[textAreas.length - 1].addLetter("\n");
    } else if (
      key == "Alt" ||
      key == "Tab" ||
      key == "Shift" ||
      key == "Control" ||
      key == "CapsLock"
    ) {
      return;
    } else {
      textAreas[textAreas.length - 1].addLetter(key);
    }
  }
}
function getImage() {
  fetch(imageURL)
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      imgSrc = `https://cataas.com${res.url}`;
      img = loadImage(imgSrc);
    });
  textAreas = [];
}

function min(n1, n2) {
  if (n1 < n2) {
    return n1;
  }
  return n2;
}
getButton.addEventListener("click", getImage);
