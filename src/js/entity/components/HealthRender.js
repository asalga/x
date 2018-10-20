'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';
import _P3 from '../../P3.js';

export default class HealthRender extends Component {
  constructor(e, cfg) {
    super(e, 'healthrender');
    this.sz = cfg && cfg.sz || 5;

    // TODO: fix, inherit from SpriteRender?
    this.renderable = true;
    this.visible = true;
    this.layer = 1;// cfg && cfg.layer || 0;
    // this.zIndex

    this.sprite = document.createElement('canvas');
    // add a buffer so that the arc doesn't get clipped
    this.sprite.width = (e.bounds.radius + 10) * 2;
    this.sprite.height = (e.bounds.radius + 10) * 2;
    this.spriteCtx = this.sprite.getContext('2d');
    this.p3 = new _P3(this.sprite, this.spriteCtx);

    this.lastHealth = this.entity.health;
    this.dirty = true;
  }

  update(dt) {
    if (this.lastHealth !== this.entity.health.amt) {
      this.dirty = true;
      this.lastHealth = this.entity.health.amt;
    }
  }

  draw(_p3) {
    let e = this.entity;
    let healthPercent = e.health.amt / e.health.max;

    // if (this.dirty) {
      _p3.save();
      // _p3.clearAll();
      _p3.strokeWeight(this.sz);
      _p3.stroke(0, 255, 0);
      // _p3.translate(this.p3.width / 2, this.p3.height / 2);
      // let [x,y] = e.pos;//getWorldCoords();
      _p3.translate(e.pos.x,e.pos.y);
      _p3.arc(0, 0, e.bounds.radius, healthPercent * p3.TAU, 0, false);
      _p3.restore();
      // this.dirty = false;
    // }

    // p3.drawImage(this.sprite, 0, 0);
  }
}