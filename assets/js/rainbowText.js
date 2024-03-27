const footerTextElement = document.getElementById("footer-text");

const colors = ["red", "orange", "green", "blue", "darkblue", "purple"];

var str = footerTextElement.textContent;
footerTextElement.textContent = "";
var output = "";

for (var i = 0; i < str.length; i++) {
  var element = document.createElement("span"); // Create span
  element.textContent = str.charAt(i);

  if (str.charAt(i) != " ") {
    var colorIndex = Math.trunc(Math.floor(Math.random() * 6)); // Get a random color from the color array
    element.style.color = colors[colorIndex]; // Assign the color to the element
  }

  footerTextElement.appendChild(element); // Add span to footer
}
