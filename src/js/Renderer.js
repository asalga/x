'use strict';

import PriorityQueue from './core/PriorityQueue.js';

let layers = {};
let pq = new PriorityQueue();

export default class Renderer {
  static render() {
    p3.clear();
    // scene.draw(p3);

    // Place entities in their respective layers
    scene.entities.forEach(e => {
      let id = e.layer || 0;

      if (layers[id] === undefined) {
        layers[id] = [];
      }

      layers[id].push(e);
    });

    //
    Object.values(layers).forEach(layer => {

      layer.forEach(e => {

        // SELF
        e.components.forEach(c => {
          if (c.renderable && c.visible) {
            pq.enqueue(c, c.layer);
          }
        });

        // CHILDREN
        e.children.forEach(e => {
          if (e.components) {
            e.components.forEach(c => {
              if (c.renderable && c.visible) {
                pq.enqueue(c, c.layer);
              }
            });
          }
        });

        while (pq.isEmpty() === false) {
          let c = pq.dequeue();
          c.draw();
          // Debug.add(`${c.name}, ${c.layer}`);
        }
      });
    });
  }

  static preRender() {}
  static postRender() {
    Object.keys(layers).forEach(layer => {
      layers[layer].length = 0;
    });

    pq.clear();
  }
}