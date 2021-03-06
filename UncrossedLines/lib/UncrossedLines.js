"use strict";

var maxUncrossedLines = function maxUncrossedLines(A, B) {
  var store = new Array(A.length + 1).fill(0).map(function () {
    return new Array(B.length + 1).fill(0);
  });
  var lastRow = new Array(B.length + 1).fill(0);
  var currRow = new Array(B.length + 1);
  currRow[0] = 0;

  for (var i = 1; i < A.length + 1; i++) {
    for (var j = 1; j < B.length + 1; j++) {
      if (A[i - 1] === B[j - 1]) {
        currRow[j] = lastRow[j - 1] + 1;
      } else {
        currRow[j] = Math.max(currRow[j - 1], lastRow[j]);
      }
    }

    lastRow = currRow;
    currRow = new Array(B.length + 1);
    currRow[0] = 0;
  }

  return lastRow[j - 1];
};

console.log(maxUncrossedLines([1, 3, 7, 1, 7, 5], [1, 9, 2, 5, 1]));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9VbmNyb3NzZWRMaW5lcy50cyJdLCJuYW1lcyI6WyJtYXhVbmNyb3NzZWRMaW5lcyIsIkEiLCJCIiwic3RvcmUiLCJBcnJheSIsImxlbmd0aCIsImZpbGwiLCJtYXAiLCJsYXN0Um93IiwiY3VyclJvdyIsImkiLCJqIiwiTWF0aCIsIm1heCIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7O0FBQ0EsSUFBTUEsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFTQyxDQUFULEVBQXNCQyxDQUF0QixFQUEyQztBQUVuRSxNQUFNQyxLQUFpQixHQUFHLElBQUlDLEtBQUosQ0FBVUgsQ0FBQyxDQUFDSSxNQUFGLEdBQVcsQ0FBckIsRUFDdkJDLElBRHVCLENBQ2xCLENBRGtCLEVBRXZCQyxHQUZ1QixDQUVuQjtBQUFBLFdBQU0sSUFBSUgsS0FBSixDQUFVRixDQUFDLENBQUNHLE1BQUYsR0FBVyxDQUFyQixFQUF3QkMsSUFBeEIsQ0FBNkIsQ0FBN0IsQ0FBTjtBQUFBLEdBRm1CLENBQTFCO0FBSUEsTUFBSUUsT0FBaUIsR0FBRyxJQUFJSixLQUFKLENBQVVGLENBQUMsQ0FBQ0csTUFBRixHQUFXLENBQXJCLEVBQXdCQyxJQUF4QixDQUE2QixDQUE3QixDQUF4QjtBQUNBLE1BQUlHLE9BQWlCLEdBQUcsSUFBSUwsS0FBSixDQUFVRixDQUFDLENBQUNHLE1BQUYsR0FBVyxDQUFyQixDQUF4QjtBQUNBSSxFQUFBQSxPQUFPLENBQUMsQ0FBRCxDQUFQLEdBQWEsQ0FBYjs7QUFFQSxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdULENBQUMsQ0FBQ0ksTUFBRixHQUFXLENBQS9CLEVBQWtDSyxDQUFDLEVBQW5DLEVBQXVDO0FBQ3JDLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR1QsQ0FBQyxDQUFDRyxNQUFGLEdBQVcsQ0FBL0IsRUFBa0NNLENBQUMsRUFBbkMsRUFBdUM7QUFDckMsVUFBSVYsQ0FBQyxDQUFDUyxDQUFDLEdBQUcsQ0FBTCxDQUFELEtBQWFSLENBQUMsQ0FBQ1MsQ0FBQyxHQUFHLENBQUwsQ0FBbEIsRUFBMkI7QUFDekJGLFFBQUFBLE9BQU8sQ0FBQ0UsQ0FBRCxDQUFQLEdBQWFILE9BQU8sQ0FBQ0csQ0FBQyxHQUFHLENBQUwsQ0FBUCxHQUFpQixDQUE5QjtBQUNELE9BRkQsTUFFTztBQUNMRixRQUFBQSxPQUFPLENBQUNFLENBQUQsQ0FBUCxHQUFhQyxJQUFJLENBQUNDLEdBQUwsQ0FBU0osT0FBTyxDQUFDRSxDQUFDLEdBQUcsQ0FBTCxDQUFoQixFQUF5QkgsT0FBTyxDQUFDRyxDQUFELENBQWhDLENBQWI7QUFDRDtBQUNGOztBQUNESCxJQUFBQSxPQUFPLEdBQUdDLE9BQVY7QUFDQUEsSUFBQUEsT0FBTyxHQUFHLElBQUlMLEtBQUosQ0FBVUYsQ0FBQyxDQUFDRyxNQUFGLEdBQVcsQ0FBckIsQ0FBVjtBQUNBSSxJQUFBQSxPQUFPLENBQUMsQ0FBRCxDQUFQLEdBQWEsQ0FBYjtBQUNEOztBQUNELFNBQU9ELE9BQU8sQ0FBQ0csQ0FBQyxHQUFHLENBQUwsQ0FBZDtBQUNELENBdkJEOztBQXlCQUcsT0FBTyxDQUFDQyxHQUFSLENBQVlmLGlCQUFpQixDQUFDLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLENBQUQsRUFDM0IsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxDQUQyQixDQUE3QiIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgbWF4VW5jcm9zc2VkTGluZXMgPSBmdW5jdGlvbihBOiBudW1iZXJbXSwgQjogbnVtYmVyW10pOiBudW1iZXIge1xuXG4gIGNvbnN0IHN0b3JlOiBudW1iZXJbXVtdID0gbmV3IEFycmF5KEEubGVuZ3RoICsgMSlcbiAgICAuZmlsbCgwKVxuICAgIC5tYXAoKCkgPT4gbmV3IEFycmF5KEIubGVuZ3RoICsgMSkuZmlsbCgwKSk7XG4gIFxuICBsZXQgbGFzdFJvdzogbnVtYmVyW10gPSBuZXcgQXJyYXkoQi5sZW5ndGggKyAxKS5maWxsKDApO1xuICBsZXQgY3VyclJvdzogbnVtYmVyW10gPSBuZXcgQXJyYXkoQi5sZW5ndGggKyAxKTtcbiAgY3VyclJvd1swXSA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBBLmxlbmd0aCArIDE7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAxOyBqIDwgQi5sZW5ndGggKyAxOyBqKyspIHtcbiAgICAgIGlmIChBW2kgLSAxXSA9PT0gQltqIC0gMV0pIHtcbiAgICAgICAgY3VyclJvd1tqXSA9IGxhc3RSb3dbaiAtIDFdICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJSb3dbal0gPSBNYXRoLm1heChjdXJyUm93W2ogLSAxXSwgbGFzdFJvd1tqXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RSb3cgPSBjdXJyUm93O1xuICAgIGN1cnJSb3cgPSBuZXcgQXJyYXkoQi5sZW5ndGggKyAxKTtcbiAgICBjdXJyUm93WzBdID0gMDtcbiAgfVxuICByZXR1cm4gbGFzdFJvd1tqIC0gMV07XG59XG5cbmNvbnNvbGUubG9nKG1heFVuY3Jvc3NlZExpbmVzKFsxLDMsNywxLDcsNV0sXG4gIFsxLDksMiw1LDFdXG4gICkpO1xuIl19