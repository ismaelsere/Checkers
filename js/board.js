

function visualBoard() {
    for (var n=0; n<8; n++) {
      for (var i = 0; i < 8; i++) {
        if (((n+i)%2)===0) {
          $('#board').append('<div class="white-square square">');
        }
        else {
          $('#board').append('<div class="black-square square">');
        }
      }
    }
}

function createBoard() {
  var board = [];
  for (var n=0; n<8; n++) {
    board.push([]);
    for (var i = 0; i < 8; i++) {
      if (((n+i)%2)===0) {
        board[n].push("w")
      }
      else {
        board[n].push("b")
      }
    }
  }
  return board;
}


console.log('hey')
