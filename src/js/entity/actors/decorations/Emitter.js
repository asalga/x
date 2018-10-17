'use strict';

import Entity from '../../Entity.js';
import EntityFactory from '../../EntityFactory.js';
import Vec2 from '../../../math/Vec2.js';
import Utils from '../../../Utils.js';

export default function createEmitter() {
  let e = new Entity({ name: 'emitter' });

  let params = {
    rate: 1,
    particle: 'null'
  };
  let timer = 0;
  let particles = [];

  e.updateProxy = function(dt) {
    timer += dt;

    if (timer > params.rate) {
      // timer = 0;

      if (!particles[0]._test) {
        particles[0].spriterender.visible = true;
        particles[0]._test = true;

        let w = this.getWorldCoords();
        particles[0].pos.set(w);
      }
    }


  };

  /*
    ageRange
    positionRange
    velocityRange
    colorRange
    doesFade
  */
  e.setup = function(cfg) {
    Utils.applyProps(params, cfg);

    for (let i = 0; i < 2; i++) {
      let p = EntityFactory.create(params.particle);
      particles.push(p);
      p.spriterender.visible = false;
      scene.add(p);
    }
  }

  return e;
}