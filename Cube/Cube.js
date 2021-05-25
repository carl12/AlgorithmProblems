
function Cube(points){}


function dist(p1, p2) {
  return Math.sqrt(p1.reduce((sum, val, i) => sum + Math.abs(p1[i] - p2[i]) ** 2, 0));
}


console.log(dist([0,0,0],[1,1,1])*4)
 