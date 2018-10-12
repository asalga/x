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
    let defaults = { speed: 1, fadeTime: 0.5 };
    Utils.applyProps(this, defaults, cfg);

    this.root = null;
    this.tl = new TimelineMax();

    // If the associated entity dies, we need to update the state
    // of the root entity
    this.entity.killable.onDeath = function() {
      this.tl.kill();
      // TODO: fix, we shouldn't need to call this.
      this.entity.removeSelf();

      // root is now vulnerable
      // create a new timeline fading in the opacity?s
      this.root.collidable.enabled = true;
      this.root.opacity = 1;

    }.bind(this);
  }

  setup(e) {
    this.root = e.getRoot();

    const minX = 80;
    const maxX = p3.width - 80;
    const minY = 80;
    const maxY = p3.height - 80;

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

    this.op = { v: 1 };

    let that = this;
    let nextSequence = function() {
      setNextWaypoint();

      that.tl.to({}, 1, {}) // IDLE
        .to(that.op, that.fadeTime, { // FADE OUT
          v: 0.1,
          data: that.root,

          onCompleteScope: that,
          onComplete: function() {
            that.entity.collidable.enabled = false;
            that.root.collidable.enabled = false;
          },
          onUpdate: function() {
            let value = this.target.v;
            let root = this.data.getRoot();
            root.opacity = value;
          },
        })
        .to(that.root.pos, 1, waypoints[currWaypoint]) // MOVE
        .to(that.op, that.fadeTime, { // FADE IN
          v: 1,
          delay: .5,
          data: that.root,

          onUpdate: function() {
            let value = this.target.v;
            let root = this.data.getRoot();
            root.opacity = value;
          },

          onCompleteScope: that,
          onComplete: function() {
            that.root.collidable.enabled = true;
            that.entity.collidable.enabled = true;
            nextSequence();
          }
        });
    };
    nextSequence();
  }

  update(dt, entity) {
    // Debug.add('----->' +  this.opacity.v);
  }
}