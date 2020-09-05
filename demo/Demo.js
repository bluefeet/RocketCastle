/*
  © 2020 Aran Deltac
  MIT License
  https://rocketcastle.com
*/

class Demo extends RocketCastle {

  demoBox (...children) {
    let boxElement = this.bricks.html( '<div class="demo-box"></div>', ...children );

    // Removing the margin from the last element makes for a clean layout.
    if (boxElement.lastChild && boxElement.lastChild.classList) {
      boxElement.lastChild.classList.add( 'mb-0' );
    }

    return boxElement;
  }

  get mainRoom () {
    const b = this.bricks;

    const contents = [
      this.htmlDemo,
      this.scrollDemo,
      this.h1Demo,
      this.h2Demo,
      this.h3Demo,
      this.pDemo,
      this.hrDemo,
      this.imgDemo,
      this.thumbnailDemo,
      this.blockquoteDemo,
      this.codeDemo,
      this.buttonDemo,
      this.buttonGroupDemo,
      this.inputDemo,
      this.alertDemo,
      this.spreadDemo,
      this.modalDemo,
    ].flatMap( demo => [b.hr(), demo] );

    return b.div(
      b.h1( 'Space Bricks' ),
      ...contents,
    );
  }

  get htmlDemo () {
    const b = this.bricks;
    
    return b.div(
      b.h2( 'html' ),
      b.p(`
        Use this to output any arbitrary HTML, the imagination is your limits.
        The first parameter must be either a string of HTML, or an
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement">HTMLElement</a>.
        Additional HTML string or HTMLElement objects may be passed and they will be made
        children of the first element.
      `),

      b.h3( 'Syntax' ),
      b.code( `const element = b.html( html, ...children )` ),
      b.dl(
        b.dt('<code>element</code>'),
        b.dd('The final returned HTMLElement object.'),
        b.dt('<code>html</code>'),
        b.dd('An HTML string or HTMLElement object.'),
        b.dt('<code>...children</code>'),
        b.dd('Any child HTML strings or HTMLElement objects. Optional.'),
      ),

      b.h3( 'Example' ),
      b.code( "b.html( '<div>Hello <b>world!</b></div>' )" ),
      this.demoBox( b.html( '<div>Hello <b>world!</b></div>' ) ),
    );
  }

  get scrollDemo () {
    const b = this.bricks;
    
    return b.div(
      b.h2( 'scroll' ),
      b.p(`
        This clones an element from the DOM and returns it.
      `),

      b.h3( 'Example' ),
      b.code( `b.scroll('scroll-demo')` ),
      this.demoBox( b.scroll('scroll-demo') ),
    );
  }

  get h1Demo () {
    const b = this.bricks;
    
    return b.div(
      b.h2( 'h1' ),
      
      b.h3( 'Example' ),
      b.code( "b.h1( 'Larger Header' )" ),
      this.demoBox( b.h1( 'Larger Header' ) ),
    );
  }

  get h2Demo () {
    const b = this.bricks;
    
    return b.div(
      b.h2( 'h2' ),

      b.h3( 'Example' ),
      b.code( "b.h2( 'Smaller Header' )" ),
      this.demoBox( b.h2( 'Smaller Header' ) ),
    );
  }

  get h3Demo () {
    const b = this.bricks;
    
    return b.div(
      b.h2( 'h3' ),

      b.h3( 'Example' ),
      b.code( "b.h3( 'Tiny Header' )" ),
      this.demoBox( b.h3( 'Tiny Header' ) ),
    );
  }

  get pDemo () { // Its a pee!
    const b = this.bricks;
    
    return b.div(
      b.h2( 'p' ),
      b.h3( 'Example' ),
      b.code( "b.p( 'A paragraph of text.' )" ),
      this.demoBox( b.p( 'A paragraph of text.' ) ),
    );
  }

  get hrDemo () {
    const b = this.bricks;
    
    return b.div(
      b.h2( 'hr' ),
      b.h3( 'Example' ),
      b.code( 'b.hr()' ),
      this.demoBox( b.hr() ),
    );
  }

  get imgDemo () {
    const b = this.bricks;
    
    return b.div(
      b.h2( 'img' ),
      b.h3( 'Example' ),
      b.code( "b.img( 'pexels-abdullah-ghatasheh-1631677.jpg' )" ),
      this.demoBox( b.img( 'pexels-abdullah-ghatasheh-1631677.jpg' ) ),
    );
  }

  get thumbnailDemo () {
    const b = this.bricks;
    
    return b.div(
      b.h2( 'thumbnail' ),
      b.h3( 'Example' ),
      b.code( "b.thumbnail( 'pexels-abdullah-ghatasheh-1631677.jpg' )" ),
      this.demoBox( b.thumbnail( 'pexels-abdullah-ghatasheh-1631677.jpg' ) ),
    );
  }

  get blockquoteDemo () {
    const b = this.bricks;
    
    return b.div(
      b.h2( 'blockquote' ),
      b.p(`
        Its a quote box thing using
        <a href="https://getbootstrap.com/docs/4.5/content/typography/#blockquotes">Bootstrap blockquote typography</a>.
        The second parameter, <code>cite</code>, is optional.
      `),
      
      b.h3( 'Example' ),
      b.code( `b.blockquote("It's not easy being green.", 'Kermit the Frog')` ),
      this.demoBox( b.blockquote("It's not easy being green.", 'Kermit the Frog') ),
    );
  }

  get codeDemo () {
    const b = this.bricks;
    
    return b.div(
      b.h2( 'code' ),
      b.p(`
        Displays source code (like JavaScript) using a fixed-width font as provided by
        <a href="https://getbootstrap.com/docs/4.5/content/code/">Bootstrap</a>.
        The code should <em>not</em> be escaped for HTML as it is treated as plain text.
      `),

      b.h3( 'Example' ),
      b.code(`b.code('cupcakes.forEach( cupcake => me.eat(cupcake) );')`),
      this.demoBox(
        b.code('cupcakes.forEach( cupcake => me.eat(cupcake) );') 
      ),
    );
  }

  get buttonDemo () {
    const b = this.bricks;
    
    return b.div(
      b.h2( 'button' ),
      b.p(`
        Creates a
        <a href="https://getbootstrap.com/docs/4.5/components/buttons/">Bootstrap button component</a>.
      `),
      b.alert('info', `
        <strong>Note:</strong> Buttons are
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements">inline elements</a>,
        thus they will flow horizontally like text does.  If you want to flow them differently you
        could put each of your buttons in a <code>div</code>, wrap it in a <code>buttonGroup</code>,
        or use a <code>spread</code>.
      `),
      b.h3( 'Example' ),
      b.code( `b.button('primary', 'Primary', ()=>{ b.modal(b.modalBody('Hello!')) })
b.button('secondary', 'Secondary', ()=>{ b.modal(b.modalBody('Hello secondary!')) })
b.button('success', 'Success', ()=>{ b.modal(b.modalBody('Hello success!')) })
b.button('danger', 'Danger', ()=>{ b.modal(b.modalBody('Hello danger!')) })
b.button('warning', 'Warning', ()=>{ b.modal(b.modalBody('Hello warning!')) })
b.button('info', 'Info', ()=>{ b.modal(b.modalBody('Hello info!')) })
b.button('light', 'Light', ()=>{ b.modal(b.modalBody('Hello light!')) })
b.button('dark', 'Dark', ()=>{ b.modal(b.modalBody('Hello dark!')) })
b.button('link', 'Link', ()=>{ b.modal(b.modalBody('Hello link!')) })` ),
      this.demoBox(
        b.button('primary', 'Primary', ()=>{ b.modal(b.modalBody('Hello!')) }),
        b.button('secondary', 'Secondary', ()=>{ b.modal(b.modalBody('Hello secondary!')) }),
        b.button('success', 'Success', ()=>{ b.modal(b.modalBody('Hello success!')) }),
        b.button('danger', 'Danger', ()=>{ b.modal(b.modalBody('Hello danger!')) }),
        b.button('warning', 'Warning', ()=>{ b.modal(b.modalBody('Hello warning!')) }),
        b.button('info', 'Info', ()=>{ b.modal(b.modalBody('Hello info!')) }),
        b.button('light', 'Light', ()=>{ b.modal(b.modalBody('Hello light!')) }),
        b.button('dark', 'Dark', ()=>{ b.modal(b.modalBody('Hello dark!')) }),
        b.button('link', 'Link', ()=>{ b.modal(b.modalBody('Hello link!')) }),
      ),
    );
  }

  get buttonGroupDemo () {
    const b = this.bricks;
    
    return b.div(
      b.h2( 'buttonGroup' ),
      b.p(`
        Creates a
        <a href="https://getbootstrap.com/docs/4.5/components/button-group/">Bootstrap button group component</a>
        which lays the buttons our horizontally and connects their edges.
      `),
      b.h3( 'Example' ),
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
    );
  }

  get inputDemo () {
    const b = this.bricks;
    
    const howOld = b.p();

    return b.div(
      b.h2( 'input' ),
      b.p(`
        Creates an text input box with an optional label. See
        <a href="https://getbootstrap.com/docs/4.5/components/forms/">Bootstrap form components</a>
        for more info.
      `),
      b.h3( 'Example' ),
      b.code( `b.input('text', 'What is your character\'s name?', (name)=> {
  this.player.name = name;
})
b.input('number', 'How old is your character?', (age)=>{
  this.player.age = age;
})` ),
      this.demoBox(
        b.input('text', 'What is your character\'s name?', (name)=> {
          this.player.name = name;
        }),
        b.input('number', 'How old is your character?', (age)=>{
          this.player.age = age;
        }),
      ),
    );
  }

  get alertDemo () {
    const b = this.bricks;
    
    return b.div(
      b.h2( 'alert' ),
      b.p(`
        This creates a
        <a href="https://getbootstrap.com/docs/4.5/components/alerts/">Bootstrap alert component</a>.
      `),

      b.h3( 'Example' ),
      b.code( `b.alert('primary', 'This is primary!' )
b.alert('secondary', 'This is secondary!' )
b.alert('success', 'This is success!' )
b.alert('danger', 'This is danger!' )
b.alert('warning', 'This is warning!' )
b.alert('info', 'This is info!' )
b.alert('light', 'This is light!' )
b.alert('dark', 'This is dark!' )` ),
      this.demoBox(
        b.alert('primary', 'This is primary!' ),
        b.alert('secondary', 'This is secondary!' ),
        b.alert('success', 'This is success!' ),
        b.alert('danger', 'This is danger!' ),
        b.alert('warning', 'This is warning!' ),
        b.alert('info', 'This is info!' ),
        b.alert('light', 'This is light!' ),
        b.alert('dark', 'This is dark!' ),
      ),
    );
  }

  get spreadDemo () {
    const b = this.bricks;

    return b.div(
      b.h2( 'spread' ),
      b.p(`
        This uses the
        <a href="https://getbootstrap.com/docs/4.5/layout/grid/">Bootstrp grid system</a>
        to lay out the elements horizontal in a
        <a href="https://en.wikipedia.org/wiki/Responsive_web_design">responsive fashion</a>
        where the number of columns reduces as the width of the browser gets smaller.
      `),

      b.h3( 'Example' ),
      b.code( `b.spread(
  '🐋', '🐙', '🐢',
  '🦋', '🦉', '🦩',
  '🦘', '🦡', '🐿️',
  '🐪', '🐄', '🐘',
)` ),
      this.demoBox( b.spread(
        '🐋', '🐙', '🐢',
        '🦋', '🦉', '🦩',
        '🦘', '🦡', '🐿️',
        '🐪', '🐄', '🐘',
      ) ),

      b.code( `b.spread(
  '🐋', '🐙', '🐢',
  '🐪', '🐄', '🐘',
)` ),
      this.demoBox( b.spread(
        '🐋', '🐙', '🐢',
        '🐪', '🐄', '🐘',
      ) ),
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
        <a href="https://getbootstrap.com/docs/4.5/components/modal/">Bootstrap modal component</a>
        and inserts it into the page, displays it, and then when it closes, destroys it.
      `),
      b.p(`
        The first parameter to the <code>modal</code> method may be an <code>options</code> object.
        Available options are <a href="https://getbootstrap.com/docs/4.5/components/modal/#options">described here</a>.
      `),
      b.p(`
        The <code>header</code>, <code>body</code>, and <code>footer</code> parameters are all
        optional.
      `),
      b.alert( 'warning', `
        <strong>Important:</strong> <code>b.modal()</code> is one of the few methods in Space Blocks which does not return
        an HTML element.  Instead, when it is called the modal is immediately displayed and the
        code after the modal continues to run.
      `),

      b.h3( 'Example' ),
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
