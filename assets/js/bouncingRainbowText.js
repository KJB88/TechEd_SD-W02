/* --------------------------- 
Rainbow Text Handler
 --------------------------- */
// #region INIT. & VARS

/* Fetch DOM objects */
const footerTextElement = document.getElementById("footer-text"); // Footer element that holds text
const textOutput = footerTextElement.textContent; // Text from the footer element
footerTextElement.textContent = ""; // Clear footer element

/* Colour array for rainbow text */
const colors = ["red", "orange", "green", "blue", "darkblue", "purple"]; // Color array of desired colors

/* Spans for indivdiual colouring of text */
var rainbowSpans = []; // Span Array for caching Spans (to avoid constant instantiation)
const spanObj = {
  colorCounter: 0,
  spanElement: null,
};
var bounceIndexer = 0; // Bounce indexer (which span gets to bounce)

constructTextSpans();

// #endregion INIT. & VARS */
/* --------------------------- */
// #region HOOKS  */

setInterval(rainbowText, 100); // Rainbow randomness!
setInterval(bounce, 130); // Wavey Bounce!

// #endregion HOOKS
/* --------------------------- */
// #region SPAN MANAGEMENT

/* Construct and cache Spans for use */
function constructTextSpans() {
  for (var i = 0; i < textOutput.length; i++) {
    var element = document.createElement("span"); // Create span

    let newSpan = new Object(); // Create new span object
    populateSpan(newSpan, element, i); // Setup the Span object with its data
    applySpan(newSpan); // Apply the Span to the DOM
  }
}

/* Span Builder to populate Span with required data */
function populateSpan(newSpan, spanElement, loopIndex) {
  newSpan.spanElement = spanElement; // Assign element to its field

  // Handle overflow of colorIndex assignment
  if (loopIndex > colors.length - 1)
    newSpan.colorCounter = loopIndex - colors.length;
  // Assign color to its field
  else newSpan.colorCounter = loopIndex;
}

/* Cache and Interface the new Span to the DOM */
function applySpan(newSpan) {
  rainbowSpans.push(newSpan); // Cache span
  footerTextElement.appendChild(newSpan.spanElement); // Add span to footer div
}

/* Decrement ('wave' to the right) color counter of current Span - handles overflow and wraparound */
function decrementColorCounter(currentSpan) {
  currentSpan.colorCounter--;

  if (currentSpan.colorCounter < 0)
    currentSpan.colorCounter = colors.length - 1;
}

// #endregion SPAN MANAGEMENT
/* --------------------------- */
// #region ANIMATION

/* Apply rainbow text */
function rainbowText() {
  for (var i = 0; i < textOutput.length; i++) {
    rainbowSpans[i].spanElement.textContent = textOutput.charAt(i);

    if (textOutput.charAt(i) != " ") {
      rainbowSpans[i].spanElement.style.color =
        colors[rainbowSpans[i].colorCounter]; // Assign the color to the element
    }

    // Decrement current Span's colorCounter
    rainbowSpans[i].colorCounter = stepValue(
      rainbowSpans[i].colorCounter,
      -1,
      0,
      colors.length - 1
    );
  }
}

/* Set animation for Span denoted by bounceIndexer */
function bounce() {
  var span = rainbowSpans[bounceIndexer].spanElement;
  span.style.position = "relative";
  span.animate(
    {
      top: [
        "0px",
        "-1px",
        "-3px",
        "-5px",
        "-10px",
        "-15px",
        "-20px",
        "-22px",
        "-24px",
        "-25px",
        "-24px",
        "-22px",
        "-20px",
        "-15px",
        "-10px",
        "-5px",
        "-3px",
        "-1px",
        "0px",
      ],
    },
    { duration: 1300, easing: "ease-in-out", iterations: 1 }
  );

  // Increment bounce counter
  bounceIndexer = stepValue(bounceIndexer, 1, 0, rainbowSpans.length - 1);
}
// #endregion ANIMATION  */
/* --------------------------- */
