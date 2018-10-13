'use strict';

import Entity from '../Entity.js';
// import EntityFactory from '../EntityFactory.js';

import Killable from '../components/Killable.js';
import Health from '../components/Health.js';
import HealthRender from '../components/HealthRender.js';
import Collidable from '../components/Collidable.js';
import SpriteRender from '../components/SpriteRender.js';
import Teleporter from '../components/Teleporter.js';

import BoundingCircle from '../../collision/BoundingCircle.js';
import CType from '../../collision/CollisionType.js';

export default function createTeleporter() {
  let e = new Entity({ name: 'teleporter' });
  e.bounds = new BoundingCircle(e.pos, 20);

  e.pos.x = -60;
  e.pos.y = -60;

  e.setup = function(entity) {
    e.addComponent(new Teleporter(e, {}));
    e.teleporter.setup(entity);
  };

  let spriteRender = new SpriteRender(e, { layer: 100 });
  spriteRender.draw = function() {
    p3.save();
    p3.noStroke();
    // p3.translate(e.pos.x, e.pos.y);
    p3.fill(64, 202, 238);
    p3.ellipse(0, 0, e.bounds.radius, e.bounds.radius);
    p3.restore();
  }
  e.addComponent(spriteRender);

  // force the user to add the Teleporter it via setup()
  e.addComponent(new Killable(e));
  e.addComponent(new Health(e, { amt: 120 }));
  e.addComponent(new HealthRender(e));
  e.addComponent(new Collidable(e, {
    type: CType.ENEMY,
    mask:
      // CType.PLAYER | 
      CType.PLAYER_BULLET
  }));

  return e;
}