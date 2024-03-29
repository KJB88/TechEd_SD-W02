/* --------------------------- 
Common stateless helper functions
 --------------------------- */

/* Steps the Current value by Step.
Hanldes overflow by wrapping around from Max to Min and Min to Max */
function stepValue(current, step, min, max) {
  current += step;

  if (current > max) current = min;
  else if (current < min) current = max;

  return current;
}

/* Updates a given text element with the given text*/
function updateTextElement(element, text) {
  element.textContent = text;
}

/* Get a random integer from 0 to max */
function getRandomIntFromZero(max) {
  return Math.floor(Math.random() * max);
}

/* Capitalize the first letter of a string */
function capitliseFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/* --------------------------- */
