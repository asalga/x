'use strict';

import Utils from '../Utils.js';

let strings = [];
let isOn = true;

export default class Debug {
  
  static init() {
    document.addEventListener('keydown', function(evt) {
      if (evt.code === 'KeyD') {
        window.debug = !window.debug;
        Debug.setOn(window.debug);
      }
    });
  }
  
  static add(str) {
    if (!isOn) {
      return;
    }
    strings.push(str);
  }

  static setOn(v) {
    isOn = v;
  }

  static draw() {
    if (!isOn) {
      return;
    }

    p3.save();
    p3.noStroke();
    p3.fill(255);
    let y = 20;
    let ySpacing = 18;

    strings.forEach(s => {
      p3.text(s, 10, y);
      y += ySpacing;
    });
    p3.restore();
  }

  static postRender() {
    if (!isOn) {
      return;
    }
    Utils.clearArray(strings);
  }
}