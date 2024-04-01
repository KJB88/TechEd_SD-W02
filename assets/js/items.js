/* --------------------------- 
Item Handler
 --------------------------- */
// #region INIT. & VARS
const itemStoreElement = document.getElementById("item-store");

/* Item Class */
class Item {
  constructor(name, kpc, kps, basePrice, priceMod) {
    this.name = name;
    this.kpc = kpc;
    this.kps = kps;
    this.basePrice = basePrice;
    this.priceMod = priceMod;
    this.currentPrice = this.basePrice;
  }
}

/* All available items to purchase*/
const itemCollection = [
  new Item("Kitten", 0, 1, 100, 0.05),
  new Item("Noodle", 0, 5, 1000, 0.2),
  new Item("Chonker", 5, 0, 2000, 0.6),
];

const buttonCollection = []; // TODO: Weak association of button-to-item, needs refactor
const activeBtnStyle = "purchase-button";
const inactiveBtnStyle = "purchase-button-disabled";
const dropShadowStyle = "drop-shadow-2px";
const activeBtnHoverStyle = "purchase-button:hover";

populateItemShop(); // Populate the item shop

// #endregion INIT. & VARS
/* --------------------------- */
// #region HOOKS & HANDLERS

setInterval(checkKitties, 100); // Check to see if we can afford items

function checkKitties() {
  for (var i = 0; i < itemCollection.length; i++) {
    if (player.kittyCount < itemCollection[i].currentPrice) {
      if (buttonCollection[i].classList.contains(activeBtnStyle)) {
        // Remove active button styling
        buttonCollection[i].classList.remove(activeBtnStyle);
        // Add inactive button styling
        buttonCollection[i].classList.add(inactiveBtnStyle);
        // Stop responding to click events
        buttonCollection[i].removeEventListener("click", tryPurchaseItem);
      }
    } else {
      if (buttonCollection[i].classList.contains(inactiveBtnStyle)) {
        buttonCollection[i].classList.remove(inactiveBtnStyle);
        buttonCollection[i].classList.add(activeBtnStyle);
        buttonCollection[i].addEventListener("click", tryPurchaseItem);
      }
    }
  }
}

function tryPurchaseItem(event) {
  /* Compare clicked button to our tracked buttons */
  for (var i = 0; i < buttonCollection.length; i++) {
    if (event.target === buttonCollection[i]) {
      // Reduce kitty count by current price
      modifyKittyCount(itemCollection[i].currentPrice * -1);

      // Add the item to our collection
      addItemToPlayer(itemCollection[i], i);

      // Update the pricing to reflect new additional cost for next purchase
      updatePricing(itemCollection[i], player.items[i]);

      // Update Store UI to reflect the new price
      updateItemUI(
        buttonCollection[i],
        player.items[i],
        itemCollection[i].name,
        itemCollection[i].currentPrice
      );
    }
  }
}

// #endregion HOOKS & HANDLERS
/* --------------------------- */
// #region BUTTON SETUP

/* Update the UI with data */
function populateItemShop() {
  //console.log("Populating!");
  for (var i = 0; i < itemCollection.length; i++) {
    var element = document.createElement("button"); // Create button for item

    /* Set styling */
    element.classList.toggle(inactiveBtnStyle);
    element.classList.toggle(dropShadowStyle);
    element.classList.toggle(activeBtnHoverStyle);

    /* Set button text */
    element.textContent = `0 : ${itemCollection[i].name} : ${itemCollection[i].basePrice}`;

    /* Cache button */
    buttonCollection.push(element);
    itemStoreElement.append(element);
  }
}

// #endregion BUTTON SETUP
/* --------------------------- */
// #region PLAYER & ITEM STATE

function updatePricing(item, count) {
  // Assign locally to avoid unneeded verbosity
  var price = item.basePrice;
  var priceMod = item.priceMod;

  var newPrice = price * priceMod * count;
  item.currentPrice += newPrice; // Update new price
}

/* Add an item to the working collection */
function addItemToPlayer(item, index) {
  player.items[index]++;
  applyItem(item);
}

/* Apply the effects of the item to the current game state */
function applyItem(item, count = 1) {
  modifyKPS(item.kps * count);
  modifyKPC(item.kpc * count);
}

/* Update Store UI buttons to reflect change in count and price */
function updateItemUI(button, count, itemName, currentPrice) {
  button.textContent = `${count} : ${itemName} : ${currentPrice}`;
}

/* Load player items into the game state and caches */
function loadPlayerItems(items) {
  for (var i = 0; i < items.length; i++) {
    updatePricing(itemCollection[i], items[i]);
    applyItem(itemCollection[i], items[i]);
    updateItemUI(
      buttonCollection[i],
      items[i],
      itemCollection[i].name,
      itemCollection[i].currentPrice
    );

    player.items[i] = items[i];
  }
}

// #endreghion PLAYER & ITEM STATE
/* --------------------------- */
