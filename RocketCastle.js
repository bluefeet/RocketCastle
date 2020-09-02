/*
  © 2020 Aran Deltac
  MIT License
  https://rocketcastle.com
*/

class RocketCastle {
  constructor (bricks) {
    this.bricks = bricks || new SpaceBricks();
    this.reset();
  }

  get backToRocketCastleButton () {
    return this.bricks.button(
      'Back to 🚀🏰!',
      ()=>{ this.bricks.dom.location = 'https://rocketcastle.com' },
    );
  }

  reset () {
    this.room = 'main';
    this.player = {};
    if (this.init) { this.init() }
    this.refresh();
  }

  refresh () {
    // Remove the current room from the DOM.
    const containerElement = this.bricks.find( 'room-container' );
    this.bricks.empty( containerElement );

    // Add the new room to the DOM.
    const roomElement = this[ `${this.room}Room` ];
    if (!roomElement) { throw `Unknown room "${this.room}"` }
    containerElement.appendChild( roomElement );

    // Make sure Foundation gets a chance to initialize any new elements.
    $( this.bricks.dom ).foundation();
  }

  move (roomKey) {
    this.room = roomKey;
    this.refresh();
  }

  loadUrl (url) {
    this.bricks.dom.location = url;
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
