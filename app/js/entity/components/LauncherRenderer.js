'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';
import Vec2 from '../../math/Vec2.js';

let gun = new Vec2();
let v = new Vec2();

export default class LauncherRenderer extends Component {
  constructor(e, cfg) {
    super(e, 'launcherrenderer');
    let defaults = {
      color: 'rbg(0,0,0)',
      renderable: true,
      visible: true,
      layer: 2
    }
    Utils.applyProps(this, defaults, cfg);
  }

  update(dt) {}

  draw(_p3) {
    v = this.entity.getWorldCoords();

    gun.set(this.entity.launcher.direction);
    Vec2.multSelf(gun, 60);

    _p3.save();
    _p3.strokeWeight(10);
    _p3.stroke(this.color);
    _p3.translate(gameWidth/2, gameHeight/2);
    // p3.line(v.x, v.y, v.x + gun.x, v.y + gun.y);
    _p3.line(0, 0, gun.x, gun.y);
    _p3.restore();

    // if (debug) {
    //   p3.save();
    //   p3.strokeWeight(2);
    //   p3.stroke(120, 255, 0);
    //   p3.line(0, 0, p3.mouseX - p3.width / 2, p3.mouseY - p3.height / 2);
    //   p3.restore();
    // }
  }
}