/* --------------------------- 
Player & PlayerData Handling
 --------------------------- */
/* #REGION: INIT. & VARS */

/* Pre-defined to limit input errors */
const PLAYERDATA = "playerData";
const PLAYERNAME = "playerName";
const KITTYCOUNT = "kittyCount";
const KPS = "kps";
const ITEMS = "items";
const UPGRADES = "upgrades";

const player = {
  playerName: "KEV CANT CODE",
  kittyCount: 0,
  kps: 1,
  items: [],
  upgrades: [],
};

/* #ENDREGION: INIT. & VARS */
/* --------------------------- */
/* #REGION: PLAYER DATA HANDLING*/

/* Top-level player data handler */
function setPlayerData() {
  // If local storage contains anything (it can only contain our player for this proj.)
  if (localStorage.getItem(PLAYERDATA)) {
    loadPlayerDataFromStore(); // Get the player data from store
    console.log("Loading player data from local store.");
  } else {
    console.log("Creating new player data.");
    setDefaultPlayerData(); // Else, set up a default player
  }

  applyPlayerDataToGame(); // Apply the player data to the game state
  savePlayerData(); // Save the new player data
}

/* Set default values for player data (excluding name) */
function setDefaultPlayerData() {
  setNewPlayerName(); // Find new random name
  updatePlayerData(KITTYCOUNT, 0);
  updatePlayerData(KPS, 1);
  updatePlayerData(ITEMS, []);
  updatePlayerData(UPGRADES, []);
}

/* Fetch resources to build player name */
function setNewPlayerName() {
  var randomAdj = adjectives[getRandomIntFromZero(adjectives.length)]; // Get a random Adjective from library
  randomAdj = capitliseFirstLetter(randomAdj); // Capitalize the first letter because we're not monsters

  var randomNoun = nouns[getRandomIntFromZero(nouns.length)]; // Get a random Noun library
  randomNoun = capitliseFirstLetter(randomNoun); // Capitalize the first letter because we're not monsters

  updatePlayerData(PLAYERNAME, `${randomAdj} ${randomNoun}`); // Stick 'em together to make a name!
}

/* Load player data from the local store */
function loadPlayerDataFromStore() {
  const playerData = JSON.parse(localStorage.getItem(PLAYERDATA));

  if (player.playerName == "DEFAULT") setNewPlayerName();
  else player.playerName = playerData.playerName;

  player.kittyCount = playerData.kittyCount;
  player.kps = playerData.kps;
  player.items = playerData.items;
  player.upgrades = playerData.upgrades;
}

/* Save player data to the local store*/
function savePlayerData() {
  updateAllPlayerData();
  localStorage.setItem(PLAYERDATA, JSON.stringify(player));

  console.log("Player Data saved!");
}

/* Update a specific entry within the player object */
function updatePlayerData(key, val) {
  player[key] = val;
}

function updateAllPlayerData() {
  updatePlayerData(PLAYERNAME, playerNameElement.textContent);
  updatePlayerData(KITTYCOUNT, kittyCount);
  updatePlayerData(KPS, kps);
  //updatePlayerData(ITEMS, items);
  //updatePlayerData(UPGRADES, upgrades);
}

/* Clear player data from the local store */
function clearPlayerData() {
  localStorage.removeItem(PLAYERDATA);

  console.log("Player Data cleared!");
}

/* Apply the player data to the current game state */
function applyPlayerDataToGame() {
  updateTextElement(playerNameElement, player.playerName);

  kittyCount = player.kittyCount;
  updateCountUI();

  kps = player.kps;
  updateRateUI();
}

/* #ENDREGION: PLAYER DATA */
/* --------------------------- */
