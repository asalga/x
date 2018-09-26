let _list = [];
let _firstTime = true;
let _checks = 0;



export class CollisionSystem {
  static gatherCollidables() {
    // if no object were added or removed, we can avoid doing this work
    if (_firstTime || scene.entitiesAddedOrRemoved) {
      console.log('gathering....');

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
          // console.log("type & mask:", type & mask);
          // console.log("checking..." , e1.name, e2.name);
          _checks++;
          // continue;
        }
      }
    }
    console.log(_checks);
  }
}