/* --------------------------- */
/* #REGION: INIT. & VARS */

/* Fetch DOM & Assets */
const mainClickable = document.getElementById("main-clickable");
const happyImg = "./assets/img/icon/gismo_happy.png";
const normalImg = "./assets/img/icon/gismo.png";

/* Fetch required data from DOM objects*/
const boundingRect = mainClickable.getBoundingClientRect();
const defaultTop = boundingRect.top; // Default top position for mainClickable
const defaultLeft = boundingRect.left; // Default left position for mainClickable
const defaultWidth = boundingRect.width; // Default width for mainClickable
const defaultHeight = boundingRect.height; // Default height for mainClickable

/* Anim & Img State Control */
var hasClickableImgReset = true; // Current timer for resetting image after click
var isWiggleAnimating = false; // Hover animation
const imgResetTimer = 500;
const wiggleAniTimer = 750;

/* #ENDREGION: INIT. & VARS */
/* --------------------------- */
/* REGION: HOOKS & HANDLERS */

/* Event Hooks */
mainClickable.addEventListener("click", mainClickable_onClick); // Hook into onClick
mainClickable.addEventListener("mouseover", onHover); // Hook into onHover

/* MOUSEOVER Handler */
function onHover() {
  handleClickImg();
}

/* ONCLICK Handler */
function mainClickable_onClick() {
  getNewBurst(); // Get a new burst animation (to make more than one particle system output)
  handleClickImg();

  if (isWiggleAnimating) return; // State control - if animating, don't try to animate again

  playWiggleAni(); // Play ani

  // State control
  isWiggleAnimating = true;
  setTimeout(() => {
    isWiggleAnimating = false;
  }, wiggleAniTimer);
}

/* #ENDREGION: HOOKS & HANDLERS */
/* --------------------------- */
/* #REGION: IMG SWITCH HANDLING */

/* Handle Clickable Img State */
function handleClickImg() {
  if (!hasClickableImgReset) return; // Ensure that we don't run more than one timer

  mainClickable.src = happyImg; // Update image

  setTimeout(resetImage, imgResetTimer); // Set timer to reset image

  hasClickableImgReset = false; // Flip state control
}

/* Reset the image after a interval */
function resetImage() {
  mainClickable.src = normalImg; // Update image
  hasClickableImgReset = true; // Flip state control
}

/* #ENDREGION: IMG SWITCH HANDLING */
/* --------------------------- */
/* #REGION: ANIMATION HANDLING */

/* Define new type of Mo.js Burst animation */
function getNewBurst() {
  // Create new burst
  const burst = new mojs.Burst({
    radius: { 0: "rand(100, 300)" },
    count: "rand(2, 4)",
    degree: 360,
    rotate: { 0: "rand(-360, 360)" },
    children: {
      shape: "heart",
      speed: 1,
      radius: "rand(10, 25)",
      points: 5,
      degreeShift: "rand(-45, 45)",
      rotate: { 0: "rand(-360, 360)" },
      fill: { red: "red" },
      duration: "rand(1000, 3000)",
    },
  });

  /* Set pointer events of the burst element to none,
  this stops click blocking */
  burst.el.style.pointerEvents = "none";

  // Mo.js Burst func, tweak position of animation
  burst
    .tune({
      left: defaultLeft + defaultWidth * 0.5,
      top: defaultTop + defaultHeight * 0.5,
    })
    .replay();
}

/* Play wiggle animation after setup */
function playWiggleAni() {
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
    { duration: wiggleAniTimer, easing: "ease-in-out", iterations: 1 }
  );
}

/* #ENDREGION: HOVER ANIMATION HANDLING*/
/* --------------------------- */
