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
    // Pool.allocate({})
  }

  static count() {
    return available;
  }

  /*
    cfg
      name {String}
      type {Function}
      count {Number}
      growth {Number}
  */
  static allocate(cfg) {
    let n = cfg.name;

    available = cfg.count;

    pools[n] = new Array(cfg.count);
    let newPool = pools[n];

    for (let i = 0; i < cfg.count; i++) {
      newPool[i] = new cfg.type;

      newPool[i]._pool = {
        available: true,
        idx: i,
        name: cfg.name
      }
    }
  }

  static free(obj) {
    let meta = obj._pool;
    pools[meta.name][meta.idx]._pool.available = true;
    // pools[n][obj.poolIdx].available = true;    
    available++;
  }

  static get(n) {
    let pool = pools[n];

    for (let i = 0; i < pool.length; ++i) {
      if (pool[i]._pool.available) {
        available--;

        let obj = pool[i];
        obj._pool.available = false;
        obj.reset();
        return obj;
      }
    }

    console.error('no free objects available!');
    debugger;
  }
}