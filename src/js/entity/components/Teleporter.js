'use strict';

import Component from './Component.js';
import Collision from '../../collision/Collision.js';
import Debug from '../../debug/Debug.js';
import Utils from '../../Utils.js';

import Timer from '../../core/Timer.js';

import Vec2 from '../../math/Vec2.js';

export default class Teleporter extends Component {
  constructor(e, cfg) {
    super(e, 'teleporter');
    let defaults = {
      speed: 1
    };
    Utils.applyProps(this, defaults, cfg);

    this.timer = new Timer({
      countDown: true
    });

    this.entity.pos.set(50, 50);

    this.positionId = 0;


    let t1 = new TimelineMax({ yoyo: true, repeat: 100 });
    t1.to(this.entity.pos, 1, { x: 300 });

  }

  update(dt, entity) {
    this.timer.update(dt);



    // this.timer.onDone.add(function(){

    // 	// start fade out
    // 	console.log(TweenMax);

    // 	// pause 

    // 	// start fade in
    // });

    // if (this.timer.elapsed() > 2) {
    //   let t = this.timer.elapsed();
    //   this.timer.reset();

    //   this.positionId++;
    //   if (this.positionId === 4) {
    //     this.positionId = 0;
    //   }

    //   let minX = 80;
    //   let maxX = p3.width - 80;
    //   let minY = 80;
    //   let maxY = p3.height - 80;

    //   switch (this.positionId) {
    //     case 0:
    //       this.entity.pos.set(minX, minY);
    //       break;
    //     case 1:
    //       this.entity.pos.set(maxX, minY);
    //       break;
    //     case 2:
    //       this.entity.pos.set(maxX, maxY);
    //       break;
    //     case 3:
    //       this.entity.pos.set(minX, maxY);
    //       break;
    //   }
    // }
  }
}