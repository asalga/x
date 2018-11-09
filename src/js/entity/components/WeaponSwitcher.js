'use strict';

import Component from './Component.js';
import Event from '../../event/Event.js';

export default class WeaponSwitcher extends Component {
  constructor(e) {
    super(e, 'weaponswitcher');
    this.weapons = new Map();
    this.mouseDown = false;

    this.on('GAME_MOUSE_DOWN', function() { this.mouseDown = true; }, this);
    this.on('GAME_MOUSE_UP', function() { this.mouseDown = false; }, this);

    document.addEventListener('keydown', e => {
      if (this.weapons.has(e.key) === false) { return; }
console.log('key down');
      this.ismdown = this.mouseDown;

      this.turnAllWeaponsOff();
      let w = this.weapons.get(e.key);
      w && this.enableWeapon(w, true);

      if (this.ismdown) {
        new Event({ evtName: 'GAME_MOUSE_DOWN', data: e }).fire();
      }

    });
  }

  enableWeapon(e, b) {
    e.launcher.setEnable(b);
    e.launcherrenderer.visible = b;
    e.setEvents(b);
    console.log('enableWeapon ',e.name);

    // If we turn off the weapon but user is still holding down fire
    // Just fire the up event.
    if (b === false) {
      new Event({ evtName: 'GAME_MOUSE_UP', data: e }).fire();
    }
  }

  init() {
    this.turnAllWeaponsOff();
    this.enableWeapon(this.weapons.get('1'), true);
  }

  turnAllWeaponsOff() {
      console.log('turn off all  ');

    this.weapons.forEach(e => this.enableWeapon(e, false));
  }

  addWeapon(key, entity) {
    this.weapons.set(key, entity);
  }

  update(dt) {}
  draw() {}
}