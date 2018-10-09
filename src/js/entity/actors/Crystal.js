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

  let [w, h] = [150, 150];
  let spriteRender = new SpriteRender(e, { width: w, height: h, layer: 100 });
  spriteRender.draw = function() {
    let sz = e.getRoot().bounds.radius + 10;

    this.p3.clearAll();
    // this.p3.clear();
    this.p3.save();
    this.p3.stroke(33, 66, 130);
    this.p3.strokeWeight(4);
    this.p3.fill('rgb(200, 200, 255, .5)');
    this.p3.translate(w / 2, h / 2);
    this.p3.rotate(Math.PI / 4);
    this.p3.rect(-sz, -sz, sz * 2, sz * 2);
    this.p3.restore();

    let [x,y] = this.entity.getWorldCoords().toArray();
    p3.drawImage(this.sprite,x,y);
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