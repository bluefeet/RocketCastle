'use strict';

let player;
let world = {};

function restartGame () {
  player = { ...world.startingPlayer };
  refreshRoom();
}

function changeRoom (roomKey) {
  player.room = roomKey;
}

function say (message) {
  alert( message );
}

function takeItem (key, count=1) {
  player[ key ] = (player[ key ] || 0) + count;
}

function useItem (key, count=1) {
  player[ key ] = player[ key ] - count;
}

function hasItem (...keys) {
  for (const key of keys) {
    if (!player[key]) { return false }
  }
  return true;
}

function refreshRoom () {
  const room = world.rooms[ player.room ];

  // Remove any previous class and apply the correct one.
  if (player.currentRoomClass) {
    document.body.classList.remove( `room-${player.currentRoomClass}` );
  }
  player.currentRoomClass = player.room;
  document.body.classList.add( `room-${player.currentRoomClass}` );
  
  // Remove any previous theme and apply the correct one.
  if (player.currentRoomTheme) {
    document.body.classList.remove( `theme-${player.currentRoomTheme}` );
  }
  player.currentRoomTheme = room.theme || player.room;
  document.body.classList.add( `theme-${player.currentRoomTheme}` );

  // Set the title.
  const titleElement = document.getElementById( "title" );
  titleElement.textContent = room.title;

  // Set the detail.
  const detailElement = document.getElementById( "detail" );
  detailElement.textContent = room.detail;

  // Clear out any existing action buttons.
  const actionsElement = document.getElementById( "actions" );
  while (actionsElement.firstChild) {
    actionsElement.firstChild.remove();
  }

  // Create a button for each action.
  const actions = [ ...room.actions ];
  for (let action of actions) {
    if (typeof action === 'function') {
      action = action();
      if (!action) { continue }
    }

    action = [ ...action ];
    const message = action.shift();
    const element = document.createElement( "button" );
    element.textContent = message;

    element.addEventListener(
      "click", ()=>{
        const queue = [ ...action ];
        while (queue.length) {
          const first = queue.shift();

          if (typeof first === 'function') {
            first( ...queue );
            break;
          }

          let [ callback, ...args ] = first;
          callback( ...args );
        }
        refreshRoom();
      },
    );

    actionsElement.appendChild( element );
  }
}
