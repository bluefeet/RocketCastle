/*
  © 2020 Aran Deltac
  MIT License
  https://rocketcastle.com
*/

class SpaceBricks {

  constructor (dom) {
    this.dom = dom || window.document;
  }

  /* Utility Methods */

  get uid () {
      let id = this.nextUID || 0;
      this.nextUID = id + 1;
      return `spacebricks-uid-${id}`;
  }

  find (id) {
    return this.dom.getElementById( id );
  }

  html (first, ...children) {
    let stuff = [first, ...children];
    
    const elements = [];
    stuff.forEach( thing => {
      if (typeof thing === 'string') {
        const fragment = this.dom.createRange().createContextualFragment( thing.trim() );
        elements.push( ...fragment.childNodes )
      }
      else elements.push( thing );
    });

    const element = elements.shift();
    elements.forEach( child => element.appendChild(child) );

    return element;
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
    return this.dom.body.querySelector( selector ).cloneNode( true );
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

  thumbnail (src) {
    const element = this.html( '<img class="img-thumbnail">' );
    if (src) element.setAttribute( 'src', src );
    return element;
  }

  /* Typography Elements */

  h1 (html='') {
    return this.html( `<h1>${html}</h1>` );
  }

  h2 (html='') {
    return this.html( `<h2>${html}</h2>` );
  }

  h3 (html='') {
    return this.html( `<h3>${html}</h3>` );
  }

  p (html='') {
    return this.html( `<p>${html}</p>` );
  }

  hr () {
    return this.element('hr');
  }

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

  dl (...children) {
    return this.element('dl', ...children);
  }

  dt (html) {
    return this.element('dt', html);
  }

  dd (html) {
    return this.element('dd', html);
  }

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

  modal (...children) {
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

}
