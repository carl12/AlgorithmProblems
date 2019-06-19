
function mostAliveYear(lifespans) {
    lifespans.sort((a, b) => a[0] - b[0]);
    let deaths = new MinHeap();
    let maxCount = 0;
    let maxYear = 1900;
    for (var lifespan of lifespans) {
        while (deaths.peek() < lifespan[0]) {
            deaths.removeMin();
        }
        deaths.add(lifespan[1]);
        console.log(deaths.size());
        if (deaths.size() > maxCount) {
            maxCount = deaths.size();
            maxYear = lifespan[0];
        }        
    }
    console.log(maxYear);
    return maxYear;
}


class MinHeap {
    constructor() {
        this._storage = [];
    }

    add(val) {
        this._storage.push(val);
        this._storage.sort((a, b) => b - a);
    }

    removeMin() {
        return this._storage.pop();
    }

    peek() {
        return this._storage[this._storage.length - 1];
    }

    size() {
        return this._storage.length;
    }
}

// let data = [
//     [1900, 1910],
//     [1906, 1907],
//     [1908, 1915],
//     [1919, 1930],
//     [1920, 1923],
//     [1922, 1923],
//     [1925, 1929],
// ];

// mostAliveYear(data);