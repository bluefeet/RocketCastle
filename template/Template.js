/*
  © 2020 Aran Deltac
  MIT License
  https://rocketcastle.com
*/

class Template extends RocketCastle {

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
      b.h1( 'Main' ),
      ...this.playerStatus,
      b.button( 'warning', 'Guest Room', ()=>{ this.room='guest' } ),
      b.button( 'primary', 'Kitchen', ()=>{ this.room='kitchen' } ),
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
