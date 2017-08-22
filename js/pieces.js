$(function() {

  var board = createBoard();

  function Piece() {
    this.color = "black";
    this.position = [];
    this.moveable = false;
  }

  function Square() {
    this.pieceColor = "black";
    this.filled = true;
  }
  var pieces = [];
  var moveableWhite = [];
  var moveableBlack = [];
  var whitePositions = [];
  var blackPositions = [];

  setBoard();
  moveable('white');
  moveable('black');

  function setBoard() {
    for (var n=0; n<8; n++) {
      for (var i=0; i<8; i++) {
        if (n<=2 && ((n+i)%2) === 1) {
          var p = new Piece();
          var s = new Square();
          board[n][i] = s;
          p.color = "white";
          p.position = [n,i];
          s.pieceColor = "white";
          whitePositions.push([n,i]);
        }
        else if (n>=5 && ((n+i)%2) === 1) {
          var p = new Piece();
          var s = new Square();
          board[n][i] = s;
          p.color = "black";
          p.position = [n,i];
          s.pieceColor = "black";
          blackPositions.push([n,i]);
        }
      }
    }
    console.log(board)
  }

  function moveable(color) {
    if (color === "white") {
      whitePositions.forEach(function(piece) {
        var right = board[piece[0]+1][piece[1]-1]
        var left = board[piece[0]+1][piece[1]+1]
        if (typeof right != 'undefined' && !(right.filled)) {
    //      console.log('right good');
        }
        if (typeof left != 'undefined' && !(left.filled)) {
      //    console.log('left good');
        }
      })
    }
    if (color === "black") {
      blackPositions.forEach(function(piece) {
        var left = board[piece[0]-1][piece[1]-1]
        var right = board[piece[0]-1][piece[1]+1]
        if (typeof right != 'undefined' && !(right.filled)) {
          console.log('right good');
        }
        if (typeof left != 'undefined' && !(left.filled)) {
          console.log('left good');
        }
      })
    }
  }
})
