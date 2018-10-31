'use strict';

import Entity from '../Entity.js';
import SpriteRender from '../components/SpriteRender.js';
import LifetimeLimit from '../components/LifetimeLimit.js';
import LingerHurt from '../components/LingerHurt.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import Vec2 from '../../math/Vec2.js';

export default function createCrystal() {
  let e = new Entity({ name: 'crystal' });
  e.bounds = new BoundingCircle(e.pos, 50);
  e.target = null;

  let _coords = Vec2.create();
  let time = 5;
  let slowdownFactor = 0.5;
  let blue = 'rgb(200, 200, 255, .5)';

  // TODO: fix
  e.setTarget = function(t) {
    this.target = t;
    t.timeScale -= slowdownFactor;
    t.addComponent(new LingerHurt(t, { dmg: 9, lingerTime: time }));
  };




  let spriteRender = new SpriteRender(e, { layerName: 'effect' });
  spriteRender.draw = function(_p3) {
    let sz = e.getRoot().bounds.radius + 10;

    _p3.save();
    _p3.stroke(33, 66, 130);
    _p3.strokeWeight(4);
    _p3.fill(blue);

    _coords.zero(); 
    this.entity.getWorldCoords(_coords);
    
    _p3.translate(_coords.x, _coords.y);
    _p3.rotate(Math.PI / 4);
    _p3.rect(-sz, -sz, sz * 2, sz * 2);

    _p3.restore();
  };
  e.addComponent(spriteRender);

  e.addComponent(new LifetimeLimit(e, {
    limit: time,
    cb: () => {
      e.target.timeScale += slowdownFactor;
    }
  }));

  return e;
}