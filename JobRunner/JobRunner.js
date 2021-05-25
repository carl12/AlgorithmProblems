class Job {
  constructor(id, time, next) {
    this.id = id;
    this.time = Number(time);
    this.next = next;
    this.isLast = this.next === '0';
  }
}

class Chain {
  constructor(start, end, time, count) {
    this.start = start;
    this.end = end;
    this.time = Number(time);
    this.count = count;
  }
}

function JobRunner(runs) {
  let lines = runs.split('\n');
  let chains = [];
  const nextIdToJob = {};
  const idToJob = {};
  for (let line of lines) {
    const job = line.split(',');
    if (job.length != 3 || job.some(a => a === '')) {
      return;
    }
    let [id, time, next] = job;
    
    if (idToJob[id]) {
      return;
    }
    idToJob[id] = new Job(id, time, next);

    if (next === '0') {
      chains.push(new Chain(id, id, time, 1));
    } else if (nextIdToJob[next]) {
      return;
    } else {
      nextIdToJob[next] = new Job(id, time, next);
    }
  }

  const jobCount = lines.length;
  let visited = 0;
  for (let chain of chains) {
    visited ++;
    let curr = idToJob[chain.start];
    while(nextIdToJob[curr.id]) {
      visited ++;
      curr = nextIdToJob[curr.id];
      chain.start = curr.id;
      chain.time += curr.time;
      chain.count ++;
    }
  }

  if (visited != jobCount) {
    return;
  }
  
  chains.sort((c1, c2) => c2.time - c1.time);
  
  const vals = [];
  for (let chain of chains) {
    vals.push(`starts: ${chain.start}, end: ${chain.end}, dist: ${chain.time}, count: ${chain.count}`);
  }
  return vals.join('\n');
}


let a = 
`1,20,23
2,3,0
3,2,2
23,3,0
1,,5`;

console.log(JobRunner(a));