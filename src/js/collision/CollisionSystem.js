import Vec2 from '../math/Vec2.js';
import Event from '../event/Event.js';
import Debug from '../debug/Debug.js';

let list = [];
let firstTime = true;
let checks = 0;

export default class CollisionSystem {
  static gatherCollidables() {

    // if no object were added or removed, we can avoid doing this work
    if (firstTime || scene.entitiesAddedOrRemoved) {
      firstTime = false;
      list.length = 0;

      scene.entities.forEach(e => {

        e._collisionTransform = e.getWorldCoords();

        // root        
        list.push(e);

        e.children.forEach( ch => {
          if(ch.collidable){
            ch._collisionTransform = ch.getWorldCoords();
            list.push(ch);
          }
        });
      });

      // shouldn't this be done sooner?
      list = list.filter(e => e.collidable);
      scene.clearFlags();
    }
  }

  static circleCircleTest(e1, e2) {
    let radTotal = e1.bounds.radius + e2.bounds.radius;
    let dist = Vec2.sub(e1._collisionTransform, e2._collisionTransform).length();
    return dist <= radTotal;
  }

  static checkCollisions() {
    checks = 0;

    let e1, e2;

    for (let i = 0; i < list.length; ++i) {
      for (let j = i + 1; j < list.length; ++j) {

        e1 = list[i];
        e2 = list[j];

        if (e1.collidable.enabled === false || e2.collidable.enabled === false) {
          continue;
        }

        let typeA = e1.collidable.type;
        let maskB = e2.collidable.mask;

        let maskA = e1.collidable.mask;
        let typeB = e2.collidable.type;


        if ((typeA & maskB) !== 0 && (typeB & maskA) !== 0) {
          if (CollisionSystem.circleCircleTest(e1, e2)) {

            let e = new Event({
              evtName: 'collision',
              data: { self: e1, other: e2 }
            });
            e.fire();

          }
          checks++;
        }
      }
    }

    Debug.add(`Collision Checks: ${checks}`);
  }
}