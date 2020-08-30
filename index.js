'use strict';

rcActions.loadWorld = function (worldKey) {
  document.location = `${worldKey}/`;
};

rcActions.loadUrl = function (url) {
  document.location = url;
};

const startingPLayer = {
  room: 'home',
};

const rooms = {};

rooms.home = {
  title: 'Rocket Castle',
  detail: 'Welcome to 🚀🏰!\n\nWhat would you like to do?',
  options: [
    ['Explore.', 'changeRoom', 'experience'],
    ['Create.', 'changeRoom', 'create'],
  ],
};

rooms.experience = {
  title: 'Experience!',
  detail: 'An adventure awaits...',
  options: [
    ['Grungle', 'loadWorld', 'grungle'],
    ['I changed my mind, go back I say!', 'changeRoom', 'home'],
  ],
};

rooms.create = {
  title: 'Create!',
  detail: 'Want to create your own Rocket Castle game?',
  options: [
    ['Yes! Take me to GitHub.', 'loadUrl', 'https://github.com/bluefeet/RocketCastle'],
    ['No thanks.', 'changeRoom', 'home'],
  ],
}

const rc = new RocketCastle( startingPLayer, rooms );
