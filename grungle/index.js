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
  detail: 'Great old oaks intertwine their massive branches above your head, causing beams of light to guide your steps down the path.\n\nSuddenly you hear a crunch and a slow rickety, deep, breath from somewhere deeper in the forest.',
  options: [
    ['Hike to the valley.', 'changeRoom', 'lake'],
    ['Head towards the mountain.', 'changeRoom', 'caveEntrance' ],
  ],
};

rooms.meadow = {
  title: 'Butterfly Meadow',
  detail: 'A vast meadow of brilliant flowers and flippity butterflies. You can see a trail to the south-east, or to the west is a rocky cliff.',
  options: [
    ['Follow the trail.', 'changeRoom', 'lake'],
    ['Go to the cliff.', 'changeRoom', 'caveEntrance'],
    ['Pick an 🍏.', ['takeItem', 'apple'], ['say', 'You took an apple.']],
  ],
};

rooms.lake = {
  title: 'Valley of the Lake',
  detail: 'A desolate valley of rocks and shrubs surrounds you, and in front of you is a deep aquamarine lake of unknown depths.',
  options: [
    ['Go to the forest in the south-west.', 'changeRoom', 'forest'],
    ['Go to the meadow in the north-west.', 'changeRoom', 'meadow'],
  ],
};

const rc = new RocketCastle( startingPLayer, rooms );
