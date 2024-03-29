/* REGION: INIT. & VARS */
/* Fetch DOM objects */
const kittyCounterElement = document.getElementById("kitty-counter");
const kpsCounterElement = document.getElementById("kps-counter");
const playerNameElement = document.getElementById("player-name");

const resetDataButton = document.getElementById("reset-data-btn");

/* Const Vars*/
const updateInterval = 1000; // How often passive cookies are collected

const kittyTextSuffix = "kitties pet!"; // Suffix for text output for kitty count
const kpsTextSuffix = "kps"; // Suffix for text output for kps count

const adjectiveFilepath = "./assets/json/adjectives-list.json"; // Filepath for adjective library
const nounFilepath = "./assets/json/nouns-list.json"; // Filepath for noun library

/* Dynamic Vars*/
var kittyCount = 0; // Current total of kitties
var kps = 1; // The rate of kitties gain
var kpc = 1; // The rate of kitties per click

/* #ENDREGION: INIT. & VARS */
/* --------------------------- */
/* #REGION: HOOKS & HANDLERS */
addEventListener("load", onLoad); // When page is loaded

setInterval(passiveKittyGain, updateInterval); // Passive kitty petting
mainClickable.addEventListener("click", mainClickable_onClick); // Active kitty petting
resetDataButton.addEventListener("click", resetBtn_onClick); // Reset button onClick

/* LOAD Handler */
function onLoad() {
  setPlayerData();

  updateCountUI(); // Initialize count UI
  updateRateUI(); // Initialize rate UI
}

/* MainClickable CLICK Handler */
function mainClickable_onClick() {
  activeKittyGain();
}

/* Reset Button CLICK Handler */
function resetBtn_onClick() {
  clearPlayerData(); // Clear local store
  location.reload(); // Reload page
}

/* #ENDREGION: HOOKS & HANDLERS */
/* --------------------------- */
/* #REGION: PLAYER DATA */

/* Top-level player data handler */
function setPlayerData() {
  if (localStorage.length > 0) {
    getPlayerDataFromStore();
  } else {
    getNewPlayerData();
  }
}

/* Get Player Data from Local Store */
function getPlayerDataFromStore() {}

/* Create new player data, populate page and save */
function getNewPlayerData() {
  getPlayerNameLibs();

  player;
}

function savePlayerData() {}

function loadPlayerdata() {}

function clearPlayerData() {}

/* #ENDREGION: PLAYER DATA */
/* --------------------------- */
/* #REGION: COUNTING */

function activeKittyGain() {
  kittyCount += kpc;
  updateCountUI();
}

/* Passive gain */
function passiveKittyGain() {
  kittyCount += kps;
  updateCountUI();
}

/* Update the Count UI with count*/
function updateCountUI() {
  updateTextElement(kittyCounterElement, `${kittyCount} ${kittyTextSuffix}`);
}

/* Update the Rate UI with count*/
function updateRateUI() {
  updateTextElement(kpsCounterElement, `${kps} ${kpsTextSuffix}`);
}

/* #ENDREGION: COUNTING */
/* --------------------------- */
/* #REGION: NEW PLAYER NAME */

async function getPlayerNameLibs() {
  const adjectiveResponse = await fetch(adjectiveFilepath);
  const adjectives = await adjectiveResponse.json();

  const nounResponse = await fetch(nounFilepath);
  const nouns = await nounResponse.json();

  var randomAdj = adjectives[getRandomIntFromZero(adjectives.length)];
  randomAdj[0].toUpperCase();

  var randomNoun = nouns[getRandomIntFromZero(nouns.length)];
  randomNoun[0].toUpperCase();

  return (playerNameStr = `${randomAdj} ${randomNoun}`);
}

/* #ENDREGION: NEW PLAYER NAME */
// TODO: Add a collection of upgrades (modifiers for 'clicks')
// TODO: Add a collection of products (additional sources of 'clicks')
