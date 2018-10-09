'use strict';

import Component from './Component.js';

export default class Template extends Component {
  constructor(e) {
    super(e, 'template');
    
    
    this.on('collision', function(){}, this);
  }

  update(dt) {
  }
}