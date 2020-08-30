'use strict';

const rcMacros = {

  move: function (roomKey) {
    roomKey = this.runMacro( roomKey );
    if (!this.rooms[ roomKey ]) { throw `Unknown room "${roomKey}"` }
    this.state.room = roomKey;
  },
  
  reset: function () {
    this.reset();
  },

  tell: function (message) {
    alert( this.runMacro( message ) );
  },

  format: function (message, ...values) {
    message = this.runMacro( message );
    values = values.map( value => this.runMacro(value) );
    return message.replace( /\{(\d+)\}/, (match,index) => values[index] );
  },

  do: function (...macros) {
    const results = [];
    for (const macro of macros) {
      results.push( this.runMacro( macro ) );
    }
    return results;
  },
  
  if: function (check, ifTrue, ifFalse) {
    if (this.runMacro( check )) {
      return this.runMacro( ifTrue );
    }
    return this.runMacro( ifFalse );
  },

  op: function (left, op, right) {
    left = this.runMacro( left );
    right = this.runMacro( right );

    switch (op) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '/':
        return left / right;
      case '*':
        return left * right;
      case '%':
        return left % right;
      case '**':
        return left ** right;
      case '<':
        return left < right;
      case '>':
        return left > right;
      case '<=':
        return left <= right;
      case '>=':
        return left >= right;
      case '==':
        return left == right;
      case '!=':
        return left != right;
      case '||':
        return left || right;
      case '&&':
        return left && right;
      default:
        throw `Unknown operator "${op}"`;
    }
  },

  pick: function (...macros) {
    const macro = macros[
      Math.floor( Math.random() * macros.length )
    ];
    return this.runMacro( macro );
  },

  roll: function (dice, sides) {
    dice = this.runMacro( dice );
    sides = this.runMacro( sides );
    let total = 0;
    while (dice--) {
      total += Math.floor( Math.random() * sides ) + 1;
    }
    return total;
  },

  set: function (key, value) {
    key = this.runMacro( key );
    value = this.runMacro( value );
    this.state[ key ] = value;
  },
  
  get: function (key) {
    key = this.runMacro( key );
    return this.state[ key ];
  },

  has: function (key) {
    key = this.runMacro( key );
    return key in this.state;
  },
  
  clear: function (key) {
    key = this.runMacro( key );
    delete this.state[ key ];
  },  
  
  flag: function (key) {
    key = this.runMacro( key );
    this.state[ key ] = true;
  },
  
  toggle: function (key) {
    key = this.runMacro( key );
    this.state[ key ] = !this.state[ key ];
  },
  
  inc: function (key) {
    key = this.runMacro( key );
    this.state[ key ] = (this.state[ key ] || 0) + 1;
  },
  
  dec: function (key) {
    key = this.runMacro( key );
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

  runMacro (macro) {
    if (!macro) { return macro }
    if (macro.constructor !== Array) { return macro }

    let [ name, ...args ] = macro;
    if (!name) {
      console.log(macro);
      throw 'Macro missing name argument';
    }

    let callback = rcMacros[ name ];
    if (!callback) { throw `Unknown macro "${name}"` }

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
    let detail = room.detail;
    if (detail.constructor === Array) { detail = detail.join('\n\n') }
    const detailElement = document.getElementById( 'detail' );
    detailElement.textContent = detail;
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
      let [ message, ...macro ] = option;

      if (message.constructor === Array) {
        message = this.runMacro( message );
      }

      if (!message) { continue }
  
      const element = document.createElement( "button" );
      element.textContent = message;
  
      element.addEventListener(
        'click', ()=>{
          this.runMacro( macro );
          this.refresh();
        }
      );
  
      optionsElement.appendChild( element );
    }
  }
}
