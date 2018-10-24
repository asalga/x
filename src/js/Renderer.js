'use strict';

import PriorityQueue from './core/PriorityQueue.js';
import P3 from './P3.js';
import cfg from './cfg.js';

let pq = new PriorityQueue();

function createLayer() {
  let cvs = document.createElement('canvas');
  [cvs.width, cvs.height] = [cfg.gameWidth, cfg.gameHeight];

  let p3 = new P3(cvs, cvs.getContext('2d', { alpha: true }));
  p3.imageMode('center');
  // p3.clearColor(25, 80, 10);
  return p3;
}

// Change the order of these tags to change rendering order
let layerRenderOrder = [
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

layerRenderOrder.forEach(obj => {

  let layer = {
    'p3': createLayer(),
    'renderables': [],
    'cfg': obj.cfg
  };

  layers.push(layer);
  layerMap.set(obj.name, layer);
})


export default class Renderer {

  static render() {

    // TODO: remove?
    p3.clear();
    // scene.draw(p3);

    // if (window.effects) {
    //   window.effects.getContext('2d').clearRect(0, 0, gameWidth, gameHeight);
    // }

    // Place entities in their respective layers
    scene.entities.forEach(e => {
      if (e.visible === false || e.opacity === 0) { return; }

      // let id = e.layer || 0;

      // if (layers[id] === undefined) {
      // layers[id] = [];
      // }

      // if (e.spriterender && e.spriterender.layer) {
      //   layers[e.spriterender.layer].entities.push(e);
      // }

      e.children.forEach(e => {

        //       e.opacity = rootOpacity;

        if (e.components) {
          e.components.forEach(c => {

            //           c.opacity = rootOpacity;

            if (c.renderable && c.visible) {
              //             pq.enqueue(c, c.layer);

              let layer = layerMap.get(c.layerName);
              // Layer may not exist if we are debugging
              layer && layer.renderables.push(c);
              //if (layer) {
              // layer.renderables.push(c);
              // }
            }
          });
        }
      });


      e.components.forEach(c => {
        if (c.renderable && c.visible) { // && c.opacity > 0
          // c.opacity = rootOpacity;
          // pq.enqueue(c, c.layer);
          // layers[c.layer].renderables.push(c);
          let layer = layerMap.get(c.layerName);
          layer && layer.renderables.push(c);
        }
      });

      // if (e.renderable && e.layer) {
      // layers[e.spriterender.layer].entities.push(e);
      // }

    });



    // Draw the entities onto their layers
    layers.forEach(_layer => {
      let _p3 = _layer.p3;

      if (_layer.cfg.clearFrame) {
        _p3.clearAll();
      }

      let r = _layer.renderables;

      r.forEach(c => {
        c.draw(_p3);
      });
    });


    // Draw the layers onto the main canvas
    layers.forEach(_layer => {
      p3.save();
      // p3.translate(gameWidth / 2, gameHeight / 2);
      p3.drawImage(_layer.p3.cvs, 0, 0);
      // p3.ctx.drawImage(_layer.p3.cvs, 0, 0);
      p3.restore();
    });


    //
    // Object.values(layers).forEach(layer => {

    //   layer.forEach(e => {

    //     let rootOpacity = e.opacity;

    //     // SELF
    //     e.components.forEach(c => {
    //       if (c.renderable && c.visible) { // && c.opacity > 0
    //         c.opacity = rootOpacity;
    //         pq.enqueue(c, c.layer);
    //       }
    //     });

    //     // CHILDREN
    //     e.children.forEach(e => {

    //       e.opacity = rootOpacity;

    //       if (e.components) {
    //         e.components.forEach(c => {

    //           c.opacity = rootOpacity;

    //           if (c.renderable && c.visible) {
    //             pq.enqueue(c, c.layer);
    //           }
    //         });
    //       }
    //     });

    //     while (pq.isEmpty() === false) {
    //       let c = pq.dequeue();

    //       p3.save();
    //       p3.ctx.globalAlpha = c.opacity;
    //       let pos = c.getWorldCoords();

    //       // TOOD: fix
    //       // Emitters are attached to other nodes, but we don't want their transforms.
    //       if (c.renderAtRoot === true) {
    //         p3.translate(0, 0);

    //       } else {
    //         // Apparently we need to floor for perf
    //         p3.translate(Math.floor(pos.x), Math.floor(pos.y));
    //       }

    //       c.draw();
    //       p3.restore();
    //     }
    //   });
    // });

    // TODO: fix
    // p3.save();
    // p3.translate(gameWidth / 2, gameHeight / 2);
    // p3.drawImage(window.effects, 0, 0);
    // p3.restore();
  }

  static preRender() {}

  static postRender() {
    // Object.keys(layers).forEach(layer => {
    //   layers[layer].length = 0;
    // });

    layers.forEach(_layer => {
      _layer.renderables.length = 0;
    });

    pq.clear();
  }
}