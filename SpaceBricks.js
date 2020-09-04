/*
  © 2020 Aran Deltac
  MIT License
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

  html (html, ...children) {
    const fragment = this.dom.createRange().createContextualFragment( html.trim() );
    const element = fragment.firstChild;
    children.forEach( child => element.appendChild(child) );
    return element;
  }

  empty (element) {
    while (element.firstChild) {
      element.firstChild.remove();
    }   
  }

  /* Basic Elements */

  element (tagName, ...children) {
    const element = this.dom.createElement( tagName );
    children.forEach( child => element.appendChild(child) );
    return element;
  }

  div (...children) {
    return this.element( 'div', ...children );
  }

  img (src) {
    const element = this.html( '<img class="img-fluid">' )
    element.setAttribute( 'src', src );
    return element;
  }

  thumbnail (src) {
    const element = this.html( '<img class="img-thumbnail">' )
    element.setAttribute( 'src', src );
    return element;
  }

  /* Typography Elements */

  h1 (html) {
    return this.html( `<h1>${html}</h1>` );
  }

  h2 (html) {
    return this.html( `<h2>${html}</h2>` );
  }

  p (html) {
    return this.html( `<p>${html}</p>` );
  }

  blockquote (quote, cite) {
    const quoteElement = this.html( '<blockquote class="blockquote"></blockquote>' );
    quoteElement.textContent = quote;

    if (cite) {
      const footerElement = this.html( '<footer class="blockquote-footer"></footer>' );
      const citeElement = this.html( `<cite>${cite}</cite>` );
      citeElement.setAttribute( 'title', cite );
      footerElement.appendChild( citeElement );
      quoteElement.appendChild( footerElement );
    }

    return quoteElement;
  }

  code (text) {
    const preElement = this.element( 'pre' );
    const codeElement = this.element( 'code' );
    codeElement.textContent = text;
    preElement.appendChild( codeElement );
    return preElement;
  }

  /* Control Elements */

  button (type, html, callback) {
    const buttonElement = this.html(
      `<button type="button" class="btn">${html}</button>`
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

  input (type, label) {
    const id = this.uid;
    const groupElement = this.html( '<div class="form-group"></div>' );

    const labelElement = this.html( `<label for="${id}"></label>` );
    labelElement.textContent = label;
    groupElement.appendChild( labelElement );

    const inputElement = this.html( `<input class="form-control" id="${id}">` );
    groupElement.appendChild( inputElement );

    return groupElement;    
  }

  /* Container Elements */

  alert (type, ...children) {
    let element = this.html( '<div class="alert" role="alert"></div>' );
    element.classList.add( `alert-${type}` );
    children.forEach( child => element.appendChild(child) );
    element.lastChild.classList.add( 'mb-0' );
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
      const colElement = this.html( `<div class="col-sm-${sm} col-md-${md} col-lg-${lg}"></div>` );
      colElement.appendChild( child );
      rowElement.appendChild( colElement );
    });

    return containerElement;
  }

  modal (options, ...children) {
    const b = this;

    if (b.currentModalID) { throw 'A modal is already open' }
    const id = b.currentModalID = `modal-${b.uid}`

    const modalElement = b.html(`
      <div class="modal fade" id="${id}" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
          </div>
        </div>
      </div>
    `);

    const contentElement = modalElement.querySelector('.modal-content');
    children.forEach( child => contentElement.appendChild(child) );

    if (b.currentModalLabelID) {
      modalElement.setAttribute( 'aria-labelledby', b.currentModalLabelID );
    }

    b.dom.body.appendChild( modalElement );

    const jq = $(`#${id}`);
    jq.modal();
    jq.on( 'hidden.bs.modal', ()=>{
      delete this.currentModalID;
      delete this.currentModalLabelID;
      jq.modal('dispose');
      b.dom.body.removeChild( modalElement );
    });

    // No return as this method actively modifies the document.
  }

  modalHeader (...children) {
    return this.html(`<div class="modal-header"></div>`, ...children);
  }

  modalBody (...children) {
    return this.html(`<div class="modal-body"></div>`, ...children);
  }

  modalFooter (...children) {
    return this.html(`<div class="modal-footer"></div>`, ...children);
  }

  modalTitle (html) {
    const b = this;

    if (b.currentModalLabelID) { throw 'You can only have one modal title' }
    const id = b.currentModalLabelID = `modal-label-${b.uid}`;

    return b.html( `<h5 class="modal-title" id="${id}">${html}</h5>` );
  }      

  modalCloseButton () {
    return this.html(`
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    `);
  }

  closeModal () {
    if (!this.currentModalID) { throw 'There is no modal to close' }
    $(`#${this.currentModalID}`).modal('hide');
  }

}
