var WL;

var utilities = {
  layerjsIsRequired: false
};

utilities.isNodeContext = function() {
  return (typeof global.window === 'undefined');
}

utilities._init = function() {
  if (!this.layerjsIsRequired) {
    require("../../../src/layerjs.js");
    WL = require("../../../src/framework/wl.js");
    this.layerjsIsRequired = true;
  }
}

utilities._beforeAll = function() {

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.getElementById("wl-obj-css");

  if (!style) {
    style = document.createElement("style");
    style.id = "wl-obj-css";
    head.appendChild(style);
  }

  style.innerHTML = "";

  WL.repository.clear();
  WL.executeScriptCode = true;
  //WL.router =
  this.setHtml("");
}

utilities._beforeEachNodeJS = function() {
  var jsdom = require('jsdom').jsdom;
  document = global.document = jsdom("<html><head></head><body></body></html>");
  window = global.window = document.defaultView;
  $ = document.querySelector;
}

utilities._beforeEachBrowser = function() {
  document = global.document;
  window = global.window;
  $ = document.querySelector;
}

utilities.beforeEach = function() {
  if (this.isNodeContext()) {
    this._beforeEachNodeJS();
  } else {
    this._beforeEachBrowser();
  }
  this._init();
  this._beforeAll();
}

utilities.setHtml = function(html) {
  var container = document.getElementById("testContainer");

  if (!container) {
    container = document.createElement("div");
    container.id = "testContainer";
    document.body.appendChild(container);
  }
  container.innerHTML = html;
}

module.exports = utilities;
