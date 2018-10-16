'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';
import Utils from '../../Utils.js';
import Vec2 from '../../math/Vec2.js';

export default function createCircularWave() {
  let e = new Entity({ name: 'circularwave' });
  scene.add(e);

  let defaults = {
    count: 8,
    distance: 450,
    entity: 'mouse'
  }

  e.setup = function(cfg) {
    Utils.applyProps(defaults, cfg);
  };

  e.launch = function() {
    console.log('launch', this.defaults);

    for (let i = 0; i < defaults.count; ++i) {
      let m = EntityFactory.create('mouse');

      // let d = defaults.distance;
      let c = ((Math.PI * 2) / defaults.count) * i;
      let v = new Vec2(Math.cos(c), Math.sin(c));
      v.mult(defaults.distance);
      v.add(scene.getUser().pos);
      m.pos.set(v);

      scene.add(m);
    }

    // for (let i = 0; i < 40; ++i) {
    //   let m1 = EntityFactory.create('mouse');
    //   // m1.pos.mult(1.5);
    //   // let m2 = EntityFactory.create('mouse');
    //   // m1.pos.set(150, 250);
    //   // m2.pos.set(130, 250);
    //   this.add(m1);
    //   // this.add(m2);
    // }


  };

  return e;
}