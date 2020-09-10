/*
  © 2020 Sevyn
  MIT License
  https://rocketcastle.com
*/

class SevynGame extends RocketCastle {

  get playerStatus () {
    const b = this.bricks;

    const status = [];
    if (this.player.key) {
      status.push( b.p('You have key.') );
    }
    return status;
  }

  get mainRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'Living Room' ),
      b.p( 'The living room looks spacious and wonderful.  There is a dog.' ),
      ...this.playerStatus,

      b.spread(
        b.button( 'warning', 'Guest Room', ()=>{ this.room='guest' } ),
        b.button( 'primary', 'Kitchen', ()=>{ this.room='kitchen' } ),
        b.button( 'warning', 'Pet Dog', ()=>{

            b.openModal(
              b.p('Aww the dog likes you!'),
              b.button( 'primary', 'Yay!', ()=>{ b.closeModal() } ),
            );

            console.log('Im here!');

        } ),
      ),
    );
  }

  get guestRoom () {
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

}
