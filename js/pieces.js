$(function() {

  var board = createBoard();

  function Square() {
    this.piecePosition = [];
    this.pieceColor = "null";
    this.filled = false;
  }


  visualBoard();
  setBoard();
  moveable(board,'white');
  moveable(board,'black');
  evaluate(board,1)

  function setBoard() {
    for (var row=0; row<8; row++) {
      for (var col=0; col<8; col++) {
        if (row<=2 && ((row+col)%2) === 1) {
        //  var p = new Piece();
          var s = new Square();
          board[row][col] = s;
        //  p.color = "white";
          s.piecePosition = [row,col];
          s.pieceColor = "white";
          s.filled = true;
        }
        else if (row>=5 && ((row+col)%2) === 1) {
        //  var p = new Piece();
          var s = new Square();
          board[row][col] = s;
        //  p.color = "black";
          s.piecePosition = [row,col];
          s.pieceColor = "black";
          s.filled = true;
        }
        else {
          var s = new Square();
          board[row][col] = s;
          s.piecePosition = [row,col];
          s.pieceColor = "null";
        }
      }
    }
    console.log(board)
    return board;
  }

  function positions(thisBoard,color) {
    var positions = [];
    for (var row=0; row<8; row++) {
      for (var col=0; col<8; col++) {
        if (thisBoard[row][col].filled && thisBoard[row][col].pieceColor === color) {
          positions.push(thisBoard[row][col].piecePosition)
        }
      }
    }
    return positions;
  }

  function moveable(board,color) {
    var moveables = [];
    if (color === "white") {
      var whitePositions = positions(board,"white");
      whitePositions.forEach(function(piece) {
        var container = [];
        var right = board[piece[0]+1][piece[1]-1]
        var left = board[piece[0]+1][piece[1]+1]
        if (typeof right!= 'undefined' || typeof left != 'undefined'){
          var pushedPiece = false;
          if (typeof right!= 'undefined' && !(right.filled)) {
            container.push(piece);
            pushedPiece = true;
            container.push([piece[0]+1,piece[1]-1]);
          }
          if (typeof left != 'undefined' && !(left.filled)) {
            if (!pushedPiece) {
              container.push(piece);
            }
            container.push([piece[0]+1,piece[1]+1]);
          }
          if (container.length>0) {
            moveables.push(container);
          }
        }
      })
    }
    if (color === "black") {
      var blackPositions = positions(board,"black");
      blackPositions.forEach(function(piece) {
        var container = [];
        var left = board[piece[0]-1][piece[1]-1]
        var right = board[piece[0]-1][piece[1]+1]
        if (typeof right!= 'undefined' || typeof left != 'undefined') {
          var pushedPiece = false;
          if (typeof right!= 'undefined' && !(right.filled)) {
            container.push(piece);
            pushedPiece = true;
            container.push([piece[0]-1,piece[1]+1]);
          }
          if (typeof left != 'undefined' && !(left.filled)) {
            if (!pushedPiece) {
              container.push(piece);
            }
            container.push([piece[0]-1,piece[1]-1]);
          }
          if (container.length>0) {
            moveables.push(container);
          }
        }
      })
    }
    return moveables;
  }


  function evaluate(mainBoard,stop) {
    var turn = 1;
    var mainArray = [];
    var count = 0;
    function copies(thisBoard,turn) {
       if (turn%2 === 1) {
        var moveables = moveable(thisBoard,'white');
       }
       else {
         var moveables = moveable(thisBoard,'black');
       }

      var array = [];
      for (var i = 0; i<moveables.length; i++) {
        for (var n = 1; n<moveables[i].length; n++) {
          var copy = JSON.parse(JSON.stringify(thisBoard));//assume this works
          move(copy,moveables[i][0],moveables[i][n]);
          array.push(copy);

        }
      }

      if (turn === stop) {
        console.log(count++,array)
        return array;
      }
      else {
        array.forEach(function(thisBoard) {
          return copies(thisBoard,turn+1);
        })
      }
    }
    copies(mainBoard,turn);

  }

  function move(board,fromPos,toPos) {
    board[toPos[0]][toPos[1]].filled = true;
    board[toPos[0]][toPos[1]].pieceColor = board[fromPos[0]][fromPos[1]].pieceColor;
    board[fromPos[0]][fromPos[1]].filled = false;
    board[fromPos[0]][fromPos[1]].pieceColor = "null";
  }
})
