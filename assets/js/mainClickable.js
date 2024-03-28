const mainClickable = document.getElementById("main-clickable");
const happyImg = "./assets/img/gismo_happy.png";
const normalImg = "./assets/img/gismo.png";

mainClickable.addEventListener("click", onClick);

var currentWorker = null;

function onClick(event) {
  mainClickable.src = happyImg;
  if (!currentWorker) currentWorker = setInterval(resetImage, 1000);
}

function resetImage() {
  clearInterval(currentWorker);
  currentWorker = null;

  mainClickable.src = normalImg;
}
