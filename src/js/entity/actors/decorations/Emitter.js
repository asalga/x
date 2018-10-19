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

  e.layer = 100;

  // defaults
  let params = {
    rate: 1,
    particle: 'null',
    ageRange: [1, 1],
    sizeRange: [10, 10],
    opacityRange: [1, 1]
  };
  let timer = 0;
  let particles = [];
  let isDead = false;
  let Count = 11;
  let rate = 1;


  let _alive = [];

  let _pos = [];
  let _vel = [];

  let _age = [];
  let _maxAge = [];

  let _size = [];
  let _opacity = [];

  for (let i = 0; i < Count; ++i) {
    _alive.push(false);

    _pos.push(new Vec2());
    _vel.push(new Vec2());

    _age.push(0);
    _maxAge.push(0);

    _size.push(0);
    _opacity.push(0);
  }

  let w = 640;
  let h = 480;
  let spriteRender = new SpriteRender(e, { width: w, height: h, layer: 400, opacity: 0.99 });
  spriteRender.draw = function() {

    this.p3.clearAll();
    for (let i = 0; i < Count; i++) {
      if (_alive[i] === false) {
        continue;
      }
      let sz = _size[i];
      let op = _opacity[i];

      this.p3.stroke(`rgb(25, 25, 25, ${op})`);
      this.p3.fill(`rgb(25, 25, 25, ${op})`);
      this.p3.ellipse(_pos[i].x, _pos[i].y, sz, sz);
    }
    // TODO: fix
    p3.drawImage(this.sprite, this.p3.width / 2, this.p3.height / 2);
  }
  spriteRender.renderAtRoot = true;
  e.addComponent(spriteRender);

  // A bit strange here. We need the parent before we can add the event listener
  // e.on('childaddedtoparent', data => {
  //   let child = data.child;

  //   data.parent.on('remove', data => {
  //     child.stop();
  //   }, e, {
  //     onlyOnce: function(d) {
  //       return [d.parent, d.child];
  //     }
  //   });
  // });



  e.on('remove', data => {
    if (data === e.virtualParent) {
      e.isDead = true;

    }
  }, e);


  e.createParticle = function(idx) {
    _alive[idx] = true;

    _age[idx] = 0;
    _maxAge[idx] = p3.random(params.ageRange[0], params.ageRange[1]);

    _pos[idx] = this.virtualParent.getWorldCoords().clone();
    // vel

    _size[idx] = p3.random(params.sizeRange[0], params.sizeRange[1]);
    _opacity[idx] = p3.random(params.opacityRange[0], params.opacityRange[1]);
  }

  e.killParticle = function(idx) {
    _alive[idx] = false;
  }

  e.allParticlesDead = function() {
    let particlesAlive = _alive.filter(p => p);
    return particlesAlive.length === 0;
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
        _opacity[i] = 1 - (_age[i] / _maxAge[i]);
        _size[i] += dt * (_age[i] / _maxAge[i]) * 80;

        if (_age[i] > _maxAge[i]) {
          this.killParticle(i);
        }
      }
    }

    if (this.isDead) {
      if (this.allParticlesDead()) {
        this.removeSelf();
      }
      return;
    }

    if (timer > rate) {
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
    rate = 1 / params.rate;
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