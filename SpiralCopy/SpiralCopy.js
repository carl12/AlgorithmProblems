
function SpiralCopy(spiralArr){
  class Traverser {
    i = 0;
    j = 0;
    _direction = 0;
    _directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    travelled = new Set();
    constructor(spiralArr) {
      this.spiralArr = spiralArr;
    }

    getStraighened() {
      this.travelled = new Set();
      const res = [];
      let travelled = 1;
      while (travelled != 0) {
        travelled = 0;
        while (!this.isOff()) {
          travelled ++;
          console.log(this.getPos());
          this.confirm();
          res.push(this.getArrVal());
          this.step();
        }
        this.undo();
        this.nextDirection();
        this.step();
      }
      return res;
    }

    isOff() {
      return (
        this.i < 0 ||
        this.i >= spiralArr.length ||
        this.j < 0 ||
        this.j >= spiralArr[0].length
        || this.travelled.has(this.getPos())
      );
    }

    step() {
      this.i += this.getIDir();
      this.j += this.getJDir();
    }

    undo() {
      this.i -= this.getIDir();
      this.j -= this.getJDir();
    }

    confirm() {
      this.travelled.add(this.getPos());
    }

    getPos() {
      return `${this.i},${this.j}`;
    }

    getArrVal() {
      return this.spiralArr[this.i][this.j];
    }

    getIDir() {
      return this._directions[this._direction][0];
    }

    getJDir() {
      return this._directions[this._direction][1];
    }

    nextDirection() {
      this._direction = (this._direction + 1) % this._directions.length;
    }
  }
  return new Traverser(spiralArr).getStraighened();
}

inputMatrix  = [ [1,    2,   3,  4,    5],
                 [6,    7,   8,  9,   10],
                 [11,  12,  13,  14,  15],
                 [16,  17,  18,  19,  20] ];

inputMatrix2 = [[1,2],
              [3,4]];

console.log(SpiralCopy(inputMatrix));