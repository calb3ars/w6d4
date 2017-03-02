const DOMNodeCollection = require("./dom_node_collection.js");

window.$l = arg => {
  if ((arg instanceof String) === true) {
    let nodeList =  document.querySelectorAll(arg);
    return new DOMNodeCollection(nodeList);
  } else if (arg instanceof htmlElement) {
    return new DOMNodeCollection(nodeList);
  }

  return function() {};
};
