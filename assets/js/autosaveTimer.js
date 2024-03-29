/* --------------------------- 
Autosave Timer & display
 --------------------------- */
/* #REGION: INIT. & VARS */

/* Fetch DOM objects */
const autosaveTimerElement = document.getElementById("autosave-timer");
const autosaveIntervalElement = document.getElementById("autosave-interval");

const autosaveInterval = 3000; // How often the autosave happens

const autosavePrefix = "Last saved: ";
const autosaveIntervalPrefix = "Autosave interval:";
const autosaveIntervalSuffix = "s";

updateAutosaveUI(); // Update the UI immediately

/* #ENDREGION: INIT. & VARS */
/* --------------------------- */
/* #REGION: HOOKS & HANDLERS */
setInterval(onAutosaveInterval, autosaveInterval);

function onAutosaveInterval() {
  savePlayerData(); // Save the player data

  updateAutosaveUI();
}
/* #ENDREGION: HOOKS & HANDLERS */
/* --------------------------- */
/* #REGION: UI HANDLING  */
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
/* #ENDREGION: UI HANDLING  */
/* --------------------------- */
