/*
  © 2020 Ula Deltac
  MIT License
  https://rocketcastle.com
*/

class UlaGame extends RocketCastle {

  /*get playerStatus () {
    const b = this.bricks;

    const status = [];
    if (this.player.key) {
      status.push( b.p('You have key.') ); 
    }
    //return status;
  }*/

  

  get mainRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'Beginings' ),
      b.p( 'You see people standing around you. At first everything is quite, then a loud beeping noise interrupts the silent. These people start shouting. You can’t keep your eyes open. You feel a kiss on your forehead and your eyes close. Darkness.' ),
      b.button( 'primary', 'into the darkness', ()=>{ this.room='darkness' } ),
    );
  }

//SECTION 1 (the darkness) >>

  get darknessRoom () {//start
    const b = this.bricks;

    return b.div(
      b.h1( 'The Darkness' ),
      b.p( 'Everything around you is dark nothing.  you hear a deep, resonating voice. It feels as if it’s coming from right in front of your nose "Welcome being. Everything around you is matter, consisting of purgatory.  The between world.  Would you like to stay here or come with me to the unknown?"'),
      b.button( 'primary', 'stay in the darkness', ()=>{ this.room='stay' } ),
      b.button( 'primary', 'continue into the unknown', ()=>{ this.room='unknown' } ),
      b.button(
        'primary', 'ask the voice what the unknown is',
        ()=>{ b.openModal(
          b.p('With an annoyed tone the voice responds. “You mortals always want to know more than you need.  The Unknown does not exist until we get there. The Unknown is both a figment of the personal imagination and an unchanging home for us immortals.  Now, have you made a choice or not?”'),
          b.button( 'primary', 'OK', ()=>{ b.closeModal() } ),
        ) },
      ),
    );
  }

  get stayRoom () {//darknessRoom
    const b = this.bricks;

    return b.div(
      b.h1( 'The Darkness' ),
      b.p( 'The voice sighs “As you wish, naive mortal.” You can feel the voice\'s presents fading away.'),
      b.button( 'primary', 'change your mind. “Wait!”', ()=>{ this.room='wait' } ),
      b.button( 'primary', 'stay in the darkness', ()=>{ this.room='stay2' } ),
    );
  }

  get waitRoom () {//stayRoom
    const b = this.bricks;

    return b.div(
      b.h1( '"Wait!"' ),
      b.p( 'The voice is back “Changed your mind? I see. As you wish, human.” You can hear a ting of minialcle excitement in it’s tone.'),
      b.button( 'primary', 'continue into the unknown', ()=>{ this.room='unknown' } ),
    );
  }

  get stay2Room () {//stayRoom + waitRoom
    const b = this.bricks;

    return b.div(
      b.h1( 'The Darkness' ),
      b.p( 'You are alone in silence. Soon you can hear your blood pumping in your vanes. You see faces everywhere, but they disappear before you can tell if theyre real. As the darkness consumes you, reality slips out of your grasp. This is it, for eternity.'),
    );
  }

  

 //SECTION 2 (the unknown) >>>

  get unknownRoom () {//darknessRoom
    const b = this.bricks;

    return b.div(
      b.h1( 'The Unknown' ),
      b.p( 'The voices presence disappears in an instant. The sensation of Gravity disappears. You notice that your eyes are closed. You can finally feel the wind again. You can feel dirt and pebbles between your toes.'),
      b.button( 'primary', 'open your eyes', ()=>{ this.room='cliff' } ),
      b.button( 'primary', 'this is to good to be true, keep you eyes closed', ()=>{ this.room='cliff2' } ),
    );
  }

  get cliffRoom () {//unknownRoom
    const b = this.bricks;

    return b.div(
      b.h1( 'The Cliff' ),
      b.p( 'You are standing on a rocky cliff. You cant see anything past it but fog with indiscernible shapes appearing and disappearing.'),
      b.button(
        'primary', 'look up',
        ()=>{ b.openModal(
          b.p('Far, far up is... More darkness. But this time you can barely make out some shapes. You can see your reflection above you in the shiny black darkness. Is it polished stone? Glass? Maybe even water?'),
          b.button( 'primary', 'OK', ()=>{ b.closeModal() } ),
        ) },
      ),
      b.button(
        'primary', 'look to your right',
        ()=>{ b.openModal(
          b.p('The cliff continues until it fades into the fog.'),
          b.button( 'primary', 'OK', ()=>{ b.closeModal() } ),
        ) },
      ),
      b.button( 'primary', 'walk to your left', ()=>{ this.room='lookLeft' } ),
      b.button( 'primary', 'walk behind', ()=>{ this.room='lookBehind' } ),
    );
  }

  get cliff2Room () {//unknownRoom
    const b = this.bricks;

    return b.div(
      b.h1( 'The Cliff' ),
      b.p( 'You hear the voice, but it doesnt feel like it’s coming from in front of your nose anymore. “open your eyes you insolent-!” You feel a painful flick on your forehead. The sensation forces your eyes open. You are standing on a rocky cliff. You cant see anything past it exept fog with indiscernible shapes appearing and disappearing.'),
      b.button(
        'primary', 'look up',
        ()=>{ b.openModal(
          b.p('Far, far up is... More darkness. But this time you can barely make out some shapes. You can see your reflection above you in the shiny black darkness. Is it polished stone? Glass? Maybe even water?'),
          b.button( 'primary', 'OK', ()=>{ b.closeModal() } ),
        ) },
      ),
      b.button(
        'primary', 'look to your right',
        ()=>{ b.openModal(
          b.p('The cliff continues until it fades into the fog.'),
          b.button( 'primary', 'OK', ()=>{ b.closeModal() } ),
        ) },
      ),
      b.button( 'primary', 'walk to your left', ()=>{ this.room='lookLeft' } ),
      b.button( 'primary', 'walk behind', ()=>{ this.room='lookBehind' } ),
    );
  }


  get lookLeftRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'The Voice' ),
      b.p( 'You see a being the height of an extraordinarily tall human dressed in a white cloak with a hood. The cloak drapes all the way down to the ground, covering almost all of their body. All that you can see is their hands and a face, but their flesh is made of thick black mist forming around the bone.' ),
      b.button( 'primary', 'walk behind', ()=>{ this.room='lookBehind' } ), 
      b.button( 'primary', 'ask them where you are', ()=>{ this.room='askVoiceWhere' } ),
      b.button(
        'primary', 'what are you?',
        ()=>{ b.openModal(
          b.p('“*sigh* I am an immortal being and I am here to lead you on your way. if you must name me at all, you may use the name “Preth”."'),
          b.button( 'primary', 'OK', ()=>{ b.closeModal() } ),
        ) },
      ),
      b.button( 'primary', 'reach for their hand to see if your hand goes through the misty flesh', ()=>{ this.room='mistyHand' } ), 
    );
  }
  
  get lookBehindRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'Stone Wall' ),
      b.p( 'You see a towering stone wall with gray smoke wafting out of the cracks.' ),
      b.button(
        'primary', 'lean in to smell the smoke',
        ()=>{ b.openModal(
          b.p('The smell makes you shiver and a temporary wave of anxiety washes over you.'),
          b.button( 'primary', 'OK', ()=>{ b.closeModal() } ),
        ) },
      ),
      b.button(
        'primary', 'look up',
        ()=>{ b.openModal(
          b.p('Far, far up is... More darkness. But this time you can barely make out some shapes. You can see your reflection above you in the shiny black darkness. Is it polished stone? Glass? Maybe even water?'),
          b.button( 'primary', 'OK', ()=>{ b.closeModal() } ),
        ) },
      ),
      b.button(
        'primary', 'look to your right',
        ()=>{ b.openModal(
          b.p('The cliff continues until it fades into the fog.'),
          b.button( 'primary', 'OK', ()=>{ b.closeModal() } ),
        ) },
      ),
      b.button( 'primary', 'walk to your left', ()=>{ this.room='lookLeft' } ),  
    );
  }

  get askVoiceWhereRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'where are we?' ),
      b.p( 'This is the unknown, as simple as that.  Now, Are you ready to continue on?' ),
      b.button( 'primary', '"yes, I think so."', ()=>{ this.room='yes' } ),
      b.button( 'primary', 'n-no, I don\'t think so', ()=>{ this.room='stayCliff' } ),
      b.button( 'primary', 'walk behind', ()=>{ this.room='lookBehind' } ),
    );
    
  }
  get yesRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'follow?' ),
      b.p( '"follow me" they say as They turn away and start walking away along the cliff.' ),
      b.button( 'primary', 'follow them.', ()=>{ this.room='follow' } ),
      b.button( 'primary', 'stay exploring the cliff', ()=>{ this.room='stayCliff' } ),
      b.button(
        'primary', 'Ask them where their going.',
        ()=>{ b.openModal(
          b.p('They just keep walking.'),
          b.button( 'primary', 'OK', ()=>{ b.closeModal() } ),
        ) },
      ),
    );
  }


  get mistyHandRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'Reach' ),
      b.p( 'They jerk their hand away before you can touch it. “DO YOU WANT ME TO ELIMINATE YOU?! If a mortal like you touches me they will incinerate on the spot. You humans know nothing.” They turn away and start walking away along the cliff. ' ),
      b.button( 'primary', 'follow them.', ()=>{ this.room='follow' } ),
      b.button(
        'primary', 'Ask them where their going.',
        ()=>{ b.openModal(
          b.p('They just keep walking.'),
          b.button( 'primary', 'OK', ()=>{ b.closeModal() } ),
        ) },
      ),
    );
  }
  get stayCliffRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'You stayed' ),
      b.p( 'as the voice\'s figure fads into the fog you can feel the cliff underneath your feet slowly dragging you under like quicksand until you are completely submerged, surrounded by...Darkness.' ),
    );  
  }

  //SECTION 3 (into to trial) >>
  get followRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'following' ),
      b.p( '' ),
      b.button( 'primary', '', ()=>{ this.room='' } ),
      b.button( 'primary', '', ()=>{ this.room='' } ),
      b.button( 'primary', '', ()=>{ this.room='' } ),
    );
  }
  get Room () {
    const b = this.bricks;

    return b.div(
      b.h1( '' ),
      b.p( '' ),
      b.button( 'primary', '', ()=>{ this.room='' } ),
      b.button( 'primary', '', ()=>{ this.room='' } ),
      b.button( 'primary', '', ()=>{ this.room='' } ),
    );
  }
  /*get Room () {
    const b = this.bricks;

    return b.div(
      b.h1( '' ),
      b.p( '' ),
      b.button( 'primary', '', ()=>{ this.room='' } ),
      b.button( 'primary', '', ()=>{ this.room='' } ),
      b.button( 'primary', '', ()=>{ this.room='' } ),
    );
  }*/
}
  

  /*get guestRoom () {
    const b = this.bricks;

    const buttons = [];
    if (this.player.key) {
      buttons.push(
        b.button( 'secondary', 'Closet', ()=>{ this.room='closet' } ),
      )
    }

    return b.div(
      b.h1( 'Guest' ),
      ...this.playerStatus,
      b.button( 'success', 'Main Room', ()=>{ this.room='main' } ),
      b.button( 'primary', 'Kitchen', ()=>{ this.room='kitchen' } ),
      ...buttons,
    );
  }

  get kitchenRoom () {
    const b = this.bricks;

    const buttons = [];
    if (!this.player.key) {
      buttons.push(
        b.button( 'link', 'Pick up Key!', ()=>{
          this.player.key = true;
          this.refresh();
        } ),
      )
    }

    return b.div(
      b.h1( 'Kitchen' ),
      ...this.playerStatus,
      b.button( 'warning', 'Guest Room', ()=>{ this.room='guest' } ),
      b.button( 'success', 'Main Room', ()=>{ this.room='main' } ),
      ...buttons,
    );
  }

  get closetRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'Closet' ),
      ...this.playerStatus,
      b.button( 'warning', 'Guest Room', ()=>{ this.room='guest' } ),
    );
  }
  get mainRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'Main' ),
      ...this.playerStatus,
      b.button( 'warning', 'Guest Room', ()=>{ this.room='guest' } ),
      b.button( 'primary', 'Kitchen', ()=>{ this.room='kitchen' } ),
    );
  }*/
//}
