class OfficialSite extends RocketCastle {

  get firstRoomKey () {
    return 'home';
  }

  homeRoom () {
    return {
      title: 'Rocket Castle',
      details: [
        'Welcome to 🚀🏰!',
        'What would you like to do?',
      ],
      options: [
        ['Explore.', ()=>{ this.move('explore') }],
        ['Build.', ()=>{ this.move('build') }],
      ],
    };
  }

  exploreRoom () {
    return {
      title: 'Explore!',
      detail: 'An adventure awaits...',
      options: [
        [ 'Play Shipwreck.', ()=>{ this.loadUrl('shipwreck/') } ],
        [ 'I changed my mind, go back I say!', ()=>{ this.move('home') } ]
      ],
    };
  }

  buildRoom () {
    return {
      title: 'Build!',
      detail: 'Want to create your own Rocket Castle game?',
      options: [
        [ 'Yes! Take me to GitHub.', ()=>{ this.loadUrl('https://github.com/bluefeet/RocketCastle') } ],
        [ 'No thanks.', ()=>{ this.move('home') } ]
      ],
    };
  }

}
