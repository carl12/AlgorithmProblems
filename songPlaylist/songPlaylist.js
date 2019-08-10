
function songPlaylist(
  songCount, 
  playlistLength, 
  repeatDist, 
  allowedSet, 
  bannedQueue = []) {
    if (allowedSet === undefined) {
      allowedSet = new Set();
      for (let i = 0; i < songCount; i++) {
        allowedSet.add(i);
      }
    }
    if (playlistLength === 0) {
      return 1;
    }
    let possible = 0;
    let newAllowed = null;
    if (bannedQueue.length > 0 && bannedQueue.length > repeatDist) {
      newAllowed = bannedQueue.shift();
      allowedSet.add(newAllowed);
    }
    let a = Array.from(allowedSet);
    console.log(a, playlistLength);
    a.forEach(song => {
      allowedSet.delete(song);
      bannedQueue.push(song);
      possible += songPlaylist(songCount, playlistLength - 1, repeatDist, allowedSet, bannedQueue);
      allowedSet.add(bannedQueue.pop());
    });

    if (newAllowed !== null) {
      allowedSet.delete(newAllowed);
      bannedQueue.unshift(newAllowed);
    }

    return possible;
}


console.log(songPlaylist(4, 4, 1));

