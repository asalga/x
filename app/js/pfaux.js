export default class P6 {
  constructor(cvs, ctx) {
    this.ctx = ctx;
    this.cvs = cvs;

    // defaults
    this.fill('blue');
    this.stroke('white');
    this.strokeWeight(1);

    this._doFill = true;
    this._doStroke = true;
    this._clearCol = 'black';
  }

  clearColor(col) {
    this._clearCol = col;
  }

  clear() {
    this.ctx.save();
    this.ctx.fillStyle = this._clearCol;
    this.ctx.clearRect(0, 0, cvs.width, cvs.height);
    this.ctx.fillRect(0, 0, cvs.width, cvs.height);
    this.ctx.restore();
  }

  noFill() {
    this._doFill = false;
  }

  fill(col) {
    this._doFill = true;
    this.ctx.fillStyle = col;
  }

  stroke(col) {
    this._doStroke = true;
    this.ctx.strokeStyle = col;
  }

  strokeWeight(n){
    this.ctx.lineWidth = n;
  }

  noStroke() {
    this._doStroke = false;
  }

  rect(x, y, w, h) {

    if (this._doStroke) {
      this.ctx.strokeRect(x, y, w, h);
    }

    if (this._doFill) {
      this.ctx.fillRect(x, y, w, h);
    }
  }

  sin(a) {
    return Math.sin(a);
  }
  cos(a) {
    return Math.cos(a);
  }
}