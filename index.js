'use strict';

function loadWorld (worldKey) {
  document.location = `${worldKey}/`;
}

function loadUrl (url) {
  document.location = url;
}

world.startingPlayer = {
  room: 'home',
};

const rooms = world.rooms = {};

rooms.home = {
  title: 'Rocket Castle',
  detail: 'Welcome to 🚀🏰!\n\nWhat would you like to do?',
  actions: [
    ['Experience.', changeRoom, 'experience'],
    ['Create.', changeRoom, 'create'],
  ],
};

rooms.experience = {
  title: 'Experience!',
  detail: 'An adventure awaits...',
  actions: [
    ['Grungle', loadWorld, 'grungle'],
    ['I changed my mind, go back I say!', changeRoom, 'home'],
  ],
};

rooms.create = {
  title: 'Create!',
  detail: 'Want to create your own Rocket Castle experience?',
  actions: [
    ['I would love to, take me to your GitHub.', loadUrl, 'https://github.com/bluefeet/RocketCastle' ],
    ['No thanks, I want to go back and make a different choice.', changeRoom, 'home'],
  ],
}

restartGame();
