'use strict';

import EntityFactory from '../EntityFactory.js';

export default class Spawner {
  constructor() {
    console.log('spawner created');
  }

  start() {
    let s = EntityFactory.create('starfish');
    s.pos.x = 550;
    s.pos.y = 150;
    scene.add(s);
    // this.add(s);

    // for (let i = 0; i < 1; ++i) {
    // this.add(EntityFactory.create('mouse'));
  }

  // let b = EntityFactory.create('bee');
  // this.bee = b;
  // this.add(b);
}

// this.timer += dt;
// if (this.timer > 2.5) {
//   this.timer = 0;
//   // this.add(EntityFactory.create('mouse'));
// }