'use strict';

import Component from './Component.js';

export default class LauncherRenderer extends Component {
  constructor(e, cfg) {
    super(e, 'launcherrenderer');
    this.color = cfg.color;
  }

  update(dt) {}

  draw() {
    let v = this.entity.launcher.entity.pos;

    let gun = this.entity.launcher.direction.clone().mult(50);
    p3.save();
    p3.strokeWeight(10);
    p3.stroke(this.color);
    p3.line(v.x, v.y, v.x+gun.x, v.y+gun.y);
    p3.restore();

    if (debug) {
      p3.save();
      p3.strokeWeight(2);
      p3.stroke(120, 255, 0);
      p3.line(0, 0, p3.mouseX - p3.width / 2, p3.mouseY - p3.height / 2);
      p3.restore();
    }
  }
}