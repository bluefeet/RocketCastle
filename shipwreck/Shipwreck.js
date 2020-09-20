/*
  © 2020 Aran Deltac
  MIT License
  https://rocketcastle.com
*/

class Shipwreck extends RocketCastle {
  init () {
    this.player.day = 0;

    // The player starts with between 2 and 4 health.
    this.player.health = this.rand(2,4);

    // Start all resources at zero.
    this.resources.forEach( resource => this.player[resource] = 0 )
  }

  get rescueDay () {
    return 6;
  }

  get resources () {
    return [ 'wood', 'fiber', 'stone', 'food' ];
  }

  get supplies () {
    return [ 'fire', 'spear', 'basket' ];
  }

  get maxHealth () {
    return 4;
  }

  get playerDetails () {
    return [
      ...this.resourceDetails,
      ...this.supplyDetails,
      this.healthDetail,
      this.dayDetail,
    ]
  }

  get dayDetail () {
    return `You have survived for ${this.player.day} days.`;
  }

  get healthDetail () {
    return [
      'You did not survive.', // 0 health
      'You feel terrible.',
      'You are tired.',
      'You feel ok.',
      'You feel great!', // 4 health
    ][ this.player.health ];
  }

  get resourceDetails () {
    const player = this.player;
    return this.resources.filter( resource => player[resource] ).map(
      resource => `You have ${player[resource]} ${resource}.`
    );
  }

  get supplyDetails () {
    const player = this.player;
    return this.supplies.filter( supply => player[supply] ).map(
      supply => `You have a ${supply}.`
    );
  }

  get mainRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'Shipwreck' ),
      b.p( 'Survive for as long as you can.' ),
      b.buttonGroup(
        b.button( 'primary', 'Start.', ()=>{ this.room='beach' } ),
      ),
    );
  }

  get beachRoom () {
    if (this.player.day === this.rescueDay) {
      return this.rescueRoom;
    }

    // Remove fire before collecting player details.
    const hadFire = this.player.fire;
    delete this.player.fire;

    const details = this.playerDetails;

    if (hadFire) { details.unshift('Your fire has gone out.') }

    const b = this.bricks;

    return b.div(
      b.h1( 'Beach' ),
      b.p( 'It is morning and the sun is rising.' ),
      ...details.map( detail => b.p(detail) ),
      b.p( 'What would you like to do today?' ),
      b.buttonGroup(
        b.button( 'primary', 'Forage.', ()=>{ this.room='forage' } ),
        b.button( 'primary', 'Rest.', ()=>{ this.room='rest' } ),
      ),
    );
  }

  get forageRoom () {
    const player = this.player;

    player.health --;

    const details = [];
    const options = [];

    const maxFound = player.basket ? 5 : 3;

    let found = this.rand( 0, maxFound );
    if (!found) { details.push(`You didn't find anything.`) }
    while (found--) {
      const resource = this.pick( ...this.resources );
      player[ resource ]++;
      details.push( `You found ${resource}.` );
    }

    const isHurt = Math.random() <= .2;
    if (isHurt) {
      details.push('You hurt yourself.');
      player.health --;
    }

    if (player.health==0 && player.food) {
      player.food --;
      player.health ++;
      details.push( 'You ate some food to stay alive.' );
    }

    if (player.health<=0) {
      player.health = 0;
      if (!isHurt) { details.push([ 'You have starved to death.' ]) }
      else { details.push( this.healthDetail ) }
      options.push([ 'Try again.', ()=>{ this.reset() } ]);
    }
    else {
      options.push([ 'Walk back to the beach.', ()=>{ this.room='dusk' } ])
    }

    const b = this.bricks;

    return b.div(
      b.h1( 'Forage' ),
      ...details.map( detail => b.p(detail) ),
      b.buttonGroup(
        ...options.map( option => b.button('primary', ...option) ),
      ),
    );
  }

  get restRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'Rest' ),
      b.p( 'You spent your day conserving energy.' ),
      b.button( 'primary', 'Prepare for the night.', ()=>{ this.room='dusk' } ),
    );
  }

  get duskRoom () {
    const rc = this;
    const player = this.player;
    const options = [];

    if (player.food && player.health < this.maxHealth) {
      options.push([ 'Eat food.', ()=>{
        player.food--;
        player.health++;
        rc.refresh();
      }]);
    }

    if (player.wood && !player.fire) {
      options.push([ 'Make fire.', ()=>{
        player.wood--;
        player.fire = true;
        rc.refresh();
      }]);
    }

    if (player.wood && player.stone && !player.spear) {
      options.push([ 'Make spear.', ()=>{
        player.wood--;
        player.stone--;
        player.spear = true;
        rc.refresh();
      }]);
    }

    if (player.wood && player.fiber && !player.basket) {
      options.push([ 'Make basket.', ()=>{
        player.wood--;
        player.fiber--;
        player.basket = true;
        rc.refresh();
      }]);
    }

    options.push([ 'Go to sleep.', ()=>{ this.room='night' } ]);

    const b = this.bricks;

    return b.div(
      b.h1( 'Dusk' ),
      b.p( 'Unexpected things happen at night.' ),
      ...this.playerDetails.map( detail => b.p(detail) ),
      b.p( 'What would you like to do?' ),
      b.buttonGroup(
        ...options.map( option => b.button('primary', ...option) ),
      ),
    );
  }

  get nightRoom () {
    const player = this.player;

    const details = [];
    const options = [];

    const chance = Math.random();

    if (chance <= .5) {
      details.push('You awaken to the sound of wild animals attacking!');

      if (player.fire) {
        details.push('But the fire scared them away!');
      }
      else if (player.spear) {
        details.push('But you protected yourself with your spear!');
      }
      else {
        player.health --;
        details.push('And they hurt you bad.');
      }
    }
    else {
      details.push('You awaken... to the sound of waves.');
    }

    if (player.health<=0) {
      player.health = 0;
      details.push( this.healthDetail );
      options.push([ 'Try again.', ()=>{ this.reset() } ]);
    }
    else {
      options.push([ 'Go back to sleep.', ()=>{ this.player.day++; this.room='beach' } ]);
    }  

    const b = this.bricks;

    return b.div(
      b.h1( 'Night' ),
      ...details.map( detail => b.p(detail) ),
      b.buttonGroup(
        ...options.map( option => b.button('primary', ...option) ),
      ),
    );
  }

  get rescueRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'Rescue' ),
      b.p( 'You made it!' ),
      b.button( 'primary', 'Try again.', ()=>{ this.reset() } ),
    );
  }
}
