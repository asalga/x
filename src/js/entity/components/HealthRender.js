'use strict';

import Component from './Component.js';

export default class HealthRender extends Component {
  constructor(e) {
    super(e, 'healthrender');
    this.renderable = true;
    this.layer = 10;
  }

  update(dt) {}

  draw() {
    let e = this.entity;

    let healthPercent = e.health.health / e.health.max;

    let world = e.getWorldCoords();

    p3.save();
    p3.translate(world.x, world.y);
    p3.strokeWeight(3);
    p3.stroke(0, 255, 0);
    p3.arc(0, 0, e.size, healthPercent * p3.TAU, 0, false);

    p3.restore();
  }
}