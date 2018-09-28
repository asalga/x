'use strict';

export default class Vec2 {
  constructor() {
    let x, y;

    if (arguments.length === 0) {
      x = y = 0;
    } else if (arguments.length === 1) {
      x = arguments[0].x;
      y = arguments[0].y;
    } else {
      x = arguments[0];
      y = arguments[1];
    }
    this.set(x, y);
  }

  set() {
    switch (arguments.length) {
      case 1:
        this.x = arguments[0].x;
        this.y = arguments[0].y;
        break;
      case 2:
        this.x = arguments[0];
        this.y = arguments[1];
    }
  }

  add(v) {
    switch (arguments.length) {
      case 1:
        this.x += arguments[0].x;
        this.y += arguments[0].y;
        break;
      case 2:
        this.x += arguments[0];
        this.y += arguments[1];
    }
    return this;
  }

  limit(s) {
    let len = this.length();
    if (len > s) {
      this.normalize().scale(s);
    }
    return this;
  }

  scale(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  clone() {
    return new Vec2(this.x, this.y);
  }

  mult(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  length() {
    return Math.sqrt(Vec2.dot(this, this));
  }

  normalize() {
    let len = this.length();
    if (len !== 0) {
      this.x /= len;
      this.y /= len;
    }
    return this;
  }

  static Sub(v1, v2) {
    return new Vec2(v1.x - v2.x, v1.y - v2.y);
  }

  static Rand() {
    let x = Math.random() * 2 - 1;
    let y = Math.random() * 2 - 1;
    return new Vec2(x, y);
  }

  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
}