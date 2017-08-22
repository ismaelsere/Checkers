
  function createBoard() {
    var board = [];
    for (var n=0; n<8; n++) {
      board.push([]);
      for (var i = 0; i < 8; i++) {
        if (((n+i)%2)===0) {
          $('#board').append('<div class="white-square square">');
          board[n].push("w")
        }
        else {
          $('#board').append('<div class="black-square square">');
          board[n].push("b")
        }
      }
    }
    console.log(board)
    return board;
}

console.log('hey')
