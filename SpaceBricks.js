/*
  © 2020 Aran Deltac
  MIT License
*/

class SpaceBricks {
  constructor (dom) {
    this.dom = dom || window.document;
    $( this.dom ).foundation();
  }

  /* Utility Methods */

  uid () {
      let id = this.nextUID || 0;
      this.nextUID = id + 1;
      return `spacebricks-uid-${id}`;
  }

  find (id) {
    return this.dom.getElementById( id );
  }

  html (html, ...children) {
    const fragment = this.dom.createRange().createContextualFragment( html );
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

  /* Typography Elements */

  h1 (text) {
    const element = this.element( 'h1' );
    element.textContent = text;
    return element;
  }

  h2 (text) {
    const element = this.element( 'h2' );
    element.textContent = text;
    return element;
  }

  p (text) {
    const element = this.element( 'p' );
    element.textContent = text;
    return element;
  }

  divider () {
    return this.element( 'hr' );
  }

  blockquote (quote, cite) {
    const quoteElement = this.element( 'blockquote' );
    quoteElement.textContent = quote;

    if (cite) {
      const citeElement = this.element( 'cite' );
      citeElement.textContent = cite;
      quoteElement.appendChild( citeElement );
    }

    return quoteElement;
  }

  code (text) {
    const element = this.html('<code class="code-block"></code>');
    element.textContent = text;
    return element;
  }

  /* Interactive Elements */

  button (text, callback) {
    const element = this.element( 'button' );
    element.setAttribute( 'type', 'button' );
    element.classList.add( 'button' );
    element.textContent = text;
    element.addEventListener( 'click', callback );
    return element;
  }

  buttonGroup (...buttons) {
    const groupElement = this.div();
    groupElement.classList.add( 'button-group' );

    buttons.forEach( button => {
      groupElement.appendChild( button );
    });

    return groupElement;
  }

  input (type, label) {
    const inputElement = this.element( 'input' );
    inputElement.setAttribute( 'type', type );
    if (!label) { return inputElement }

    const labelElement = this.element( 'label' );
    labelElement.textContent = label;
    labelElement.appendChild( inputElement );

    return labelElement;
  }

  /* Layout Elements */

  spread (...children) {
    const gridElement = this.div();
    gridElement.classList.add( 'grid-x' );

    const largeCols = Math.floor( 12 / children.length ) || 1;
    const mediumCols = largeCols * 2;
    const smallCols = largeCols * 4;

    children.forEach( child => {
      const cellElement = this.div();
      cellElement.classList.add( 'cell' );
      cellElement.classList.add( `small-${smallCols}` );
      cellElement.classList.add( `medium-${mediumCols}` );
      cellElement.classList.add( `large-${largeCols}` );
      cellElement.appendChild( child );
      gridElement.appendChild( cellElement );
    });

    return gridElement;
  }

  tabs (labels, ...children) {
    if (labels.length !== children.length) {
      throw 'The number of labels and children must be equal';
    }

    // Create our top bar of tabs.
    let tabsElement = this.element( 'ul' );
    tabsElement.classList.add( 'tabs' );
    tabsElement.setAttribute( 'data-tabs', '' );
    tabsElement.id = this.uid();

    // Create the container that the tab content goes in.
    let tabsContentElement = this.div();
    tabsContentElement.classList.add( 'tabs-content' );
    tabsContentElement.setAttribute( 'data-tabs-content', tabsElement.id );

    // Now add a tab for reach child, and put the child into the container.
    children.forEach( child => {
      const id = this.uid();
      
      // The tab.
      const tabElement = this.element( 'li' );
      tabElement.classList.add( 'tabs-title' );
      const linkElement = this.element( 'a' );
      linkElement.setAttribute( 'href', `#${id}` );
      linkElement.textContent = labels.shift();
      tabElement.appendChild( linkElement );
      tabsElement.appendChild( tabElement );
      
      // The tab content.
      const contentElement = this.div();
      contentElement.classList.add( 'tabs-panel' );
      contentElement.id = id;
      contentElement.appendChild( child );
      tabsContentElement.appendChild( contentElement );
    });

    // Select the first tab.
    tabsElement.firstChild.classList.add( 'is-active' );
    tabsElement.firstChild.firstChild.setAttribute( 'aria-selected', 'true')
    tabsContentElement.firstChild.classList.add( 'is-active' );

    // Sew it all together.
    let element = this.div(
      tabsElement,
      tabsContentElement,
    );

    return element;
  }

}
