'use strict';

rcMacros.loadWorld = function (worldKey) {
  document.location = `${worldKey}/`;
};

rcMacros.loadUrl = function (url) {
  document.location = url;
};

const startingPLayer = {
  room: 'home',
};

const rooms = {};

rooms.home = {
  title: 'Rocket Castle',
  detail: [
    'Welcome to 🚀🏰!',
    'What would you like to do?',
  ],
  options: [
    ['Explore.', 'move', 'experience'],
    ['Create.', 'move', 'create'],
  ],
};

rooms.experience = {
  title: 'Experience!',
  detail: 'An adventure awaits...',
  options: [
    ['Grungle', 'loadWorld', 'grungle'],
    ['I changed my mind, go back I say!', 'move', 'home'],
  ],
};

rooms.create = {
  title: 'Create!',
  detail: 'Want to create your own Rocket Castle game?',
  options: [
    ['Yes! Take me to GitHub.', 'loadUrl', 'https://github.com/bluefeet/RocketCastle'],
    ['No thanks.', 'move', 'home'],
  ],
}

const rc = new RocketCastle( startingPLayer, rooms );
