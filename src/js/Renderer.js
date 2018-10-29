'use strict';

import PriorityQueue from './core/PriorityQueue.js';
import P3 from './P3.js';
import cfg from './cfg.js';

function createLayer() {
  let cvs = document.createElement('canvas');
  [cvs.width, cvs.height] = [cfg.gameWidth, cfg.gameHeight];

  let p3 = new P3(cvs, cvs.getContext('2d', { alpha: true }));
  // p3.imageMode('center');
  // p3.clearColor(25, 80, 10);
  return p3;
}

// Change the order of these tags to change rendering order
let layerConfig = [
  { name: 'background', cfg: { 'clearFrame': false } },
  { name: 'spriteprops', cfg: { 'clearFrame': true } },
  { name: 'sprite', cfg: { 'clearFrame': true } },
  { name: 'bullet', cfg: { 'clearFrame': true } },
  { name: 'effect', cfg: { 'clearFrame': true } },
  { name: 'ui', cfg: { 'clearFrame': true } },
  { name: 'debug', cfg: { 'clearFrame': true } }
];

let layerMap = new Map();
let layers = [];

layerConfig.forEach(obj => {
  let layer = {
    'p3': createLayer(),
    'cfg': obj.cfg,
    renderables: new PriorityQueue()
  };

  layers.push(layer);
  layerMap.set(obj.name, layer);
});


export default class Renderer {

  static render() {

    // TODO: remove?
    p3.clear();

    // Place entities in their respective layers
    scene.entities.forEach(e => {

      if (e.visible === false || e.opacity === 0) { return; }

      // CHILDREN
      e.children.forEach(e => {

        //  e.opacity = rootOpacity;
        if (e.components) {
          e.components.forEach(c => {

            //  c.opacity = rootOpacity;
            if (c.renderable && c.visible) {
              let layer = layerMap.get(c.layerName);
              // Layer may not exist if we are debugging
              layer && layer.renderables.enqueue(c, c.zIndex);
            }
          });
        }
      });

      // COMPONENTS
      e.components.forEach(c => {
        if (c.renderable && c.visible) { // && c.opacity > 0
          // c.opacity = rootOpacity;
          let layer = layerMap.get(c.layerName);
          layer && layer.renderables.enqueue(c, c.zIndex);
        }
      });

    });


    // Draw the entities onto their layers
    layers.forEach(_layer => {
      let _p3 = _layer.p3;

      if (_layer.cfg.clearFrame) { _p3.clearAll(); }

      let q = _layer.renderables;
      while (q.isEmpty() === false) {
        let c = q.dequeue();
        c.draw(_p3);
      }
    });

    // Draw all the layers onto the main canvas
    layers.forEach(layer => p3.drawImage(layer.p3.cvs, 0, 0));
  }

  static preRender() {}
  static postRender() {}
}