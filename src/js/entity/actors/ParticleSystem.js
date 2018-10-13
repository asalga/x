'use strict';

import Entity from '../Entity.js';
import SpriteRender from '../components/SpriteRender.js';

export default function createParticleSystem() {
  let e = new Entity({ name: 'particlesystem', layer: 10 });

  // ?
  // scene.add(e);

  let spriteRender = new SpriteRender(e, { layer: 100 });
  spriteRender.draw = function() {
    p3.save();
    p3.strokeWeight(2);
    p3.stroke(20);
    p3.fill(120);
    p3.ellipse(0, 0, 4, 4);
    p3.restore();
  }
  e.addComponent(spriteRender);

  return e;
}