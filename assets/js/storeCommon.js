/* 
Common data/behaviours shared by both Items & Upgrades
*/
const activeBtnStyle = "purchase-button";
const inactiveBtnStyle = "purchase-button-disabled";
const dropShadowStyle = "drop-shadow-2px";
const activeBtnHoverStyle = "purchase-button:hover";

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
  element.classList.toggle(inactiveBtnStyle);
  element.classList.toggle(dropShadowStyle);
  element.classList.toggle(activeBtnHoverStyle);

  btnCollection.push(element);
  parentElement.append(element);
}

function onCheckIfAffordable(currentPrice) {
  return player.kittyCount > currentPrice;
}

function disableButton(button) {
  if (button.classList.contains(activeBtnStyle)) {
    // Remove active button styling
    button.classList.remove(activeBtnStyle);
    // Add inactive button styling
    button.classList.add(inactiveBtnStyle);
    // Stop responding to click events
    button.removeEventListener("click", tryPurchaseItem);
  }
}

function enableButton(button) {
  if (button.classList.contains(inactiveBtnStyle)) {
    button.classList.remove(inactiveBtnStyle);
    button.classList.add(activeBtnStyle);
    button.addEventListener("click", tryPurchaseItem);
  }
}
