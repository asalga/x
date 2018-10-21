'use strict';

import Entity from '../Entity.js';
import SpriteRender from '../components/SpriteRender.js';
import LifetimeLimit from '../components/LifetimeLimit.js';
import LingerHurt from '../components/LingerHurt.js';

import BoundingCircle from '../../collision/BoundingCircle.js';

export default function createCrystal() {
  let e = new Entity({ name: 'crystal' });
  e.bounds = new BoundingCircle(e.pos, 50);
  e.target = null;

  let time = 5;
  let slowdownFactor = 0.5;

  e.setTarget = function(t) {
    this.target = t;
    t.timeScale -= slowdownFactor;
    t.addComponent(new LingerHurt(t, { dmg: 9, lingerTime: time }));
  };

  // let [w, h] = [150, 150];
  // width: w, height: h, 
  let spriteRender = new SpriteRender(e, { layer: 2 });
  spriteRender.draw = function(_p3) {
    let sz = e.getRoot().bounds.radius + 10;
    // this.p3.clearAll();
    // this.p3.clear();
    _p3.save();
    _p3.stroke(33, 66, 130);
    _p3.strokeWeight(4);
    _p3.fill('rgb(200, 200, 255, .5)');
    // _p3.translate(w / 2, h / 2);
    let [x, y] = this.entity.getWorldCoords().toArray();
    // p3.drawImage(this.sprite,x,y);
    _p3.translate(x, y);
    _p3.rotate(Math.PI / 4);
    _p3.rect(-sz, -sz, sz * 2, sz * 2);
    _p3.restore();
  }
  e.addComponent(spriteRender);

  e.addComponent(new LifetimeLimit(e, {
    limit: time,
    cb: function() {
      e.target.timeScale += slowdownFactor;
    }
  }));

  return e;
}