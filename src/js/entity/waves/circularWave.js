'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';
import Utils from '../../Utils.js';
import Vec2 from '../../math/Vec2.js';

export default function createCircularWave() {
  let e = new Entity({ name: 'circularwave' });
  scene.add(e);

  let params = {
    count: 8,
    distance: 450,
    entity: 'mouse'
  };

  e.setup = function(cfg) {
    Utils.applyProps(params, cfg);
  };

  e.launch = function() {
    for (let i = 0; i < params.count; ++i) {
      let c = ((Math.PI * 2) / params.count) * i;
      let v = new Vec2(Math.cos(c), Math.sin(c));
      v.mult(params.distance);
      v.add(scene.getUser().pos);
      
      let m = EntityFactory.create(params.entity);
      m.pos.set(v);
      scene.add(m);
    }
  };

  return e;
}