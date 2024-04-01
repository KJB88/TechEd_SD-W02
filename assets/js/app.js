/* --------------------------- 
The Core functionality for the application.
 --------------------------- */
// region INIT. & VARS

/* Fetch DOM objects */
const kittyCounterElement = document.getElementById("kitty-counter");
const kpsCounterElement = document.getElementById("kps-counter");
const playerNameElement = document.getElementById("player-name");

const resetDataButton = document.getElementById("reset-data-btn");
const saveDataButton = document.getElementById("save-data-btn");

/* Const Vars*/
const updateInterval = 1000; // How often passive cookies are collected

const countSuffix = "kitties pet!"; // Suffix for text output for kitty count
const kpsSuffix = "kps";
const separator = "---";
const kpcSuffix = "kpc";

var kps = 1; // Passive - Kitties per sec
var kpc = 1; // Active - Kitties per click

// #endregion INIT. & VARS
/* --------------------------- */
// #region HOOKS & HANDLERS

addEventListener("load", onLoad); // When page is loaded

setInterval(passiveKittyGain, updateInterval); // Passive kitty petting
mainClickable.addEventListener("click", mainClickable_onClick); // Active kitty petting
resetDataButton.addEventListener("click", resetBtn_onClick); // Reset button onClick
saveDataButton.addEventListener("click", saveBtn_onClick);

/* LOAD Handler */
function onLoad() {
  //clearPlayerData();
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
  clearCats();
}

function saveBtn_onClick() {
  toggleAutosave(false);
  savePlayerData();
  toggleAutosave(true);
}
// #endregion HOOKS & HANDLERS
/* --------------------------- */
// #region COUNTING

function modifyKittyCount(value) {
  player.kittyCount += value;

  // Sanity Check
  if (player.kittyCount < 0) {
    player.kittyCount = 0;
  }

  updateCountUI();
}

function modifyKPS(value) {
  kps += value;

  updateRateUI();
}

function modifyKPC(value) {
  kpc += value;

  updateRateUI();
}

function activeKittyGain() {
  player.kittyCount += kpc;
  updateCountUI();
}

/* Passive gain */
function passiveKittyGain() {
  player.kittyCount += kps;
  updateCountUI();
}
/* Update the Count UI with count*/
function updateCountUI() {
  updateTextElement(kittyCounterElement, `${player.kittyCount} ${countSuffix}`);
}

/* Update the Rate UI with count*/
function updateRateUI() {
  updateTextElement(
    kpsCounterElement,
    `${kps} ${kpsSuffix} --- ${kpc} ${kpcSuffix}`
  );
}

function resetRates() {
  kps = 1;
  kpc = 1;
}
// #endregion COUNTING
/* --------------------------- */
