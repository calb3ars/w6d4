const DOMNodeCollection = require("./dom_node_collection.js");

window.$l = arg => {
  let functionQueue = [];
  if (arg instanceof String) {
    let nodeList =  document.querySelectorAll(arg);
    return new DOMNodeCollection(nodeList);
  } else if (arg instanceof htmlElement) {
    return new DOMNodeCollection(nodeList);
  } else if (arg instanceof Function) {
    let domReady = function(callback) {
      if (document.readyState === "interactive" ||
      document.readyState === "complete") {
        return callback();
      } else {
        functionQueue.push(callback);
        document.addEventListener("DOMContentLoaded",
          functionQueue.forEach( function => {
            function();
          });
        );
      }
    }
  }

  return function() {};
};
