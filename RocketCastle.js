'use strict';

class RocketCastle {
  constructor () {
    this.reset();
  }

  backToRocketCastleOption () {
    return [ 'Back to 🚀🏰!', ()=>{ this.loadUrl('https://rocketcastle.com') } ];
  }

  reset () {
    this.room = this.firstRoomKey || 'first';
    this.player = {};
    if (this.init) { this.init() }
    this.refresh();
  }

  refresh () {
    const spec = this[ `${this.room}Room` ]();

    // Normalize and store the title, details, options, and theme.
    this.title = spec.title || '';
    this.details = spec.details || [];
    this.details = this.details.filter( detail => !!detail );
    this.options = spec.options || [];
    this.options = this.options.filter( option => !!option );
    this.theme = spec.theme;

    this.refreshBodyClass();
    this.refreshTitle();
    this.refreshDetails();
    this.refreshOptions();
  }

  refreshBodyClass () {
    // Remove any previous room class and apply the correct one.
    if (this.currentRoomClass) {
      document.body.classList.remove( `room-${this.currentRoomClass}` );
    }
    this.currentRoomClass = this.roomKey;
    document.body.classList.add( `room-${this.currentRoomClass}` );
    
    // Remove any previous theme and apply the correct one, if there is one.
    if (this.currentRoomTheme) {
      document.body.classList.remove( `theme-${this.currentRoomTheme}` );
    }
    this.currentRoomTheme = this.theme;
    if (this.currentRoomTheme) {
      document.body.classList.add( `theme-${this.currentRoomTheme}` );
    }
  }

  refreshTitle () {
    const titleElement = document.getElementById( 'title' );
    titleElement.textContent = this.title;
  }

  refreshDetails () {
    const detailsElement = document.getElementById( 'details' );

    // Clear out existing details.
    while (detailsElement.firstChild) {
      detailsElement.firstChild.remove();
    }

    // Create a <p> for each detail.
    for (const detail of this.details) {
      const element = document.createElement( 'p' );
      element.textContent = detail;
      detailsElement.appendChild( element );
    }
  }

  refreshOptions () {
    const optionsElement = document.getElementById( 'options' );

    // Clear out any existing option buttons.
    while (optionsElement.firstChild) {
      optionsElement.firstChild.remove();
    }
  
    // Create a <button> for each option.
    for (const option of this.options) {
      const [ message, callback ] = option;

      const element = document.createElement( 'button' );
      element.setAttribute( 'type', 'button' );
      element.classList.add( 'button' );
      element.textContent = message;

      const me = this;
      element.addEventListener(
        'click',
        () => {
          callback.call( me );
          me.refresh()
        },
      );

      optionsElement.appendChild( element );
    }
  }

  move (roomKey) {
    this.room = roomKey;
  }

  loadUrl (url) {
    document.location = url;
  }

  tell (...details) {
    alert( details.join('\n\n') );
  }

  rand (low, high) {
    return Math.floor( Math.random() * (high-low+1) ) + low;
  }

  roll (dice, sides) {
    let total = 0;
    while (dice--) {
      total += Math.floor( Math.random() * sides ) + 1;
    }
    return total;
  }

  flip () {
    return !(Math.random() * 2);
  }

  pick (...choices) {
    return choices[
      Math.floor( Math.random() * choices.length )
    ];
  }
}
