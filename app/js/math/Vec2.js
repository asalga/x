'use strict';

export default class Vec2 {
  constructor(x = 0, y = 0) {
    this.set(x, y);
  }

  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  scale(s) {
    this.x *= s;
    this.y *= s;
    return this;
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
    this.x /= len;
    this.y /= len;
  }

  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
}