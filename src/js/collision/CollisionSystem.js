import Vec2 from '../math/Vec2.js';
import EventSystem from '../event/EventSystem.js';
import Debug from '../debug/Debug.js';

let list = [];
let firstTime = true;
let checks = 0;

export class CollisionSystem {
  static gatherCollidables() {
    
    // if no object were added or removed, we can avoid doing this work
    if (firstTime || scene.entitiesAddedOrRemoved) {
      firstTime = false;
      list.length = 0;

      scene.entities.forEach(e => {
        list.push(e);
      });

      list = list.filter(e => {
        if (e.collidable) {
          return e;
        }
      });
      scene.clearFlags();
    }
  }

  static circleCircleTest(e1, e2) {
    let radTotal = e1.bounds.radius + e2.bounds.radius;
    let dist = Vec2.Sub(e1.pos, e2.pos).length();
    return dist <= radTotal;
  }

  static checkCollisions() {
    checks = 0;

    let e1, e2;

    for (let i = 0; i < list.length; ++i) {
      for (let j = i + 1; j < list.length; ++j) {

        e1 = list[i];
        e2 = list[j];

        let type = e1.collidable.type;
        let mask = e2.collidable.mask;

        if ((type & mask) !== 0) {
          // console.log("checking..." , e1.name, e2.name);
          if (CollisionSystem.circleCircleTest(e1, e2)) {
            let e = new EventSystem();
            e.fire({ evtName: 'collision', data: { e1, e2 } });
          }
          checks++;
        }
      }
    }

    Debug.add(`Collision Checks: ${checks}`);
  }
}