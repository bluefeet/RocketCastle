/*
  © 2020 Aran Deltac
  MIT License
  https://rocketcastle.com
*/

const actions = {
  get forageAction () {

  },
    time: 8,
    energy: 10,
    loot: {
      branch: 
      stick: 
      stone: 
    }
  },

  fellTree: {
    time: 4,
    energy: 20,
    loot: {
      bark: 1,
    },
  }
};

const items = {

  // BASICS

  bark: {},
  branch: {},
  fiber: {},
  log: {},
  stick: {},
  stone: {},

  berry: {
    energy: 1,
    hydration: 0.5,
    expires: 24,
  },

  mushroom: {
    energy: 1,
    expires: 48,
  },

  bug: {
    health: 1,
    expires: 24,
  },

  tuber: {
    energy: 3,
    health: 1,
    expires: 7 * 24,
  },

  fish: {
    energy: 5,
    health: 5,
  },

  bone: {},
  skin: {},

  fat: {
    energy: 4,
    expires: 48,
  },

  meat: {
    health: 4,
    expires: 24,
  },

  // COOKED STUFF

  cookedMushroom: {
    energy: 1,
    expires: 4,
    recipe: {
      time: 0.2,
      fire: true,
      mushroom: 1,
    },
  },

  cookedBerry: {
    energy: 1.5,
    expires: 4,
    recipe: {
      time: 0.1,
      fire: true,
      berry: 1,
    },
  },

  cookedBug: {
    health: 2,
    expires: 8,
    recipe: {
      time: 0.1,
      fire: true,
      bug: 1,
    },
  },

  cookedTuber: {
    energy: 6,
    health: 1,
    expires: 24,
    recipe: {
      time: 0.5,
      fire: true,
      tuber: 1,
    },
  },

  cookedFish: {
    energy: 8,
    health: 8,
    recipe: {
      time: 0.25,
      fire: true,
      fish: 1,
    }
  },

  cookedMeat: {
    energy: 4,
    health: 8,
    expires: 8,
    recipe: {
      time: 0.3,
      fire: true,
      meat: 1,
    },
  },

  smokedMeat: {
    energy: 3,
    health: 7,
    expires: 48,
    recipe: {
      time: 0.3,

    }
  }

  meatStew: {
    energy: 40,
    health: 40,
    hydration: 20,
    recipe: {
      time: 3,
      fire: true,
      pot: true,
      tuber: 3,
      meat: 2,
      bone: 1,
      water: 25,
    },
  },

  veggieStew: {
    energy: 30,
    hydration: 20,
    recipe: {
      time: 3,
      fire: true,
      pot: true,
      tuber: 3,
      mushroom: 2,
      water: 25,
    },
  },

  emptyWaterskin: {
    recipe: {
      time: 4,
      fiber: 3,
      skin: 3,
      fat: 1,
    },
  },

  fullWaterSkin: {
    water: true,
    hydration: 20,
  },


  club: {
    weapon: true,
    melee: true,
    recipe: {
      time: 1,
      branch: 1,
      stone: 1,
    },
  },

  spear: {
    weapon: true,
    ranged: true,
    fishing: true,
    hunting: true,
    recipe: {
      time: 2,
      branch: 1,
      stick: 2,
      fiber: 2,
    },
  },

  axe: {
    weapon: true,
    melee: true,
    recipe: {
      time: 3,
      branch: 1,
      fiber: 4,
      stone: 1,
    },
  },

  fishingPole: {
    fishing: true,
    fishingRate: 2,
    recipe: {
      time: 6,
      branch: 1,
      fiber: 3,
    }
  },

  leanTo: {
    recipe: {
      time: 8,
      fiber: 6,
      branch: 20,
    },
  },

  basket: {
    time: 8,
    fiber: 4,
    stick: 2,
  },

  campfire: {
    time: 1,
    branch: 10,
    fiber: 1,
  },

  fireplace: {
    branch: 5,
    fiber: 1,
    stone: 10,
  },
};
class Shipwreck extends RocketCastle {

  init () {
    const player = this.player;

    player.day = 1;
    player.time = this.rand( 0, 23 ) + Math.random();

    // 0 = empty, 100 = full.
    player.energy = this.rand( 20, 100 ); // Fat and carbs.
    player.health = this.rand( 20, 100 ); // Protein.
    player.sanity = this.rand( 20, 100 );

    player.inventory = {};
  }

  get mainRoom () {
    const b = this.bricks;
    return b.div();
  }





/*




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
        b.button( 'link', 'Start.', ()=>{ this.room='beach' } ),
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
        b.button( 'link', 'Forage.', ()=>{ this.room='forage' } ),
        b.button( 'link', 'Rest.', ()=>{ this.room='rest' } ),
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
        ...options.map( option => b.button('link', ...option) ),
      ),
    );
  }

  get restRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'Rest' ),
      b.p( 'You spent your day conserving energy.' ),
      b.button( 'link', 'Prepare for the night.', ()=>{ this.room='dusk' } ),
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
        ...options.map( option => b.button('link', ...option) ),
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
        ...options.map( option => b.button('link', ...option) ),
      ),
    );
  }

  get rescueRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'Rescue' ),
      b.p( 'You made it!' ),
      b.button( 'link', 'Try again.', ()=>{ this.reset() } ),
    );
  }
*/

}
