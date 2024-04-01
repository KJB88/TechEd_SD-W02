/* --------------------------- 
Player & PlayerData Handling
 --------------------------- */
// #region INIT. & VARS

/* Pre-defined to limit input errors */
const PLAYERDATA = "playerData";
const NAME = "playerName";
const COUNT = "kittyCount";
const ITEMS = "items";
const UPGRADES = "upgrades";

const player = {
  playerName: "DEFAULT",
  kittyCount: 0,
  items: [0, 0, 0],
  upgrades: [0, 0],

  setDefault: function () {
    this.playerName = generateNewPlayerName();
    this.kittyCount = 0;
    this.items = [0, 0, 0];
    this.upgrades = [0, 0];
  },
};

// #endregion INIT. & VARS
/* --------------------------- */
// #region PLAYER DATA HANDLING

/* Top-level player data handler */
function setPlayerData() {
  // If local storage contains anything (it can only contain our player for this proj.)
  if (localStorage.getItem(PLAYERDATA)) {
    console.log("Loading player data from local store.");
    loadPlayerDataFromStore(); // Get the player data from store
  } else {
    console.log("Creating new player data.");
    player.setDefault(); // Else, set up a default player
  }

  applyPlayerDataToGame(); // Apply the player data to the game state
  savePlayerData(); // Save the new player data

  toggleAutosave(true);
}

/* Fetch resources to build player name */
function generateNewPlayerName() {
  var randomAdj = adjectives[getRandomIntFromZero(adjectives.length)]; // Get a random Adjective from library
  randomAdj = capitliseFirstLetter(randomAdj); // Capitalize the first letter because we're not monsters

  var randomNoun = nouns[getRandomIntFromZero(nouns.length)]; // Get a random Noun library
  randomNoun = capitliseFirstLetter(randomNoun); // Capitalize the first letter because we're not monsters

  return `${randomAdj} ${randomNoun}`; // Stick 'em together to make a name!
}

/* Load player data from the local store */
function loadPlayerDataFromStore() {
  const playerData = JSON.parse(localStorage.getItem(PLAYERDATA));
  var dataValue;

  dataValue = playerData.playerName;
  // Sanity check
  if (dataValue === "DEFAULT" || dataValue === undefined)
    dataValue = generateNewPlayerName();
  updateActivePlayerStats(NAME, dataValue);

  dataValue = playerData.kittyCount;
  // Sanity check
  if (!isNumber(dataValue) || dataValue < 0) dataValue = 0;
  updateActivePlayerStats(COUNT, dataValue);

  dataValue = playerData.items;
  if (dataValue == undefined || dataValue.length == 0) playerData.items = [];
  updateActivePlayerStats(ITEMS, playerData.items); // TODO

  /*
  dataValue = playerData.upgrades;
  if (dataValue.length != undefined || dataValue.length > 0)
    updateActivePlayerStats(UPGRADES, playerData.upgrades); // TODO
  */
}

/* Save player data to the local store*/
function savePlayerData() {
  localStorage.setItem(PLAYERDATA, JSON.stringify(player));
}

/* Update a specific entry within the player object */
function updateActivePlayerStats(key, val) {
  switch (key) {
    case ITEMS:
      loadPlayerItems(val); // Load Items
      break;
    case UPGRADES:
      loadPlayerUpgrades(val); // Load Upgrades
      break;
    default:
      player[key] = val; // Load everything else
      break;
  }
}

/* Clear player data from the local store */
function clearPlayerData() {
  player.setDefault();
  localStorage.removeItem(PLAYERDATA);

  resetRates(); // Reset rate of kitty gain
  resetItems(); // Reset items to default prices
  //loadPlayerUpgrades(player.items);

  applyPlayerDataToGame(); // Apply the player data to the game state
  console.log("Player Data cleared!");
}

/* Apply the player data to the current game state */
function applyPlayerDataToGame() {
  updateTextElement(playerNameElement, player.playerName);
  updateCountUI();
  updateRateUI();
}

// #endregion PLAYER DATA
/* --------------------------- */
