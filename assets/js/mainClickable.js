/* FETCH RESOURCES */
const mainClickable = document.getElementById("main-clickable");
const happyImg = "./assets/img/icon/gismo_happy.png";
const normalImg = "./assets/img/icon/gismo.png";
const defaultTop = mainClickable.offsetTop;
const defaultLeft = mainClickable.offsetLeft;

/* RESOURCE ALLOC. */
var clickImgReset = 0; // Current timer for resetting image after click
var animating = false; // Hover animation
const hoverAnimationTimer = 750;

/* HOOKS */
mainClickable.addEventListener("click", onClick); // Hook into onClick
mainClickable.addEventListener("mouseover", startHoverAnimation); // Hook into onHover

/* Respond to CLICK event */
function onClick() {
  // Ensure that we don't run more than one timer
  if (clickImgReset !== 0) return;

  mainClickable.src = happyImg; // Update image
  clickImgReset = setInterval(resetImage, 1000);
}

/* Reset the image after a intervval*/
function resetImage() {
  clearInterval(clickImgReset); // Clear current timer
  clickImgReset = 0; // Allow setup of another timer

  mainClickable.src = normalImg; // Update image
}

/* Begin animation by setting up timer */
function startHoverAnimation() {
  if (animating) return;

  beginHoverAnimating();
  animating = true;
  setTimeout(() => {
    animating = false;
  }, hoverAnimationTimer);
}

function beginHoverAnimating() {
  var offsetX = -10;
  var offsetY = -20;
  anim = mainClickable.animate(
    {
      left: [
        `${defaultLeft}px`,
        `${defaultLeft + offsetX}px`,
        `${defaultLeft}px`,
        `${defaultLeft + offsetX * -1}px`,
        `${defaultLeft}px`,
        `${defaultLeft + offsetX}px`,
        `${defaultLeft}px`,
        `${defaultLeft + offsetX * -1}px`,
        `${defaultLeft}px`,
        `${defaultLeft}px`,
        `${defaultLeft + offsetX}px`,
        `${defaultLeft}px`,
        `${defaultLeft + offsetX * -1}px`,
        `${defaultLeft}px`,
        `${defaultLeft + offsetX}px`,
        `${defaultLeft}px`,
        `${defaultLeft + offsetX * -1}px`,
        `${defaultLeft}px`,
        `${defaultLeft + offsetX}px`,
        `${defaultLeft}px`,
        `${defaultLeft + offsetX * -1}px`,
        `${defaultLeft}px`,
        `${defaultLeft + offsetX}px`,
        `${defaultLeft}px`,
        `${defaultLeft + offsetX * -1}px`,
      ],
      top: [`${defaultTop}px`, `${defaultTop + offsetY}px`, `${defaultTop}px`],
    },
    { duration: hoverAnimationTimer, easing: "ease-in-out", iterations: 1 }
  );
}
