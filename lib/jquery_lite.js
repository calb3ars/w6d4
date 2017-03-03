/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$l = arg => {
  if ((arg instanceof String) === true) {
    let nodeList =  document.querySelectorAll(arg);
    return new DOMNodeCollection(nodeList);
  } else if (arg instanceof htmlElement) {
    return new DOMNodeCollection(nodeList);
  }

  return function() {};
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);