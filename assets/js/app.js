var kittyCount = 0; // Current total of kitties
var kittiesPerSec = 0; // The rate of kitty gain
var updateInterval = 0; // How often the UI updates
//setInterval(kittyPerInterval, 1000);

function kittyPerInterval() {
  kittyCount++;
  console.log(kittyCount);
}
// TODO: Update kitty count passively
// TODO: Update kitty count onClick
// TODO: Add a collection of upgrades (modifiers for 'clicks')
// TODO: Add a collection of products (additional sources of 'clicks')
