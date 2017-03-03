class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes; // array of nodes
  }

  each(cb) {
    this.nodes.forEach(cb);
  }

  html(html) {
    if (typeof html === "string") {
      this.each((node) => {
        node.innerHTML = html;
      });
    } else {
      if (this.nodes.length > 0) {
        return this.nodes[0].innerHTML;
      }
    }
  }

  empty() {
    node.html('');
  }

  append(children) {
    if (this.nodes.length === 0) { return; }

    if (typeof children === "object" &&
    !(children instanceof DOMNodeCollection)) {
      children = $l(children);
    }

    if (typeof children === 'string') {
      this.each(node => {
        node.innerHTML += children;
      });
    } else if (children instanceof DOMNodeCollection) {
      this.each( node => {
        children.each(childNode => {
          node.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }

  remove() {
    this.each(node => node.parentNode.removeChild(node));
  }

  attr(key, value) {
    if (typeof val === "string") {
      this.each( node => {
        node.setAttribute(key, value);
      });
    } else {
      return this.nodes[0].getAttribute(key);
    }
  }

  addClass(newClass) {
    this.each( node => {
      node.classList.add(newClass);
    });
  }

  removeClass(oldClass) {
    this.each( node => {
      node.classList.remove(oldClass);
    });
  }

  toggleClass(toggleClass) {
    this.each( node => {
      node.classList.toggle(toggleClass);
    });
  }

  children() {
    let childNodes = [];
    this.each( node => {
      let currentNodeChildren = node.children;
      childNodes = childNodes.concat(Array.from(currentNodeChildren));
    });

    return new DOMNodeCollection(childNodes);
  }

  parent() {
    let parentNodes = [];
    this.each( parentNode => {
      parentNode.visited ? parentNodes.push(parentNode) : parentNode.visited = true;
    });

    parentNodes.forEach( parentNode => parentNode.visited = false );
    return new DOMNodeCollection(parentNodes);
  }

  find(selector) {
    let foundNodes = [];
    this.each( node => {
      const nodeList = node.querySelectorAll(selector);
      foundNodes = foundNodes.concat(Array.from(nodeList));
    });

    return new DOMNodeCollection(foundNodes);
  }

  // Event Handler Binding
  on(eventName, callback) {
    this.each( node => {
      node.addEventListener(eventName, callback);
      const eventKey = `jqliteEvents-${eventName}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  }

  off(eventName) {
    this.each( node => {
      const eventKey = `jqliteEvents-${eventName}`;
      if (node[eventKey]) {
        node[eventKey].forEach( callback => {
          node.removeEventListener(eventName, callback);
        });
      }
      node[eventKey] = [];
    });
  }
} // end of DOMNodeCollection Class

module.exports = DOMNodeCollection;
