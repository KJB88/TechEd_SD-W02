/* FETCH RESOURCES */
const mainClickable = document.getElementById("main-clickable");
const happyImg = "./assets/img/icon/gismo_happy.png";
const normalImg = "./assets/img/icon/gismo.png";
const defaultTop = mainClickable.offsetTop;
const defaultLeft = mainClickable.offsetLeft;

/* RESOURCE ALLOC. */
var clickImgReset = 0; // Current timer for resetting image after click
var animating = false; // Hover animation
var hoverAnimation;

/* HOOKS */
mainClickable.addEventListener("click", onClick); // Hook into onClick
mainClickable.addEventListener("mouseover", startHoverAnimation); // Hook into onHover
//mainClickable.addEventListener("mouseout", stopHoverAnimation); // Hook into mouseOut

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
  if (!animating) beginHoverAnimating();
  animating = true;
}

function stopHoverAnimation() {
  console.log(animating);
  animating = false;
  hoverAnimation.removeEventListener("animationcancel", stopHoverAnimation);
}

function beginHoverAnimating() {
  var minY = defaultTop * -1;
  var maxY = defaultTop * 1; // TODO - Modifier

  hoverAnimation = mainClickable.animate(
    {
      top: [`${defaultTop}px`, "100px", `${defaultTop}px`],
    },
    { duration: 1300, easing: "ease-in-out", iterations: 1 }
  );

  var promise = hoverAnimation.finished;
}
