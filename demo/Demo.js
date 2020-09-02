/*
  © 2020 Aran Deltac
  MIT License
  https://rocketcastle.com
*/

class Demo extends RocketCastle {

  demoBox (...children) {
     return this.bricks.html( '<div class="demo-box"></div>', ...children );
  }

  get mainRoom () {
    const b = this.bricks;

    return b.div(
      b.h1( 'Space Bricks' ),
      b.divider(),

      b.h2( 'h1' ),
      b.html( '<p>🔗 <a href="https://get.foundation/sites/docs/typography-base.html#header">Foundation Header</a></p>' ), 
      b.code( "b.h1( 'Larger Header' )" ),
      this.demoBox( b.h1( 'Larger Header' ) ),

      b.h2( 'h2' ),
      b.html( '<p>🔗 <a href="https://get.foundation/sites/docs/typography-base.html#header">Foundation Header</a></p>' ), 
      b.code( "b.h2( 'Smaller Header' )" ),
      this.demoBox( b.h2( 'Smaller Header' ) ),

      b.h2( 'p' ),
      b.html( '<p>🔗 <a href="https://get.foundation/sites/docs/typography-base.html#paragraphs">Foundation Paragraphs</a></p>' ), 
      b.code( "b.p( 'A paragraph of text.' )" ),
      this.demoBox( b.p( 'A paragraph of text.' ) ),

      b.h2( 'divider' ),
      b.html( '<p>🔗 <a href="https://get.foundation/sites/docs/typography-base.html#dividers">Foundation Dividers</a></p>' ), 
      b.code( "b.divider()" ),
      this.demoBox( b.divider() ),

      b.h2( 'blockquote' ),
      b.html( '<p>🔗 <a href="https://get.foundation/sites/docs/typography-base.html#blockquotes">Foundation Blockquotes</a></p>' ), 
      b.code( `b.blockquote("It's not easy being green.", 'Kermit the Frog')` ),
      this.demoBox( b.blockquote("It's not easy being green.", 'Kermit the Frog') ),

      b.h2( 'code' ),
      b.p( '' ),
      b.html( '<p>🔗 <a href="https://get.foundation/sites/docs/typography-base.html#code">Foundation Code</a></p>' ), 
      b.code( "b.code('cupcakes.forEach( cupcake => me.eat(cupcake) );" ),
      this.demoBox( b.code('cupcakes.forEach( cupcake => me.eat(cupcake) );') ),

      b.h2( 'button' ),
      b.html( '<p>🔗 <a href="https://get.foundation/sites/docs/button.html">Foundation Button</a></p>' ), 
      b.code( "b.button('Click Me', ()=>{ this.tell('Hi!') })" ),
      this.demoBox( b.button('Click Me', ()=>{ this.tell('Hi!') }) ),

      b.h2( 'buttonGroup' ),
      b.html( '<p>🔗 <a href="https://get.foundation/sites/docs/button-group.html">Foundation Button Group</a></p>' ), 
      b.code( `b.buttonGroup(
  b.button('Click Me 1', ()=>{ this.tell('Hi 1!') }),
  b.button('Click Me 2', ()=>{ this.tell('Hi 2!') }),
  b.button('Click Me 3', ()=>{ this.tell('Hi 3!') }),
  b.button('Click Me 4', ()=>{ this.tell('Hi 4!') }),
)` ),
      this.demoBox(
        b.buttonGroup(
          b.button('Click Me 1', ()=>{ this.tell('Hi 1!') }),
          b.button('Click Me 2', ()=>{ this.tell('Hi 2!') }),
          b.button('Click Me 3', ()=>{ this.tell('Hi 3!') }),
          b.button('Click Me 4', ()=>{ this.tell('Hi 4!') }),
        )
      ),

      b.h2( 'input' ),
      b.p( 'Creates an text input box with an optional label.' ),
      b.html( '<p>🔗 <a href="https://get.foundation/sites/docs/forms.html#text-inputs">Foundation Text Inputs</a></p>' ), 
      b.code( "b.input('text', 'Favorite Pet')" ),
      this.demoBox( b.input('text', 'Favorite Word') ),
      b.code( "b.input('number', 'Favorite Number')" ),
      this.demoBox( b.input('number', 'Favorite Number') ),

      b.h2( 'spread' ),
      b.p( 'This lays out the elements horizontally on a wide screen and reduces the number of columns as the screen reduces in width.' ),
      b.html( '<p>🔗 <a href="https://get.foundation/sites/docs/xy-grid.html">Foundation XY Grid</a></p>' ), 
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

      b.h2( 'tabs' ),
      b.p( 'Takes an array of labels strings, and an equivalent number of children elements, and creates a nice tabbed interface.' ),
      b.html( '<p>🔗 <a href="https://get.foundation/sites/docs/tabs.html">Foundation Tabs</a></p>' ), 
      b.code( `b.tabs(
  ['Bird', 'Skunk', 'Hedgehog'],
  b.p('🐦'), b.p('🦨'), b.p('🦔'),
)` ),
      this.demoBox( b.tabs(
        ['Bird', 'Skunk', 'Hedgehog'],
        b.p('🐦'), b.p('🦨'), b.p('🦔'),
      ) ),

    );
  }

}
