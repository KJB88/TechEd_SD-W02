/* --------------------------- 
Item Handler
 --------------------------- */
/* #REGION: INIT. & VARS */

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
const itemCollection = {
  catnip: {
    count: 0,
    item: new Item("Catnip", 2, 100),
  },
  scratchingPost: {
    count: 0,
    item: new Item("Scratching Post", 5, 1000),
  },
  chonker: {
    count: 0,
    item: new Item("Chonker", 10, 2000),
  },
};

function addPlayerItem(itemName) {
  itemCollection[itemName].count++;
}

function addPlayerCollection() {}
function populateItemShop() {}
