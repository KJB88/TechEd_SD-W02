/* --------------------------- 
Upgrade Handler
--------------------------- */
// #region INIT. & VARS
const upgradeStoreElement = document.getElementById("upgrade-store");

class Upgrade extends StoreContent {
  constructor(name, itemTarget, basePrice) {
    super(name, basePrice);
    this.itemTarget = itemTarget;
  }
}

const upgradeCollection = [
  new Upgrade("Catnip", "Kitten", 100),
  new Upgrade("2nd Dinner", "Chonker", 1000),
];

const upgradeBtnCollection = []; // TODO: Weak association of button-to-item, needs refactor

populateUpgradeShop();

// Check to see if we can afford items
setInterval(function () {}, 100);
// #endregion INIT & VARS
/* --------------------------- */
// #region HOOKS & HANDLERS

/* Update the UI with data */
function populateUpgradeShop() {
  //console.log("Populating!");
  for (var i = 0; i < upgradeCollection.length; i++) {
    createStoreElement(upgradeBtnCollection, upgradeStoreElement);

    // Set button text
    upgradeBtnCollection[
      i
    ].textContent = `${player.upgrades[i]} : ${upgradeCollection[i].name} : ${upgradeCollection[i].currentPrice}`;
  }
}
