/* --------------------------- */
/* REGION: INIT. & VARS */

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
var hasClickImgReset = false; // Current timer for resetting image after click
var isHoverAnimating = false; // Hover animation
const imgResetTimer = 1000;
const hoverAnimationTimer = 750;

/* Define new type of Mo.js Burst animation */
const burst = new mojs.Burst({
  radius: { 0: 200 },
  count: 6,
  children: {
    shape: "heart",
    speed: 2,
    radius: 20,
    points: 25,
    fill: { red: "red" },
    rotate: { 0: 360 },
    duration: 3000,
    delay: "stagger( rand(0, 200) )",
  },
});

/* ENDREGION: INIT. & VARS */
/* --------------------------- */
/* REGION: HOOKS & HANDLERS */

/* Event Hooks */
mainClickable.addEventListener("click", onClick); // Hook into onClick
mainClickable.addEventListener("mouseover", startHoverAnimation); // Hook into onHover
mainClickable.addEventListener("click", (e) => {});

/* Respond to CLICK event */
function onClick() {
  /* Clickable state independent */
  burst // Mo.js Burst func, tweak position of animation
    .tune({
      left: defaultLeft + defaultWidth * 0.5,
      top: defaultTop + defaultHeight * 0.5,
    })
    .replay();

  /* Clickable state dependent */
  // Ensure that we don't run more than one timer
  if (!hasClickImgReset) return;
  handleClickImg();
}

/* ENDREGION: HOOKS & HANDLERS */
/* --------------------------- */
/* #REGION: CLICKABLE IMG STATE HANDLING */

/* Handle Clickable Img State */
function handleClickImg() {
  mainClickable.src = happyImg; // Update image

  setTimeout(resetImage, imgResetTimer); // Set timer to reset image

  hasClickImgReset = false; // Flip state control
}

/* Reset the image after a interval */
function resetImage() {
  mainClickable.src = normalImg; // Update image
  hasClickImgReset = true; // Flip state control
}

/* #ENDREGION: CLICKABLE IMG STATE HANDLING */
/* --------------------------- */
/* #REGION: HOVER ANIMATION HANDLING */

/* Pre-animation setup by setting up timer */
function startHoverAnimation() {
  if (isHoverAnimating) return; // State control - if animating, don't try to animate again

  playHoverAnimation(); // Play ani

  // State control
  isHoverAnimating = true;
  setTimeout(() => {
    isHoverAnimating = false;
  }, hoverAnimationTimer);
}

/* Play hover animation after setup */
function playHoverAnimation() {
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

/* #ENDREGION: HOVER ANIMATION HANDLING*/
/* --------------------------- */
