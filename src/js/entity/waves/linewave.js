'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';
import Utils from '../../Utils.js';
import Vec2 from '../../math/Vec2.js';

export default function createLineWave() {
  let e = new Entity({ name: 'linewave' });
  scene.add(e);

  let params = {
    count: 10,
    dir: 1,
    pos: new Vec2(0, 0),
    entity: 'mouse',
    spacing: 20
  };

  e.setup = function(cfg) {
    Utils.applyProps(params, cfg);
  };

  e.launch = function() {

    for (let i = 0; i < params.count; ++i) {
      let m = EntityFactory.create(params.entity);
      let x = (i * params.dir * params.spacing) + params.pos.x;

      m.pos.set(x, 0);
      scene.add(m);
    }

  };

  return e;
}