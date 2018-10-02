'use strict';

import Component from './Component.js';

export default class UserLauncherRender extends Component {
  constructor(e) {
    super(e, 'UserLauncherRender');
  }

  update(dt) {}

  getVecToCursor() {
    let center = window.UserPos;
    // let center = new Vec2(p3.width / 2, p3.height / 2.);
    let cur = new Vec2(p3.mouseX, p3.mouseY);
    cur = Vec2.sub(cur, center);
    return cur.normalize().mult(60);
  }

  draw() {
    Debug.add(`${this.entity.name} ammo: ${this.ammo}`);

    p3.save();
    let curr = this.getVecToCursor();
    p3.strokeWeight(10);
    p3.stroke(this.color);
    p3.line(0, 0, curr.x, curr.y);

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