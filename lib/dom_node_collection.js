class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(innerHTML) {
    if (innerHTML typeof String) {
      this.nodes.forEach((node) => {
        node.innerHTML = innerHTML;
      })
    } else {
      if (this.nodes.length > 0) {
        return this.nodes[0].innerHTML;
      }
    }
  }

  empty() {
    this.nodes.forEach(node => {
      node.innerHTML = "";
    })
  }

  append(children) {
    if(this.nodes.length === 0) { return; }

    if(typeof children === 'string') {
      this.nodes.forEach(el => {
        this.node.innerHTML += children;
      })
    } else if (typeof children === DOMNodeCollection) {
      this.each( node => {
        children.each(childNode => {
          node.appendChild(childNode.cloneNode(true))
        });
      })
    }

  }
  
}

module.exports = DOMNodeCollection;
