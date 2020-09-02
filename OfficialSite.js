/*
  © 2020 Aran Deltac
  MIT License
  https://rocketcastle.com
*/

class OfficialSite extends RocketCastle {

  get mainRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'Rocket Castle' ),
      b.p( 'Welcome to 🚀🏰!' ),
      b.p( 'What would you like to do?' ),
      b.buttonGroup(
        b.button( 'Explore.', ()=>{ this.move('explore') } ),
        b.button( 'Build.', ()=>{ this.move('build') } ),
      ),
    );
  }

  get exploreRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'Explore!' ),
      b.p( 'An adventure awaits...' ),
      b.buttonGroup(
        b.button( 'Play the Demo.', ()=>{ this.loadUrl('demo/') } ),
        b.button( 'Play Shipwreck.', ()=>{ this.loadUrl('shipwreck/') } ),
        b.button( 'I changed my mind, go back I say!', ()=>{ this.move('main') } ),
      ),
    );
  }

  get buildRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'Build!' ),
      b.p( 'Want to create your own Rocket Castle game?' ),
      b.buttonGroup(
        b.button( 'Yes! Take me to GitHub.', ()=>{ this.loadUrl('https://github.com/bluefeet/RocketCastle') } ),
        b.button( 'No thanks.', ()=>{ this.move('main') } ),
      ),
    );
  }

}
