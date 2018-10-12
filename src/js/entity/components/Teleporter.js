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

    let noObj = {};
    let positionId = 0;
    let nextPos = new Vec2();

    let setNextPos = function() {
      positionId++;
      if (positionId === 4) {
        positionId = 0;
      }

      let minX = 80;
      let maxX = p3.width - 80;
      let minY = 80;
      let maxY = p3.height - 80;

      switch (positionId) {
        case 0:nextPos.set(minX, minY);break;
        case 1:nextPos.set(maxX, minY);break;
        case 2:nextPos.set(maxX, maxY);break;
        case 3:nextPos.set(minX, maxY);break;
        default:break;
      }
    }
    setNextPos();

    this.entity.pos.set(nextPos);
    let fadeTime = .4;
    let tl = new TimelineMax();
    let obj = new Vec2();
    this.opacity = {v:1};

    let that = this;
    let nextSequence = function() {
      setNextPos();

      tl.to({}, 1, {}) // IDLE
        .to(that.opacity, fadeTime, { // FADE OUT
          v: 0.1,
          data: that.entity,

          onCompleteScope: that,
          onComplete: function() {
            this.entity.collidable.enabled = false;
          },
          onUpdate: function(){
            let value = this.target.v;
// console.log(value);
// debugger;
            let root = this.data.getRoot();
            
            root.opacity = value;
            // root.setPropertyRecursive('opacity', value);
          },
        })
        .to(that.entity.pos, 1, nextPos) // MOVE
        .to(that.opacity, fadeTime, {// FADE IN
          v: 1,
          delay: .5,
          data: that.entity,

          // onUpdateScope: that,
          onUpdate: function(){
            let value = this.target.v;

            let root = this.data.getRoot();

            // Debug.add('----->' +  value);
            root.opacity =value;
            // root.setPropertyRecursive('opacity', value);
          },
          
          onCompleteScope: that,
          onComplete: function() {
            this.entity.collidable.enabled = true;
            nextSequence();
          }
        });
    };

    nextSequence();
  }

  update(dt, entity) {
    Debug.add('----->' +  this.opacity.v);
  }
}
