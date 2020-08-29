'use strict';

function loadWorld (worldKey) {
  document.location = `${worldKey}/`;
}

world.startingPlayer = {
  room: 'home',
};

const rooms = world.rooms = {};

rooms.home = {
  title: 'Rocket Castle',
  detail: 'Select a world.',
  actions: [
    ['Grungle', loadWorld, 'grungle'],
  ],
};

restartGame();
