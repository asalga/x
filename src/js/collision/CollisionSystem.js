let _list = [];
let _firstTime = true;
let _checks = 0;

import Vec2 from '../math/Vec2.js';
import EventSystem from '../event/EventSystem.js';

export class CollisionSystem {
  static gatherCollidables() {
    // if no object were added or removed, we can avoid doing this work
    if (_firstTime || scene.entitiesAddedOrRemoved) {
      // console.log('gathering....');

      _firstTime = false;
      _list.length = 0;

      scene.entities.forEach(e => {
        _list.push(e);
      });

      _list = _list.filter(e => {
        if (e.collidable) {
          return e;
        }
      });
    }
  }

  static circleCircleTest(e1, e2) {
    let radTotal = e1.bounds.radius + e2.bounds.radius;
    let dist = Vec2.Sub(e1.pos, e2.pos).length();
    return dist <= radTotal;
  }

  static checkCollisions() {
    _checks = 0;

    let e1, e2;

    for (let i = 0; i < _list.length; ++i) {
      for (let j = i + 1; j < _list.length; ++j) {

        e1 = _list[i];
        e2 = _list[j];

        let type = e1.collidable.type;
        let mask = e2.collidable.mask;

        if ((type & mask) !== 0) {
          // console.log("checking..." , e1.name, e2.name);
          if (CollisionSystem.circleCircleTest(e1, e2)) {
            let e = new EventSystem();
            e.fire({ evtName: 'collision', data: { e1, e2 } });
          }
          _checks++;
        }
      }
    }
    // console.log(_checks);
  }
}