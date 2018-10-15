'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';
import _P3 from '../../P3.js';

export default class SpriteRender extends Component {
  constructor(e, cfg) {
    super(e, 'spriterender');
    this.renderable = true;
    this.visible = true;
    this.opacity = 1;
    this.layer = cfg && cfg.layer || 0;
    Utils.applyProps(this, cfg);

    this.dirty = true;

    this.sprite = document.createElement('canvas');
    this.sprite.width = cfg.width;
    this.sprite.height = cfg.height;
    this.spriteCtx = this.sprite.getContext('2d');
    this.p3 = new _P3(this.sprite, this.spriteCtx);
  }

  // renderProxy(){
  //   console.log('test');
  // }

    draw(){
        
        this.drawProxy();
    }  
}