/* CONFIG */
const footerTextElement = document.getElementById("footer-text"); // Footer element that holds text
const colors = ["red", "orange", "green", "blue", "darkblue", "purple"]; // Color array of desired colors

const textOutput = footerTextElement.textContent; // Text from the footer element
footerTextElement.textContent = ""; // Clear footer element

var rainbowSpans = []; // Span cache

const spanObj = {
  colorCounter: 0,
  spanElement: null,
};

var bounceIndexer = 0; // Bounce indexer

/* INIT. */
constructTextSpans();

/* HOOKS */
setInterval(rainbowText, 100); // Rainbow randomness!
setInterval(bounce, 130);

/* FUNCS */
/* Construct and cache Spans for use */
function constructTextSpans() {
  for (var i = 0; i < textOutput.length; i++) {
    var element = document.createElement("span"); // Create span

    let newSpan = new Object(); // Create new span object
    newSpan.spanElement = element; // Assign element to its field

    // Handle overflow of colorIndex assignment
    if (i > colors.length - 1)
      newSpan.colorCounter = i - colors.length; // Assign color to its field
    else newSpan.colorCounter = i;

    rainbowSpans.push(newSpan); // Cache span

    footerTextElement.appendChild(newSpan.spanElement); // Add span to footer div
  }
}

/* Apply rainbow text */
function rainbowText() {
  for (var i = 0; i < textOutput.length; i++) {
    rainbowSpans[i].spanElement.textContent = textOutput.charAt(i);

    if (textOutput.charAt(i) != " ") {
      rainbowSpans[i].spanElement.style.color =
        colors[rainbowSpans[i].colorCounter]; // Assign the color to the element
    }

    decrementColorCounter(rainbowSpans[i]);
  }
}

/* Decrement color counter of current Span - handles overflow and wraparound */
function decrementColorCounter(currentSpan) {
  currentSpan.colorCounter--;

  if (currentSpan.colorCounter < 0)
    currentSpan.colorCounter = colors.length - 1;
}

function bounce() {
  var span = rainbowSpans[bounceIndexer].spanElement;
  span.style.position = "relative";
  span.animate(
    {
      top: ["0px", "-10px", "-25px", "-10px", "0px"],
    },
    { duration: 1300, easing: "ease-in-out", iterations: 1 }
  );

  incrementBounceCounter();
}

function incrementBounceCounter() {
  bounceIndexer++;

  if (bounceIndexer > rainbowSpans.length - 1) bounceIndexer = 0;
}
