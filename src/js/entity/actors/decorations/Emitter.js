'use strict';

import Entity from '../../Entity.js';
import EntityFactory from '../../EntityFactory.js';
import Vec2 from '../../../math/Vec2.js';
import Utils from '../../../Utils.js';

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
    particle: 'null'
  };
  let timer = 0;
  let particles = [];

  // e.addComponent(new NotifyParentDeath(e, { cfg: func }));

  e.updateProxy = function(dt) {
    timer += dt;

    // if (timer > params.rate) {
    //   // timer = 0;

    //   if (!particles[0]._test) {
    //     particles[0].spriterender.visible = true;
    //     particles[0]._test = true;

    //     let w = this.getWorldCoords();
    //     particles[0].pos.set(w);
    //   }
    // }
  };

  // e.on('childadded', e, function() {
  //   debugger;
  //   console.log('listen to death');
  // }, {
  //   filter: data => {
  //     return data.parent === e.parent;
  //   }
  // });

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

  e.stop = function(){
    debugger;
    // detach from parent and move onto scene root()
    // stop emitting particles
    // give children component
    // Entity.moveNode()
    this.detachFromParent();
  }

  // The emitter needs to know when its parent dies
  // - should create a recursive death() function?
  // - should we allow on() to accept another node?

  // what is more maintainable?
  // what makes more sense?
  // what is more flexible?

  // root.on('death', data => {
  // }, e);

  //
  // root.on('death', data => {}, e, { onlySelf: true });
  // e.on('death', data => {}, e, { onEntity: this.root });
  // or listen to all death events and filter?
  // Use signal?


  e.on('death', data => {
    if (data === e.getRoot()) {
      console.log('death:', data);
      e.stop();
    }
  }, e);

  return e;
}