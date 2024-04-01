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
      enableButton(itemBtnCollection[i], tryPurchaseItem);
    // Enable the button if player can afford
    else disableButton(itemBtnCollection[i], tryPurchaseItem); // Disable if player cannot afford
  }
}, 100);

/* Update the store with data */
function populateItemShop() {
  for (var i = 0; i < itemCollection.length; i++) {
    createStoreElement(itemBtnCollection, itemStoreElement);

    // Update UI
    updateStoreUI(
      itemBtnCollection[i],
      player.items[i],
      itemCollection[i].name,
      itemCollection[i].currentPrice
    );
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
      updateStoreUI(
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

function resetItems() {
  for (var i = 0; i < itemCollection.length; i++) {
    resetContent(itemCollection[i], itemBtnCollection[i]);
  }
}

/* Load player items into the game state and caches */
function loadPlayerItems(items) {
  for (var i = 0; i < items.length; i++) {
    updatePricingFromBeginning(itemCollection[i], items[i]);
    applyItem(itemCollection[i], items[i]);
    updateStoreUI(
      itemBtnCollection[i],
      items[i],
      itemCollection[i].name,
      itemCollection[i].currentPrice
    );

    player.items[i] = items[i];
  }
}

function getItemIndexByName(targetName) {
  for (var i = 0; i < itemCollection.length; i++) {
    if (itemCollection[i].name == targetName) return i;
  }
}
// #endregion PLAYER & ITEM STATE
/* --------------------------- */
