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
      b.code( `b.buttonGroup(
  b.button('primary', '<', ()=>{ }),
  b.button('primary', '1', ()=>{ }),
  b.button('primary', '2', ()=>{ }),
  b.button('primary', '3', ()=>{ }),
  b.button('primary', '4', ()=>{ }),
  b.button('primary', '>', ()=>{ }),
)` ),
      this.demoBox(
        b.buttonGroup(
          b.button('primary', '<', ()=>{ }),
          b.button('primary', '1', ()=>{ }),
          b.button('primary', '2', ()=>{ }),
          b.button('primary', '3', ()=>{ }),
          b.button('primary', '4', ()=>{ }),
          b.button('primary', '>', ()=>{ }),
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

      // spread
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

      this.modalDemo,
    );
  }

  get modalDemo () {
    const b = this.bricks;

    const header = b.modalHeader(
      b.modalTitle( 'Modal <em>Title</em>' ),
      b.modalCloseButton(),
    )

    const body = b.modalBody(
      b.p('You opened the modal. <strong>Good job!</strong>'),
    );
    
    const footer = b.modalFooter(
      b.button('secondary', 'Close', ()=>{ b.closeModal() }),
    );

    const button = b.button(
      'primary', 'Open Modal',
      ()=>{ b.modal( {}, header, body, footer) },
    )

    return b.div(
      b.h2( 'modal' ),
      b.p(`
        This creates a
        <a href="https://getbootstrap.com/docs/4.5/components/modal/">Bootstrap Modal</a>
        and inserts it into the page, displays it, and then when it closes, destroys it.
      `),
      b.p(`
        The first parameter to the <code>modal</code> method
        (the <code>{}</code> in <code>b.modal({},header,body,footer)</code>)\
        is an <code>options</code> objects as
        <a href="https://getbootstrap.com/docs/4.5/components/modal/#options">described here</a>.
      `),
      b.p(`
        The <code>header</code>, <code>body</code>, and <code>footer</code> parameters are all
        optional.
      `),
      b.code(`const header = b.modalHeader(
  b.modalTitle( 'Modal <em>Title</em>' ),
  b.modalCloseButton(),
)

const body = b.modalBody(
  b.p('You opened the modal. <strong>Good job!</strong>'),
);

const footer = b.modalFooter(
  b.button('secondary', 'Close', ()=>{ b.closeModal() }),
);

const button = b.button(
  'primary', 'Open Modal',
  ()=>{ b.modal( {}, header, body, footer ) },
)

// Now return button as part of your room.`),
      this.demoBox( button ),
    );
  }

}
