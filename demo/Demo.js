/*
  © 2020 Aran Deltac
  MIT License
  https://rocketcastle.com
*/

class Demo extends RocketCastle {

  demoBox (...children) {
    children[ children.length - 1 ].classList.add( 'mb-0' );
    return this.bricks.html( '<div class="demo-box"></div>', ...children );
  }

  get mainRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'Space Bricks' ),

      // h1
      b.h2( 'h1' ),
      b.code( "b.h1( 'Larger Header' )" ),
      this.demoBox( b.h1( 'Larger Header' ) ),

      // h2
      b.h2( 'h2' ),
      b.code( "b.h2( 'Smaller Header' )" ),
      this.demoBox( b.h2( 'Smaller Header' ) ),

      // p
      b.h2( 'p' ),
      b.code( "b.p( 'A paragraph of text.' )" ),
      this.demoBox( b.p( 'A paragraph of text.' ) ),

      // img
      b.h2( 'img' ),
      b.code( "b.img( 'pexels-abdullah-ghatasheh-1631677.jpg' )" ),
      this.demoBox( b.img( 'pexels-abdullah-ghatasheh-1631677.jpg' ) ),

      // thumbnail
      b.h2( 'thumbnail' ),
      b.code( "b.thumbnail( 'pexels-abdullah-ghatasheh-1631677.jpg' )" ),
      this.demoBox( b.thumbnail( 'pexels-abdullah-ghatasheh-1631677.jpg' ) ),

      // blockquote
      b.h2( 'blockquote' ),
      b.code( `b.blockquote("It's not easy being green.", 'Kermit the Frog')` ),
      this.demoBox( b.blockquote("It's not easy being green.", 'Kermit the Frog') ),

      // code
      b.h2( 'code' ),
      b.code( "b.code('cupcakes.forEach( cupcake => me.eat(cupcake) );" ),
      this.demoBox( b.code('cupcakes.forEach( cupcake => me.eat(cupcake) );') ),

      // button
      b.h2( 'button' ),
      b.html( '<p>Possible button types are <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code>, <code>light</code>, <code>dark</code>, and <code>link</code>.</p>' ),
      b.code( "b.button('primary', 'Primary', ()=>{ })" ),
      this.demoBox( b.button('primary', 'Primary', ()=>{ }) ),

      // buttonGroup
      b.h2( 'buttonGroup' ),
      b.code( `b.button('primary', 'Primary', ()=>{ })
b.button('secondary', 'Secondary', ()=>{ })
b.button('success', 'Success', ()=>{ })
b.button('danger', 'Danger', ()=>{ })
b.button('warning', 'Warning', ()=>{ })
b.button('info', 'Info', ()=>{ })
b.button('light', 'Light', ()=>{ })
b.button('dark', 'Dark', ()=>{ })
b.button('link', 'Link', ()=>{ })` ),
      this.demoBox(
        b.buttonGroup(
          b.button('primary', 'Primary', ()=>{ }),
          b.button('secondary', 'Secondary', ()=>{ }),
          b.button('success', 'Success', ()=>{ }),
          b.button('danger', 'Danger', ()=>{ }),
          b.button('warning', 'Warning', ()=>{ }),
          b.button('info', 'Info', ()=>{ }),
          b.button('light', 'Light', ()=>{ }),
          b.button('dark', 'Dark', ()=>{ }),
          b.button('link', 'Link', ()=>{ }),
        )
      ),

      // input
      b.h2( 'input' ),
      b.p( 'Creates an text input box with an optional label.' ),
      b.code( `b.input('text', 'Favorite Word')
b.input('number', 'Favorite Number')` ),
      this.demoBox(
        b.input('text', 'Favorite Word'),
        b.input('number', 'Favorite Number'),
      ),

      // alert
      b.h2( 'alert' ),
      b.code( `b.alert('primary', b.p('This is primary!') )
b.alert('secondary', b.p('This is secondary!') )
b.alert('success', b.p('This is success!') )
b.alert('danger', b.p('This is danger!') )
b.alert('warning', b.p('This is warning!') )
b.alert('info', b.p('This is info!') )
b.alert('light', b.p('This is light!') )
b.alert('dark', b.p('This is dark!') )` ),
      this.demoBox(
        b.alert('primary', b.p('This is primary!') ),
        b.alert('secondary', b.p('This is secondary!') ),
        b.alert('success', b.p('This is success!') ),
        b.alert('danger', b.p('This is danger!') ),
        b.alert('warning', b.p('This is warning!') ),
        b.alert('info', b.p('This is info!') ),
        b.alert('light', b.p('This is light!') ),
        b.alert('dark', b.p('This is dark!') ),
      ),

      b.h2( 'spread' ),
      b.p( 'This lays out the elements horizontally on a wide screen and reduces the number of columns as the screen reduces in width.' ),
      b.code( `b.spread(
  b.p('🐋'), b.p('🐙'), b.p('🐢'),
  b.p('🦋'), b.p('🦉'), b.p('🦩'),
  b.p('🦘'), b.p('🦡'), b.p('🐿️'),
  b.p('🐪'), b.p('🐄'), b.p('🐘'),
)` ),
      this.demoBox( b.spread(
        b.p('🐋'), b.p('🐙'), b.p('🐢'),
        b.p('🦋'), b.p('🦉'), b.p('🦩'),
        b.p('🦘'), b.p('🦡'), b.p('🐿️'),
        b.p('🐪'), b.p('🐄'), b.p('🐘'),
      ) ),

      b.code( `b.spread(
  b.p('🐋'), b.p('🐙'), b.p('🐢'),
  b.p('🐪'), b.p('🐄'), b.p('🐘'),
)` ),
      this.demoBox( b.spread(
        b.p('🐋'), b.p('🐙'), b.p('🐢'),
        b.p('🐪'), b.p('🐄'), b.p('🐘'),
      ) ),

    );
  }

}
