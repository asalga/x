'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';
import Vec2 from '../../math/Vec2.js';

let _temp = Vec2.create();

export default class DistanceCountdown extends Component {
  constructor(e, cfg) {
    super(e, 'distancecountdown');
    this.cfg = cfg;
    this.reset();
  }

  reset() {
    let defaults = {
      arrived: Utils.noop(),
      distance: 100,
      startPos: Vec2.create()
    };
    Utils.applyProps(this, defaults, this.cfg);
  }

  travelled() {
    _temp.zero();
    this.entity.getWorldCoords(_temp);
    return Vec2.sub(this.startPos, _temp).length();
  }

  update(dt) {
    if (this.travelled() > this.distance) {
      this.arrived();
    }
  }
}