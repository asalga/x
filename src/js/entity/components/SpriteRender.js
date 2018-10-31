'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';
import _P3 from '../../P3.js';

/*
  We provide a layer to which the component renders to
*/
export default class SpriteRender extends Component {
  constructor(e, cfg) {
    super(e, 'spriterender');
    this.cfg = cfg;
    this.reset();
    
    // this.spriteCtx = this.sprite.getContext('2d');
    // this.p3 = new _P3(this.sprite, this.spriteCtx);

    // this.sprite = null;
    // this.spriteCtx = null;

    // if (cfg.cvs) {
      // this.sprite = cfg.cvs;
    // } else {
      // this.sprite = document.createElement('canvas');
      // this.sprite.width = cfg.width;
      // this.sprite.height = cfg.height;
      // console.log(window.count++);
    // }
  }

  reset(){
    this.renderable = true;
    this.visible = true;
    this.opacity = 1;
    this.layer = this.cfg && this.cfg.layer || 0;
    Utils.applyProps(this, this.cfg);

    this.dirty = true;
    this.sprite = this.cfg.cvs;
  }

  draw() {
    this.drawProxy();
  }
}