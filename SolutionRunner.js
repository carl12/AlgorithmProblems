
function timeFunctions(functions, generatorFunction, generatorInput, repetitions) {
  const timers = [];
  const generatorTimer = new Stopwatch();
  let nFuncs = functions.length;
  for (let i = 0; i < nFuncs; i++) {
    timers.push(new Stopwatch());
  }
  for (let i = 0; i < repetitions; i++) {
    for (let j = 0; j < nFuncs; j++) {
      generatorTimer.start();
      const input = generatorFunction(...generatorInput);
      generatorTimer.stop();
      timers[j].start();
      functions[j](...input);
      timers[j].stop();
    }
  }
  console.log()
  timers.forEach(timer => console.log("total time: " + timer.getTotal()));
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