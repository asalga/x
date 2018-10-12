'use strict';

import Component from './Component.js';
import Collision from '../../collision/Collision.js';
import Debug from '../../debug/Debug.js';
import Utils from '../../Utils.js';
import Timer from '../../core/Timer.js';
import Vec2 from '../../math/Vec2.js';

/*
  The teleporter behaviour is added to a teleporter entity.
  
  Once setup is called, this component will walk up the scenegrpah
  to get the reference to the root entity which it will then control
*/

export default class Teleporter extends Component {
  constructor(e, cfg) {
    super(e, 'teleporter');
    let defaults = {
      // speed: 1,
      fadeTime: 0.5,
      moveTime: 4,
      idleTime: 0.2,
      minOpacity: 0.02
    };
    Utils.applyProps(this, defaults, cfg);

    this.root = null;
    this.tl = new TimelineMax();

    // If the associated entity dies, we need to update the state
    // of the root entity
    this.entity.killable.onDeath = function() {
      this.tl.kill();
      // TODO: fix, we shouldn't need to call this.
      this.entity.removeSelf();

      let tl2 = new TimelineMax();
      tl2.to(this.root, this.fadeTime, {
        opacity: 1,
        data: this.root,
      });

      this.root.collidable.enabled = true;
    }.bind(this);
  }

  setup(e) {
    this.root = e.getRoot();

    const minX = 100;
    const maxX = p3.width - 100;
    const minY = 100;
    const maxY = p3.height - 100;

    let waypoints = [
      new Vec2(minX, minY),
      new Vec2(maxX, minY),
      new Vec2(maxX, maxY),
      new Vec2(minX, maxY)
    ];

    let currWaypoint = 0;
    let setNextWaypoint = function() {
      currWaypoint++;
      if (currWaypoint > waypoints.length - 1) {
        currWaypoint = 0;
      }
    }

    this.root.pos.set(waypoints[currWaypoint]);
    let that = this;

    let nextSequence = function() {
      setNextWaypoint();

      let setCollisions = function(b) {
        that.entity.collidable.enabled = b;
        that.root.collidable.enabled = b;
      };


      that.tl.to({}, that.idleTime, {}) // IDLE
        .to(that.root, that.fadeTime, { // FADE OUT
          opacity: that.minOpacity,
          onCompleteScope: that,
          onComplete: function() {
            setCollisions(false);
          }
        })
        .to(that.root.pos, that.moveTime, waypoints[currWaypoint]) // MOVE
        .to(that.root, that.fadeTime, { // FADE IN
          opacity: 1,
          delay: .5,
          onCompleteScope: that,
          onComplete: function() {
            setCollisions(true);
            nextSequence();
          }
        });
    };
    nextSequence();
  }

  update(dt, entity) {}
}