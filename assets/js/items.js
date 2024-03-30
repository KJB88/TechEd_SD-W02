/* --------------------------- 
Item Handler
 --------------------------- */
/* #REGION: INIT. & VARS */
const itemStoreElement = document.getElementById("item-store");

/* Item Class */
class Item {
  constructor(itemName, itemKPS, itemPrice) {
    this.itemName = itemName;
    this.itemKPS = itemKPS;
    this.itemPrice = itemPrice;
  }
}

const CATNIP = "catnip";
const SCRATCHINGPOST = "scratchingPost";
const CHONKER = "chonker";

/* All available items to purchase*/
const itemCollection = [
  {
    catnip: {
      count: 0,
      item: new Item("Catnip", 2, 100),
    },
  },
  {
    scratchingPost: {
      count: 0,
      item: new Item("Scratching Post", 5, 1000),
    },
  },
  {
    chonker: {
      count: 0,
      item: new Item("Chonker", 10, 2000),
    },
  },
];

populateItemShop();

/* Update the UI with data */
function populateItemShop() {
  //console.log("Populating!");
  for (var i = 0; i < itemCollection.length; i++) {
    var element = document.createElement("button");
    //console.dir(element);
    itemStoreElement.append(element);
  }
}

/* Add an item to the working collection */
function addPlayerItem(itemName) {
  itemCollection[itemName].count++;
}

function addPlayerCollection() {
  for (var i = 0; i < playerData.items.length; i++) {}
}

function saveItemData() {
  for (var i = 0; i < itemCollection.length; i++) {
    playerData.items.push(itemCollection[0].count);
  }
}
