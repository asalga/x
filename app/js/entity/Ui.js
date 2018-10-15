'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';

import SpriteRender from '../components/SpriteRender.js';

export default function createUI() {
  let e = new Entity({ name: 'ui' });

  e.pos.x = 400;
  e.pos.y = 0;

  let spriteRender = new SpriteRender(e, { layer: 100 });
  spriteRender.draw = function() {
    debugger;
  }
  e.addComponent(spriteRender);

  // e.on('increasescore')

  return e;
}