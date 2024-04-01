/* --------------------------- 
Autosave Timer & display
 --------------------------- */
// #region INIT. & VARS

/* Fetch DOM objects */
const autosaveTimerElement = document.getElementById("autosave-timer");
const autosaveIntervalElement = document.getElementById("autosave-interval");

const autosaveInterval = 3000; // How often the autosave happens

const autosavePrefix = "Last saved: ";
const autosaveIntervalPrefix = "Autosave interval:";
const autosaveIntervalSuffix = "s";

var autoSaveIntervalEvent;

// #endregion INIT. & VARS
/* --------------------------- */
// #region HOOKS & HANDLERS

function toggleAutosave(toggle) {
  if (toggle)
    autoSaveIntervalEvent = setInterval(onAutosaveInterval, autosaveInterval);
  else clearInterval(autosaveInterval);
}

function onAutosaveInterval() {
  savePlayerData(); // Save the player data

  updateAutosaveUI();
}
// #endregion HOOKS & HANDLERS
/* --------------------------- */
// #region UI HANDLING
function updateAutosaveUI() {
  const time = new Date().toLocaleTimeString();

  updateTextElement(autosaveTimerElement, `${autosavePrefix} ${time}`); // Update the autosave interval
  updateTextElement(
    autosaveIntervalElement,
    `${autosaveIntervalPrefix} ${
      autosaveInterval / 1000
    }${autosaveIntervalSuffix}`
  );
}
// #endregion UI HANDLING
/* --------------------------- */
