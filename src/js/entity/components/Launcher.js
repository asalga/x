'use strict';

import Component from './Component.js';
import Vec2 from '../../math/Vec2.js';

export default class Launcher extends Component {
  constructor(e, cfg) {
    super(e, 'launcher');

    // this.props = cfg 
    this.rate = cfg.rate;
    this.ammo = cfg.ammo;
    this.color = cfg.color;

    this.direction = new Vec2();

    this.on('GAME_CLICK', this.fire, this);

    this.getVecToCursor = function() {
      let center = window.UserPos;
      // let center = new Vec2(p3.width / 2, p3.height / 2.);
      let cur = new Vec2(p3.mouseX, p3.mouseY);
      cur = Vec2.sub(cur, center);
      return cur.normalize().mult(60);
    }
  }

  fire() {
    if (this.ammo <= 0) {
      return;
    }
    this.ammo--;

    let bullet = this.createFunc();

    // TODO: write: .getWorldCoords();
    let gunTip = this.getVecToCursor();
    gunTip.add(p3.width / 2, p3.height / 2);
    bullet.pos.set(gunTip);

    let dir = gunTip.sub(UserPos).normalize();
    bullet.setDir(dir);
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

  update(dt) {

  }
}