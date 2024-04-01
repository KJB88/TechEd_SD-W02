const sandboxElement = document.getElementById("griditem-sandbox");

const sandboxBounds = sandboxElement.getBoundingClientRect();

const minY = 450;
const maxY = 1150;
const minX = 700;
const maxX = 1500;

const catImg = "./assets/img/icon/gismo.png";

var catCollection = [];

function addCat() {
  var img = document.createElement("img"); // Create img

  img.src = catImg; // Set src
  img.classList.add("sandbox-img"); // Add styling

  var top = clampNumber(Math.random() * maxY, minY, maxY) + "px"; // Randomise Y
  var left = clampNumber(Math.random() * maxX, minX, maxX) + "px"; // Randomise X

  img.style.top = top; // Set Y
  img.style.left = left; // Set X

  sandboxElement.append(img); // Append to parent
  catCollection.push(img); // Collect cats!
}

function clearCats() {
  for (var i = 0; i < catCollection.length; i++) {
    catCollection[i].remove();
  }
}

function loadCats(items) {
  for (var i = 0; i < items.length; i++) {
    for (var j = 0; j < items[i]; j++) addCat();
  }
}
