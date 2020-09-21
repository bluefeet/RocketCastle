/*
  © 2020 Aran Deltac
  MIT License
  https://rocketcastle.com
*/

class SpaceBricks {

  constructor (dom) {
    this.dom = dom || window?.document;
    if (!dom) throw 'Unable to access window.document';
  }

  /* Utility Methods */

  get uid () {
      let id = this.nextUID || 0;
      this.nextUID = id + 1;
      return `spacebricks-uid-${id}`;
  }

  find (selector) {
    return this.dom.body.querySelector( selector );
  }

  html (first, ...children) {
    if (typeof first === 'string') {
      first = this.dom.createRange().createContextualFragment( first );
      if (first.firstElementChild) first = first.firstElementChild;
    }

    if (!first) throw 'The first argument must be a single element (string or object)';
    if (children.length && !first.appendChild) throw 'The first HTML does not contain an element to append children to';

    children.forEach( child => {
      if (typeof child === 'string') child = this.dom.createRange().createContextualFragment( child );
      first.appendChild( child );
    })

    return first;
  }

  empty (element) {
    while (element.firstChild) {
      element.firstChild.remove();
    }   
  }

  isPlainObject (object) {
    return object instanceof Object && object.constructor === Object;
  }

  clone (selector) {
    return this.find( selector ).cloneNode( true );
  }

  /* Basic Elements */

  element (tagName, ...children) {
    const element = this.dom.createElement( tagName );
    children.forEach( child => element.appendChild( this.html(child) ) );
    return element;
  }

  div (...children) {
    return this.element( 'div', ...children);
  }

  img (src) {
    const element = this.html( '<img class="img-fluid">' );
    if (src) element.setAttribute( 'src', src );
    return element;
  }

  /* Typography Elements */

  h1 (...children) { return this.element( 'h1', ...children ) }
  h2 (...children) { return this.element( 'h2', ...children ) }
  h3 (...children) { return this.element( 'h3', ...children ) }

  p (...children) { return this.element( 'p', ...children ) }
  lead (...children) { return this.html( `<p class="lead"></p>`, ...children ) }

  hr () { return this.element('hr') }

  blockquote (quote='', cite) {
    const quoteElement = this.html( `<blockquote class="blockquote"></blockquote>` );
    quoteElement.appendChild( this.html(quote) );

    if (cite) {
      const footerElement = this.html( '<footer class="blockquote-footer"></footer>' );
      const citeElement = this.html( `<cite></cite>` );
      citeElement.appendChild( this.html(cite) );
      citeElement.setAttribute( 'title', cite );
      footerElement.appendChild( citeElement );
      quoteElement.appendChild( footerElement );
    }

    return quoteElement;
  }

  dl (...children) { return this.element('dl', ...children) }
  dt (...children) { return this.element('dt', ...children) }
  dd (...children) { return this.element('dd', ...children) }

  code (text='') {
    const preElement = this.element( 'pre' );
    const codeElement = this.element( 'code' );
    codeElement.textContent = text;
    preElement.appendChild( codeElement );
    return preElement;
  }

  /* Control Elements */

  button (type, html='', callback) {
    const buttonElement = this.html(
      `<button type="button" class="btn"></button>`, html
    );
    buttonElement.classList.add( `btn-${type}` );
    buttonElement.addEventListener( 'click', callback );
    return buttonElement;
  }

  buttonGroup (...buttons) {
    const groupElement = this.html( '<div class="btn-group" role="group"></div>' );

    buttons.forEach( button => {
      groupElement.appendChild( button );
    });

    return groupElement;
  }

  /* Form Elements */

  input (type, label='', onChangeCallback) {
    const id = this.uid;
    const groupElement = this.html( '<div class="form-group"></div>' );

    const labelElement = this.html( `<label for="${id}"></label>`, label );
    groupElement.appendChild( labelElement );

    const inputElement = this.html( `<input class="form-control" id="${id}">` );
    inputElement.setAttribute( 'type', type )
    groupElement.appendChild( inputElement );

    if (onChangeCallback) {
      inputElement.addEventListener( 'change', (event)=>{
        onChangeCallback( event.target.value )
      });
    }

    return groupElement;
  }

  /* Container Elements */

  alert (type, ...children) {
    let element = this.html( '<div class="alert" role="alert"></div>', ...children );
    element.classList.add( `alert-${type}` );
    if (element.lastChild && element.lastChild.classList) {
      element.lastChild.classList.add( 'mb-0' );
    }
    return element;
  }

  spread (...children) {
    const containerElement = this.html( '<div class="container"></div>' );
    const rowElement = this.html( '<div class="row"></div>' );
    containerElement.appendChild( rowElement );

    const l = children.length;

    const fixCols = (cols)=>{
      cols = cols || 1;
      if (cols===5 || cols>6){ return 6 }
      return cols; 
    }

    const lg = fixCols( Math.floor( 12 / children.length ) );
    const md = fixCols( lg * 2 );
    const sm = fixCols( md * 2 );

    children.forEach( child => {
      const colElement = this.html( `<div class="col-sm-${sm} col-md-${md} col-lg-${lg}"></div>`, child );
      rowElement.appendChild( colElement );
    });

    return containerElement;
  }

  openModal (...children) {
    const b = this;

    if (b.currentModalID) { throw 'A modal is already open' }
    const id = b.currentModalID = `modal-${b.uid}`;

    const modalElement = b.html(`
      <div class="modal fade" id="${id}" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
          </div>
        </div>
      </div>
    `);

    const contentElement = modalElement.querySelector('.modal-content');
    const bodyElement = b.html('<div class="modal-body"></div>', ...children);
    contentElement.appendChild( bodyElement );
    b.dom.body.appendChild( modalElement );

    const jq = $(`#${id}`);
    jq.modal({
      keyboard: false,
      backdrop: 'static',
    });

    jq.on( 'hidden.bs.modal', ()=>{
      jq.modal('dispose');
      b.dom.body.removeChild( modalElement );
      delete this.currentModalID;
    });

    // No return as this method actively modifies the document.
  }

  closeModal () {
    if (!this.currentModalID) { throw 'There is no modal to close' }
    $(`#${this.currentModalID}`).modal('hide');
  }

  tabs (titles, ...panels) {
    if (titles.length !== panels.length) {
      throw 'The number of titles and panels is not equal';
    }

    const b = this;

    const uids = [];

    const navElement = b.html('<nav><div class="nav nav-pills" role="tablist"></div></nav>');
    const titlesElement = navElement.firstChild;
    
    let isFirstTitle = true;
    titles.forEach( title => {
      const uid = b.uid;
      uids.push( uid );
      const element = b.html(
        `<a class="nav-link" id="nav-${uid}" data-toggle="pill" href="#panel-${uid}" role="tab" aria-controls="panel-${uid}"></a>`,
        title,
      );
      if (isFirstTitle) {
        element.classList.add('active');
        element.setAttribute( 'aria-selected', 'true' );
        isFirstTitle = false;
      }
      else {
        element.setAttribute( 'aria-selected', 'false' );
      }
      titlesElement.appendChild( element );
    });

    const contentElement = b.html('<div class="tab-content"></div>');

    let isFirstPanel = true;
    panels.forEach( panel => {
      const uid = uids.shift();
      const element = b.html(
        `<div class="tab-pane fade" id="panel-${uid}" role="tabpanel" aria-labelledby="nav-${uid}"></div>`,
        panel,
      );
      if (isFirstPanel) {
        element.classList.add('show', 'active');
        isFirstPanel = false;
      }
      if (element.lastChild && element.lastChild.classList) {
        element.lastChild.classList.add( 'mb-0' );
      }
      contentElement.appendChild( element );
    });

    return b.div(
      navElement,
      contentElement,
    );
  }

}
