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

  let time = 10;

  e.on('lifetimeexpired', data => {
    data.target.timeScale += 0.75;
  }, e);

  e.setTarget = function(t) {
    this.target = t;
    t.timeScale -= 0.75;
    t.addComponent(new LingerHurt(t, { dmg: 10, lingerTime: time }));
  };

  let [w, h] = [150, 150];
  let spriteRender = new SpriteRender(e, { width: w, height: h, layer: 100 });
  spriteRender.draw = function() {

    let sz = e.getRoot().bounds.radius + 10;
    // p3.fill('rgba(184, 222, 238, .5)');

    this.p3.clearAll();
    // this.p3.clear();
    this.p3.save();
    this.p3.stroke(33, 66, 130);
    this.p3.strokeWeight(4);
    this.p3.noFill();
    // this.p3.fill('rgb(45, 10, 200, .5)');
    this.p3.fill('rgb(200, 200, 255, .5)');
    this.p3.translate(w / 2, h / 2);
    this.p3.rotate(Math.PI / 4);
    this.p3.rect(-sz, -sz, sz * 2, sz * 2);
    this.p3.restore();

    p3.save();
    let worldCoords = this.entity.getWorldCoords();
    p3.translate(worldCoords.x, worldCoords.y);
    p3.drawImage(this.sprite, -w / 2, -h / 2);
    p3.restore();
  }
  e.addComponent(spriteRender);

  e.addComponent(new LifetimeLimit(e, { limit: time }));
  return e;
}