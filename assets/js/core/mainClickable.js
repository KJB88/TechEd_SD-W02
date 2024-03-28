const mainClickable = document.getElementById("main-clickable");
const happyImg = "./assets/img/gismo_happy.png";
const normalImg = "./assets/img/gismo.png";

mainClickable.addEventListener("click", onClick);
mainClickable.addEventListener("hover", wibble);
setInterval(ani, 1300);
var currentWorker = false;

function onClick(event) {
  mainClickable.src = happyImg;
  if (!currentWorker) currentWorker = setInterval(resetImage, 1000);
}

function resetImage() {
  clearInterval(currentWorker);
  currentWorker = false;

  mainClickable.src = normalImg;
}

var wibbling = false;
function wibble() {
  if (wibbling) return;

  setInterval(ani, 250);
  wibbling = true;
}

function ani() {
  var defaultTop = mainClickable.offsetTop;
  var minY = defaultTop * -1;
  var maxY = defaultTop * 1; // TODO - Modifier

  mainClickable.animate(
    {
      top: [`${defaultTop}px`, "100px", `${defaultTop}px`],
    },
    { duration: 1300, easing: "ease-in-out", iterations: 1 }
  );
}
