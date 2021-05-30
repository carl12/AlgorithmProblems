
function timeFunctions(functions, generatorFunction, generatorInput, repetitions) {
  const timers = [];
  const generatorTimer = new Stopwatch();
  let nFuncs = functions.length;
  for (let i = 0; i < nFuncs; i++) {
    timers.push(new Stopwatch());
  }
  let sols = [];
  for (let i = 0; i < repetitions; i++) {
    sols.length = 0;
    const input = generatorFunction(...generatorInput);
    for (let j = 0; j < nFuncs; j++) {
      generatorTimer.start();
      generatorTimer.stop();
      timers[j].start();
      let sol = functions[j](...jankyCopy(input));
      timers[j].stop();
      sols.push(sol);
    }
    if ((new Set(sols)).size !== 1) {
      console.log(input);
      console.log(sols);
      console.log();
    }
  }
  console.log()
  timers.forEach(timer => console.log("total time: " + timer.getTotal()));
}

function jankyCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

class Stopwatch {
  constructor() {
    this.totalTime = 0;
    this.currStart = null;
    this.lastLap = null;
  }

  start() {
    this.currStart = Date.now();
  }

  stop() {
    this.totalTime += Date.now() - this.currStart;
    this.currStart = null;
  }

  cancel() {
    this.currStart = null;
  }

  getTotal() {
    return this.totalTime;
  }

  lap() {
    if (this.lap) {
      let oldLap = this.lap;
      this.lap = Date.now();
      return this.lap - oldLap;
    } else {
      this.lap = Date.now();
      return 0;
    }
  }
}

module.exports = timeFunctions;