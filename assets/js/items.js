/* --------------------------- 
Item Handler
 --------------------------- */
// #region INIT. & VARS
const itemStoreElement = document.getElementById("item-store");

/* Item Class */
class Item extends StoreContent {
  constructor(name, kpc, kps, basePrice) {
    super(name, basePrice);
    this.kpc = kpc;
    this.kps = kps;
  }
}

/* All available items to purchase*/
const itemCollection = [
  new Item("Kitten", 0, 1, 100),
  new Item("Noodle", 0, 5, 1000),
  new Item("Chonker", 5, 0, 2000),
];

const itemBtnCollection = []; // TODO: Weak association of button-to-item, needs refactor

populateItemShop();

// Check to see if we can afford items
setInterval(() => {
  for (var i = 0; i < itemCollection.length; i++) {
    // Based on player wealth
    if (onCheckIfAffordable(itemCollection[i].currentPrice))
      enableButton(itemBtnCollection[i]);
    // Enable the button if player can afford
    else disableButton(itemBtnCollection[i]); // Disable if player cannot afford
  }
}, 100);

function populateItemShop() {
  //console.log("Populating!");
  for (var i = 0; i < itemCollection.length; i++) {
    createStoreElement(itemBtnCollection, itemStoreElement);

    // Set button text
    itemBtnCollection[
      i
    ].textContent = `${player.items[i]} : ${itemCollection[i].name} : ${itemCollection[i].currentPrice}`;
  }
}

// #endregion INIT. & VARS
/* --------------------------- */
// #region HOOKS & HANDLERS

function tryPurchaseItem(event) {
  /* Compare clicked button to our tracked buttons */
  for (var i = 0; i < itemBtnCollection.length; i++) {
    if (event.target === itemBtnCollection[i]) {
      // Reduce kitty count by current price
      modifyKittyCount(itemCollection[i].currentPrice * -1);

      // Add the item to our collection
      addItemToPlayer(itemCollection[i], i);

      // Update the pricing to reflect new additional cost for next purchase
      updatePricing(itemCollection[i], player.items[i]);

      // Update Store UI to reflect the new price
      updateItemUI(
        itemBtnCollection[i],
        player.items[i],
        itemCollection[i].name,
        itemCollection[i].currentPrice
      );
    }
  }
}

// #endregion HOOKS & HANDLERS
/* --------------------------- */
// #region PLAYER & ITEM STATE

function updatePricing(item, count) {
  if (count == 0) item.currentPrice = item.basePrice;
  else item.currentPrice += item.basePrice * 0.5;
}

function updatePricingFromBeginning(item, count) {
  for (var i = 0; i < count; i++) {
    item.currentPrice += item.basePrice * 0.5;
  }
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

function resetItems() {
  for (var i = 0; i < itemCollection.length; i++) {
    itemCollection[i].currentPrice = itemCollection[i].basePrice;
    updateItemUI(
      itemBtnCollection[i],
      0,
      itemCollection[i].name,
      itemCollection[i].currentPrice
    );
  }
}
/* Load player items into the game state and caches */
function loadPlayerItems(items) {
  for (var i = 0; i < items.length; i++) {
    updatePricingFromBeginning(itemCollection[i], items[i]);
    applyItem(itemCollection[i], items[i]);
    updateItemUI(
      itemBtnCollection[i],
      items[i],
      itemCollection[i].name,
      itemCollection[i].currentPrice
    );

    player.items[i] = items[i];
  }
}
// #endreghion PLAYER & ITEM STATE
/* --------------------------- */
