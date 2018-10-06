'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';

export default class Flash extends Component {
  constructor(e, cfg) {
    super(e, 'flash');
    let defaults = {
      timer: 0,
      layer: 0,
      renderable: true,
      visible: true,
      speed: 1
    };
    Utils.applyProps(this, defaults);
    Utils.applyProps(this, cfg);
  }

  draw() {
    let amt = (Math.sin(this.timer * Math.PI * this.speed) + 1) * 255;
    this.entity.spriterender.spriteCtx.filter = `brightness(${amt})`;
  }

  update(dt) {
    this.timer += dt;
  }
}