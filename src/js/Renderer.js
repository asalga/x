'use strict';

import PriorityQueue from './core/PriorityQueue.js';

let layers = {};
let pq = new PriorityQueue();

export default class Renderer {
  static render() {
    p3.clear();
    // scene.draw(p3);

    
    if(window.effects){
      window.effects.getContext('2d').clearRect(0, 0, gameWidth, gameHeight);
    }


    // Place entities in their respective layers
    scene.entities.forEach(e => {

      // TODO: write this
      // if(CollisionSystem.intersects(gameBounds, e.bounds))

      if (e.visible === false || e.opacity === 0) {
        return;
      }

      let id = e.layer || 0;

      if (layers[id] === undefined) {
        layers[id] = [];
      }

      layers[id].push(e);
    });



    //
    Object.values(layers).forEach(layer => {

      layer.forEach(e => {

        let rootOpacity = e.opacity;

        // SELF
        e.components.forEach(c => {
          if (c.renderable && c.visible) { // && c.opacity > 0
            c.opacity = rootOpacity;
            pq.enqueue(c, c.layer);
          }
        });

        // CHILDREN
        e.children.forEach(e => {

          e.opacity = rootOpacity;

          if (e.components) {
            e.components.forEach(c => {

              c.opacity = rootOpacity;

              if (c.renderable && c.visible) {
                pq.enqueue(c, c.layer);
              }
            });
          }
        });

        while (pq.isEmpty() === false) {
          let c = pq.dequeue();

          p3.save();
          p3.ctx.globalAlpha = c.opacity;
          let pos = c.getWorldCoords();

          // if(Math.floor(pos.x) !== pos.x){
          // console.warn('position coords are not floors. Perf may suffer');
          // }


          // TOOD: fix
          // Emitters are attached to other nodes, but we don't want
          // their transforms.
          if (c.renderAtRoot === true) {
            p3.translate(0, 0);

          } else {
            p3.translate(pos.x, pos.y);
          }
          // console.log(c.parent.name);

          c.draw();
          p3.restore();
        }
      });
    });


    p3.save();
    p3.translate(640/2, 480/2);

    p3.drawImage(window.effects, 0, 0);
    p3.restore();

  }

  static preRender() {}
  static postRender() {
    Object.keys(layers).forEach(layer => {
      layers[layer].length = 0;
    });

    pq.clear();
  }
}