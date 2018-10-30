'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';
import Vec2 from '../../math/Vec2.js';

let _temp = Vec2.create();

export default class DistanceCountdown extends Component {
  constructor(e, cfg) {
    super(e, 'distancecountdown');
    let defaults = {
      arrived: Utils.noop(),
      distance: 100,
      startPos: new Vec2(0, 0)
    };
    Utils.applyProps(this, defaults, cfg);
  }

  travelled() {
    _temp.zero();
    this.entity.getWorldCoords(_temp);
    let test = Vec2.sub(this.startPos, _temp).length();
    return test;
  }

  update(dt) {
    if (this.travelled() > this.distance) {
      this.arrived();
    }
  }
}