'use strict';

import Entity from '../../Entity.js';
import EntityFactory from '../../EntityFactory.js';
import Vec2 from '../../../math/Vec2.js';
import Utils from '../../../Utils.js';

import SpriteRender from '../../components/SpriteRender.js';

/*
  1) Image should be sent to Emitter
  2) Emitter is given max size
  3) Particle are added to the scene

  x) test re-creating the path buffer per frame
  x) layer particle system canvas
  x) Recycle the smoke emitter entity
  x) Run performance test
*/

/*
  On Emitter death:
  - When entity dies, it tells children
  - Emitter gets notice of root death 
    - it calls it's own stop()
    - tells children to manage themselves
*/
export default function createEmitter() {
  let e = new Entity({ name: 'emitter' });

  let params = {
    rate: 1,
    particle: 'null',
    ageRange: [1, 1]
  };
  let timer = 0;
  let particles = [];
  let isDead = false;
  let Count = 1;

  let _pos = [];
  let _alive = [];
  let _age = [];
  let _maxAge = [];

  for (let i = 0; i < Count; ++i) {
    _pos.push(new Vec2());
    _alive.push(false);
    _age.push(0);
    _maxAge.push(0);
  }

  // let allParticlesDead = function() {
  //   debugger;
  //   // is relying on visibility the right thing to do?
  //   let cnt = particles.filter(p => p.visible);
  //   return cnt > 0;
  // }

  let w = 640;
  let h = 480;
  let spriteRender = new SpriteRender(e, { width: w, height: h, layer: 20 });
  spriteRender.draw = function() {
    let sz = 14;

    this.p3.clearAll();
    for (let i = 0; i < Count; i++) {
      if (_alive[i] === false) {
        continue;
      }
      this.p3.fill('rgb(25, 25, 25, 0.13)');
      this.p3.ellipse(_pos[i].x, _pos[i].y, sz, sz);
    }
    // TODO: fix
    p3.drawImage(this.sprite, this.p3.width / 2, this.p3.height / 2);
  }
  spriteRender.renderAtRoot = true;
  e.addComponent(spriteRender);

  // A bit strange here. We need the parent before we can add the event listener
  e.on('childaddedtoparent', data => {
    let child = data.child;

    data.parent.on('remove', data => {
      child.stop();
    }, e, {
      onlyOnce: function(d) {
        return [d.parent, d.child];
      }
    });
  });






  e.createParticle = function(idx) {
    _alive[idx] = true;
    _age[idx] = 0;
    _maxAge[idx] = p3.random(params.ageRange[0], params.ageRange[1]);
    _pos[idx] = this.getWorldCoords().clone();
  }

  e.killParticle = function(idx) {
    _alive[idx] = false;
  }

  let findFreeParticle = function() {
    for (let i = 0; i < Count; ++i) {
      if (_alive[i] === false) {
        return i;
      }
    }
    return -1;
  };





  e.update = function(dt) {
    timer += dt;

    for (let i = 0; i < Count; ++i) {
      if (_alive[i]) {
        _age[i] += dt;
        if (_age[i] > _maxAge[i]) {
          this.killParticle(i);
        }
      }
    }

    if (this.isDead) { return; }

    // if (timer > params.rate) {
    if (timer > .5) {
      timer = 0;

      let idx = findFreeParticle();
      if (idx > -1) {
        this.createParticle(idx);
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
  }

  e.play = function() {
    console.log('emitter play');
  }

  e.stop = function() {
    console.log('emitter stop');
    this.detachFromParent();
    this.isDead = true;
  }

  return e;
}