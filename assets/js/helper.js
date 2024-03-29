/* Steps the Current value by Step.
Hanldes overflow by wrapping around from Max to Min and Min to Max */
function stepValue(current, step, min, max) {
  current += step;

  if (current > max) current = min;
  else if (current < min) current = max;

  return current;
}

function updateTextElement(element, text) {
  element.textContent = text;
}

function getRandomIntFromZero(max) {
  return Math.floor(Math.random() * max);
}
