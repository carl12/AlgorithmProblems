var List = require("collections/list");

function TestLinkedListPerf() {
  const runs = 10000;
  const a = List();
  console.time();
  for (let i = 0; i < runs; i++) {
    let rnd = Math.random();
    if (rnd > 0.5) {
      a.push(Math.random());
    } else {
      a.unshift(Math.random());
    }
  }
  console.timeEnd();

  const b = [];
  console.time();
  for (let i = 0; i < runs; i++) {
    let rnd = Math.random();
    if (rnd > 0.5) {
      b.push(Math.random());
    } else {
      b.unshift(Math.random());
    }
  }
  console.timeEnd();
}

TestLinkedListPerf();