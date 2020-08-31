'use strict';

class Shipwreck extends RocketCastle {
  init () {
    this.player.day = 0;

    // The player starts with between 2 and 4 health.
    this.player.health = 2 + this.rand(0,2);

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
    return this.resources.map(
      resource => player[ resource ] && `You have ${player[resource]} ${resource}.`
    );
  }

  get supplyDetails () {
    const player = this.player;
    return this.supplies.map(
      supply => player[ supply ] && `You have a ${supply}.`
    );
  }

  firstRoom () {
    return {
      title: 'Shipwreck',
      detail: 'Survive for as long as you can.',
      options: [ 
        [ 'Start.', ()=>{ this.move('beach') } ],
        this.backToRocketCastleOption(),
      ]
    }
  }

  beachRoom () {
    if (this.player.day === this.rescueDay) {
      return rescueRoom();
    }

    const details = [];

    const fireDetail = this.player.fire && 'Your fire has gone out.';
    delete this.player.fire;

    return {
      title: 'Beach',

      details: [
        'It is morning and the sun is rising.',
        fireDetail,
        ...this.playerDetails,
        'What would you like to do today?',
      ],

      options: [
        [ 'Forage.', ()=>{ this.move('forage') } ],
        [ 'Rest.', ()=>{ this.move('rest') } ],
      ],
    }
  }

  forageRoom () {
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

    const isHurt = Math.random() <= .3;
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
      options.push([ 'Prepare for the night.', ()=>{ this.move('prepare') } ])
    }

    return {
      title: 'Forage',
      details: details,
      options: options,
    };
  }

  restRoom () {
    return {
      title: 'Rest',
      detail: 'You spent your day conserving energy.',
      options: [
        [ 'Prepare for the night.', ()=>{ this.move('prepare') } ],
      ],
    };
  }

  prepareRoom () {
    const player = this.player;

    const options = [];

    if (player.food && player.health < this.maxHealth) {
      options.push([
        'Eat food.',
        ()=>{ player.food--; player.health++ },
      ]);
    }

    if (player.wood && !player.fire) {
      options.push([ 'Make fire.', ()=>{
        player.wood--;
        player.fire = true;
      } ]);
    }

    if (player.wood && player.stone && !player.spear) {
      options.push([ 'Make spear.', ()=>{
        player.wood--;
        player.stone--;
        player.spear = true;
      } ]);
    }

    if (player.wood && player.fiber && !player.basket) {
      options.push([ 'Make basket.', ()=>{
        player.wood--;
        player.fiber--;
        player.basket = true;
      } ]);
    }

    options.push([ 'Go to sleep.', ()=>{ this.move('night') } ]);

    return {
      title: 'Prepare',
      details: [
        'Unexpected things happen at night.',
        ...this.playerDetails,
        'What would you like to do?',
      ],
      options: options,
    }
  }

  nightRoom () {
    const player = this.player;

    const details = [];
    const options = [];

    const chance = Math.random();

    if (chance <= .5) {
      details.push('You awaken to the sound of wild animals attacking!')

      if (player.fire) {
        details.push('But the fire scared them away!');
      }
      else if (player.spear) {
        details.push('But you protected yourself with your spear!')
      }
      else {
        player.health --;
        details.push('And they hurt you bad.');
      }
    }
    else {
      details.push('You awaken... to the sound of waves.')
    }

    if (player.health<=0) {
      player.health = 0;
      details.push( this.healthDetail );
      options.push([ 'Try again.', ()=>{ this.reset() } ]);
    }
    else {
      options.push([ 'Go back to sleep.', ()=>{ this.player.day++; this.move('beach') } ])
    }  

    return {
      title: 'Night',
      details: details,
      options: options,
    }
  }

  rescueRoom () {
    return {
      title: 'Rescue',
      detail: 'You made it!',
      options: [
        [ 'Try again.', ()=>{ this.reset() } ],
      ],
    }
  }
}

const game = new Shipwreck();
