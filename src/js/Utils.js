'use strict';

export default class Utils {
  static getEl(selector) {
    return document.getElementById(selector);
  }
  static noop() {}

  static applyProps(ctx, obj) {
    Object.keys(obj).forEach(k => {
      if (ctx[k]) {
        console.log(`${ctx[k]} already exists. Overwriting`);
      }
      ctx[k] = obj[k];
    });
  }

  // this is shit
  static removeFromArray(arr, el) {
    let idx = -1;
    for (let i = arr.length - 1; i > -1; --i) {
      if (el === arr[i]) {
        idx = i;
        break;
      }
    }

    if (idx === -1) {
      return false;
    }

    arr.splice(idx, 1);
    return true;
  }
}