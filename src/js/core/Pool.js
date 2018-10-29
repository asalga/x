'use strict';

import Vec2 from '../math/Vec2.js';

/*
	Req.
	 - Must be extendible
	 If we create a new Object type, we should be able to integrate Pool easily

	 - Must be Testable
	 We need to be able to toggle the pool to see if we are getting any of its benefits

	- Should be fast
	Acquiring a new object type should run at O(1) or O(log N)
*/

let pools = {};
let available = 0;

export default class Pool {

  static init() {
    Pool.allocate({ name: 'vec2', type: Vec2, count: 100, growth: 0 });
  }
  
  static count(){
  	return available;
  }

  static allocate(cfg) {
    let n = cfg.name;

	available = cfg.count;

    pools[n] = new Array(cfg.count);
    let newPool = pools[n];

    for (let i = 0; i < cfg.count; i++) {
      newPool[i] = new cfg.type;
      newPool[i].available = true;
      newPool[i].poolIdx = i;
    }
  }

  static free(n, obj){
  	pools[n][obj.poolIdx].available = true;
  	available++;
  }

  static get(n) {
    let pool = pools[n];

    for (let i = 0; i < pool.length; ++i) {
      if (pool[i].available) {
      	available--;

        let obj = pool[i];
        obj.available = false;
        obj.reset();
        // console.log(i);
        return obj;
      }
    }

    console.error('no free objects available!');
    debugger;
  }
}