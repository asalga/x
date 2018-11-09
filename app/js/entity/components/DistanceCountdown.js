'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';
import Vec2 from '../../math/Vec2.js';

let _temp = Vec2.create();
let _startPos = Vec2.create();

export default class DistanceCountdown extends Component {
  constructor(e, cfg) {
    super(e, 'distancecountdown');
    this.cfg = cfg;
    this.reset();
  }

  reset() {
     this.entity.getWorldCoords(_temp);

    let defaults = {
      arrived: Utils.noop(),
      distance: 100,
      startPos: _startPos
    };
    Utils.applyProps(this, defaults, this.cfg);
  }

  travelled() {
    _temp.zero();
    this.entity.getWorldCoords(_temp);
    return Vec2.sub(_startPos, _temp).length();
  }

  update(dt) {
    if (this.travelled() > this.distance) {
      this.arrived();
    }
  }
}