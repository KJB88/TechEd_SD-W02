/* 
Common data/behaviours shared by both Items & Upgrades
*/
const activeBtnStyle = "purchase-button";
const inactiveBtnStyle = "purchase-button-disabled";
const dropShadowStyle = "drop-shadow-2px";
const activeBtnHoverStyle = "purchase-button:hover";
const tooltipStyle = "tooltip";
const tooltipTextStyle = "tooltipttext";

/* Base class for all 'purchaseables' */
class StoreContent {
  constructor(name, basePrice) {
    this.name = name;
    this.basePrice = basePrice;
    this.currentPrice = basePrice;
  }
}

/* Create a Button for the Store */
function createStoreElement(btnCollection, parentElement) {
  var element = document.createElement("button"); // Create button for item

  /* Set styling */
  element.classList.add(inactiveBtnStyle);
  element.classList.add(dropShadowStyle);

  btnCollection.push(element);
  parentElement.append(element);
}

function onCheckIfAffordable(currentPrice) {
  return player.kittyCount > currentPrice;
}

function disableButton(button, callback) {
  if (button.classList.contains(activeBtnStyle)) {
    // Remove active button styling
    button.classList.remove(activeBtnStyle);

    // Add inactive button styling
    button.classList.add(inactiveBtnStyle);

    // Stop responding to click events
    button.removeEventListener("click", callback);

    // Tooltip disable
  }
}

function enableButton(button, callback) {
  if (button.classList.contains(inactiveBtnStyle)) {
    // Remove inactive button styling
    button.classList.remove(inactiveBtnStyle);

    // Add active button styling
    button.classList.add(activeBtnStyle);

    // Start responding to click events
    button.addEventListener("click", callback);

    // Tooltip disable
  }
}

function updatePricing(content, count) {
  if (count == 0) content.currentPrice = content.basePrice;
  else content.currentPrice += content.basePrice * 0.5;
}

function updatePricingFromBeginning(content, count) {
  for (var i = 0; i < count; i++) {
    content.currentPrice += content.basePrice * 0.5;
  }
}

/* Update Store UI button to reflect change in count and price */
function updateStoreUI(
  button,
  count,
  contentName,
  currentPrice,
  additionalInfo = ""
) {
  button.textContent = `${count} : ${contentName} : ${currentPrice} ${additionalInfo}`;
}

function resetContent(content, button) {
  content.currentPrice = content.basePrice;

  updateStoreUI(button, 0, content.name, content.currentPrice);
}
