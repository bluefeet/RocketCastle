'use strict';

const startingPLayer = {
  room: 'cave',
};

const rooms = {};

rooms.cave = {
  title: 'Glowing Cave',
  detail: 'Vines travel between and grasp to massive speleothems, glowing a soft healing light all around.\n\nYou can see a hint of sunlight farther ahead...',
  options: [
    ['Go find the sun.', 'changeRoom', 'cliff'],
    ['Touch a vine.', 'say', 'Your whole body tingles.'],
  ],
};

rooms.cliff = {
  title: 'Cliffs of Zoid',
  detail: 'Before you stands a vast range of impenetrable cliffs, thorny mountains, and the glowing cave.\n\nA path winds its way south into a dense forest of massive trees.',
  options: [
    ['Explore the cave.', 'changeRoom', 'cave'],
    ['Skip your way into the forest.', 'changeRoom', 'forest'],
    ['Take a nap!', 'say', 'That felt great, thanks!'],
  ],
};

rooms.forest = {
  title: "Grungle's Forest",
  detail: 'Great old oaks intertwine their massive branches above your head, causing beams of light to guide your steps down the path.\n\nSuddenly you hear a crunch and a slow.. rickety, deep, breath from somewhere deeper in the forest...\n\nTO BE CONTINUED',
  options: [
    ['Restart game.', 'restartGame']
  ],
};

const rc = new RocketCastle( startingPLayer, rooms );
