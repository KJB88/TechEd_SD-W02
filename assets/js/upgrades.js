/* --------------------------- 
Upgrade Handler
--------------------------- */
// #region INIT. & VARS
const upgradeStoreElement = document.getElementById("upgrade-store");

class Upgrade extends StoreContent {
  constructor(name, itemTarget, kps, kpc, basePrice) {
    super(name, basePrice);
    this.kps = kps;
    this.kpc = kpc;
    this.itemTarget = itemTarget;
  }
}

const upgradeCollection = [
  new Upgrade("Catnip", "Kitten", 0, 1, 100),
  new Upgrade("2nd Dinner", "Chonker", 5, 0, 1000),
];

const upgradeBtnCollection = []; // TODO: Weak association of button-to-item, needs refactor

populateUpgradeShop();

// Check to see if we can afford items
setInterval(() => {
  for (var i = 0; i < upgradeCollection.length; i++) {
    // Based on player wealth
    if (
      onCheckIfAffordable(upgradeCollection[i].currentPrice) &&
      checkIfUpgradeHasAvailableTarget(upgradeCollection[i], player.upgrades[i])
    ) {
      // Based on availability of other items
      enableButton(upgradeBtnCollection[i], tryPurchaseUpgrade); // Enable the button if player can afford
    } else {
      disableButton(upgradeBtnCollection[i], tryPurchaseUpgrade); // Disable if player cannot afford
    }
  }
}, 100);

/* Update the store with data */
function populateUpgradeShop() {
  //console.log("Populating!");
  for (var i = 0; i < upgradeCollection.length; i++) {
    createStoreElement(upgradeBtnCollection, upgradeStoreElement);

    // Set button text
    updateStoreUI(
      upgradeBtnCollection[i],
      player.upgrades[i],
      upgradeCollection[i].name,
      upgradeCollection[i].currentPrice,
      `requires < ${player.upgrades[i]} ${upgradeCollection[i].itemTarget}(s)`
    );
  }
}
// #endregion INIT & VARS
/* --------------------------- */
// #region HOOKS & HANDLERS

function tryPurchaseUpgrade(event) {
  /* Compare clicked button to our tracked buttons */
  for (var i = 0; i < upgradeBtnCollection.length; i++) {
    if (event.target === upgradeBtnCollection[i]) {
      // Reduce kitty count by current price
      modifyKittyCount(upgradeCollection[i].currentPrice * -1);

      // Add the item to our collection
      addUpgradeToPlayer(upgradeCollection[i], i);

      // Update the pricing to reflect new additional cost for next purchase
      updatePricing(upgradeCollection[i], player.upgrades[i]);

      // Update Store UI to reflect the new price
      updateStoreUI(
        upgradeBtnCollection[i],
        player.upgrades[i],
        upgradeCollection[i].name,
        upgradeCollection[i].currentPrice,
        `requires < ${player.upgrades[i]} ${upgradeCollection[i].itemTarget}(s)`
      );
    }
  }
}
// #endregion HOOKS & HANDLERS
/* --------------------------- */
// #region PLAYER & UPGRADE STATE

function addUpgradeToPlayer(upgrade, index) {
  player.upgrades[index]++;
  applyUpgrade(upgrade);
}
/* Apply the effects of the upgrade to the current game state */
function applyUpgrade(upgrade, count = 1) {
  modifyKPS(upgrade.kps * count);
  modifyKPC(upgrade.kpc * count);
}

function checkIfUpgradeHasAvailableTarget(upgradeContent, playerUpgrade) {
  var index = getItemIndexByName(upgradeContent.itemTarget);
  if (player.items[index] > playerUpgrade) return true;

  return false;
}

function resetUpgrades() {
  for (var i = 0; i < upgradeCollection.length; i++) {
    resetContent(upgradeCollection[i], upgradeBtnCollection[i]);
  }
}

/* Load player items into the game state and caches */
function loadPlayerUpgrades(upgrades) {
  for (var i = 0; i < upgrades.length; i++) {
    updatePricingFromBeginning(upgradeCollection[i], upgrades[i]);
    applyUpgrade(upgradeCollection[i], upgrades[i]);
    updateStoreUI(
      upgradeBtnCollection[i],
      upgrades[i],
      upgradeCollection[i].name,
      upgradeCollection[i].currentPrice,
      `requires > ${upgrades[i]} ${upgradeCollection[i].itemTarget}(s)`
    );

    player.upgrades[i] = upgrades[i];
  }
}
