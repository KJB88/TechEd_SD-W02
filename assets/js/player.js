const player = {
  playerName: "",
  kitties: 0,
  items: [],
  upgrades: [],

  increaseKittyCount: function () {
    kittyCount++;
  },

  setPlayerName: function (newName) {
    player.playerName = newName;
  },

  getPlayerName: function () {
    return this.playerName;
  },
};
