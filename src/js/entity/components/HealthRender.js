'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';
import _P3 from '../../P3.js';

export default class HealthRender extends Component {
  constructor(e, cfg) {
    super(e, 'healthrender');
    // TODO: fix, inherit from SpriteRender?
    this.renderable = true;
    this.visible = true;
    this.layer = cfg && cfg.layer || 0;

    this.sprite = document.createElement('canvas');
    // add a buffer  so that the arc doesn't get clipped
    this.sprite.width = (e.bounds.radius + 10) * 2;
    this.sprite.height = (e.bounds.radius + 10) * 2;
    this.spriteCtx = this.sprite.getContext('2d');
    this.p3 = new _P3(this.sprite, this.spriteCtx);
  }

  update(dt) {}

  draw() {
    let e = this.entity;
    let healthPercent = e.health.amt / e.health.max;
    
    this.p3.save();
    this.p3.clearAll();
    this.p3.strokeWeight(5);
    this.p3.stroke(0, 255, 0);
    this.p3.translate(this.p3.width / 2, this.p3.height / 2);
    this.p3.arc(0, 0, e.bounds.radius, healthPercent * p3.TAU, 0, false);
    this.p3.restore();

    p3.drawImage(this.sprite, e.pos.x, e.pos.y);
  }
}