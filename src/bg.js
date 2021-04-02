const body = document.querySelector("body");
const image = document.querySelector("img");

const IMG_NUMBER = 4;

function paintImage(imgNumber) {
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
