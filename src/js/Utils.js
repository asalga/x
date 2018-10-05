'use strict';

export default class Utils {
  static getEl(selector) {
    return document.getElementById(selector);
  }
  static noop() {}

  static applyProps(ctx, obj) {
    Object.keys(obj).forEach(k => {
    	if(ctx[k]){
    		console.log(`${ctx[k]} already exists. Overwriting`);
    	}
    	ctx[k] = obj[k];
    });
  }
}