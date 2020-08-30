'use strict';

const rcActions = {
  restartGame: function () {
    this.reset();
  },

  doAll: function (...actions) {
    const results = [];
    for (const action of actions) {
      results.push( this.runAction( action ) );
    }
    return results;
  },
  
  doIf: function (checkAction, trueAction, falseAction) {
    if (this.runAction( checkAction )) {
      return this.runAction( trueAction );
    }
    return this.runAction( falseAction );
  },
  
  doRandom: function (...actions) {
    const action = actions[
      Math.floor( Math.random() * actions.length )
    ];
    return this.runAction( action );
  },
  
  changeRoom: function (roomKey) {
    if (!this.rooms[ roomKey ]) { throw `Unknown room "${roomKey}"` }
    this.state.room = roomKey;
  },
  
  say: function (message) {
    alert( message );
  },
  
  setState: function (key, value) {
    this.state[ key ] = value;
  },
  
  getState: function (key) {
    return this.state[ key ];
  },
  
  clearState: function (key) {
    delete this.state[ key ];
  },
  
  hasState: function (key) {
    return 'key' in this.state;
  },
  
  flagState: function (key) {
    this.state[ key ] = true;
  },
  
  toggleState: function (key) {
    this.state[ key ] = !this.state[ key ];
  },
  
  incState: function (key) {
    this.state[ key ] = (this.state[ key ] || 0) + 1;
  },
  
  decState: function (key) {
    this.state[ key ] = (this.state[ key ] || 0) - 1;
  },
};

class RocketCastle {
  constructor (initState, rooms) {
    this.initState = initState;
    this.rooms = rooms;
    this.reset();
  }

  reset () {
    this.state = { ...this.initState };
    this.refresh();
  }

  runAction (action) {
    if (action.constructor !== Array) { return action }

    let [ name, ...args ] = action;
    if (!name) {
      console.log(action);
      throw 'Action missing name argument';
    }

    let callback = rcActions[ name ];
    if (!callback) { throw `Unknown action "${name}"` }

    return callback.call( this, ...args );
  }

  refresh () {
    this.refreshBodyClass();
    this.refreshContent();
    this.refreshOptions();
  }

  refreshBodyClass () {
    const state = this.state;
    const room = this.rooms[ state.room ];

    // Remove any previous class and apply the correct one.
    if (state.currentRoomClass) {
      document.body.classList.remove( `room-${state.currentRoomClass}` );
    }
    state.currentRoomClass = state.room;
    document.body.classList.add( `room-${state.currentRoomClass}` );
    
    // Remove any previous theme and apply the correct one.
    if (state.currentRoomTheme) {
      document.body.classList.remove( `theme-${state.currentRoomTheme}` );
    }
    state.currentRoomTheme = room.theme || state.room;
    document.body.classList.add( `theme-${state.currentRoomTheme}` );
  }

  refreshContent () {
    const room = this.rooms[ this.state.room ];

    // Set the title.
    const titleElement = document.getElementById( 'title' );
    titleElement.textContent = room.title;
  
    // Set the detail.
    const detailElement = document.getElementById( 'detail' );
    detailElement.textContent = room.detail;
  }

  refreshOptions () {
    const room = this.rooms[ this.state.room ];

    // Clear out any existing option buttons.
    const optionsElement = document.getElementById( 'options' );
    while (optionsElement.firstChild) {
      optionsElement.firstChild.remove();
    }
  
    // Create a button for each viewable option.
    for (const option of room.options) {
      let [ message, ...action ] = option;

      if (message.constructor === Array) {
        message = this.runAction( message );
      }

      if (!message) { continue }
  
      const element = document.createElement( "button" );
      element.textContent = message;
  
      element.addEventListener(
        'click', ()=>{
          this.runAction( action );
          this.refresh();
        }
      );
  
      optionsElement.appendChild( element );
    }
  }
}
