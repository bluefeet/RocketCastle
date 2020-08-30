'use strict';

const startingPLayer = {
  room: 'cave',
};

const rooms = {};

rooms.cave = {
  title: 'Glowing Cave',
  detail: 'Vines travel between and grasp to massive speleothems, glowing a soft healing light all around.\n\nYou can see a hint of sunlight farther ahead...',
  options: [
    ['Go find the sun.', 'move', 'cliff'],
    ['Touch a vine.', 'tell', 'Your whole body tingles.'],
  ],
};

rooms.cliff = {
  title: 'Cliffs of Zoid',
  detail: 'Before you stands a vast range of impenetrable cliffs, thorny mountains, and the glowing cave.\n\nA path winds its way south into a dense forest of massive trees.',
  options: [
    ['Explore the cave.', 'move', 'cave'],
    ['Skip your way into the forest.', 'move', 'forest'],
    ['Take a nap!', 'tell', 'That felt great, thanks!'],
  ],
};

rooms.forest = {
  title: "Grungle's Forest",
  detail: 'Great old oaks intertwine their massive branches above your head, causing beams of light to guide your steps down the path.\n\nSuddenly you hear a crunch and a slow.. rickety, deep, breath from somewhere deeper in the forest...\n\nTO BE CONTINUED',
  options: [
    [["if",["op",["get","apple"],">",0],"Eat an apple."], "dec", "apple"],
    ["Pick an apple.", "inc", "apple"],
    ["How many apples do I have?", "tell", ["format","You have {0} apples!",["get", "apple"]]],
  ],
};

const rc = new RocketCastle( startingPLayer, rooms );
