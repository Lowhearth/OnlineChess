const Rook = require('./pieces/Rook')
const Knight = require('./pieces/Knight')
const King = require('./pieces/King')
const Queen = require('./pieces/Queen')
const Pawn = require('./pieces/Pawn')
const Bishop = require('./pieces/Bishop')

module.exports = function Board (){

  self = {
          board: [],
          selectedPiece:[],
          selectedTile:[],
          gameEnded:false,
          gameWinner:0,
          rootedTiles:[],
          turn:-1
        }

  let board = []
  for(let i =0 ; i < 110 ; i++){
    if(i < 21 || i > 88  ){
        board.push(OffTile(i))
    }else if((i+1)%10 === 0 || i%10 ===0){
        board.push(OffTile(i))
    }else{
    board.push(EmptyTile(i))
    }
  }
    self.board = buildNewBoard(board);


    return self

}


function EmptyTile (position){
  var self = {
    coordinate:position,
    isEmpty: true,
    selected: false,
    available:false,
    piece: {name:"empty"}

    }
    return self
  }
function OffTile (position){
    var self = {
      coordinate:position,
      piece:{name: "outsider", alliance: 0},
      isEmpty: false,
      getPiece: false,
    }
    return self


  }


function Tile (position, piece){
    var self = {
      coordinate:position,
      piece:piece,
      selected:false,
      isEmpty: false,
      available:false,
      getPiece: function (){
        return this.piece
      }
    }
    return self


  }

  function buildNewBoard(board){

    board[21] = Tile(21, Rook(1))
    board[22] = Tile(22, Knight(1))
    board[23] = Tile(23, Bishop(1))
    board[24] = Tile(24, Queen(1))
    board[25] = Tile(25, King(1))
    board[26] = Tile(26, Bishop(1))
    board[27] = Tile(27, Knight(1))
    board[28] = Tile(28, Rook(1))
    board[31] = Tile(31, Pawn(1))
    board[32] = Tile(32, Pawn(1))
    board[33] = Tile(33, Pawn(1))
    board[34] = Tile(34, Pawn(1))
    board[35] = Tile(35, Pawn(1))
    board[36] = Tile(36, Pawn(1))
    board[37] = Tile(37, Pawn(1))
    board[38] = Tile(38, Pawn(1))


    board[81] = Tile(81, Rook(-1))
    board[82] = Tile(82, Knight(-1))
    board[83] = Tile(83, Bishop(-1))
    board[84] = Tile(84, Queen(-1))
    board[85] = Tile(85, King(-1))
    board[86] = Tile(86, Bishop(-1))
    board[87] = Tile(87, Knight(-1))
    board[88] = Tile(88, Rook(-1))
    board[71] = Tile(71, Pawn(-1))
    board[72] = Tile(72, Pawn(-1))
    board[73] = Tile(73, Pawn(-1))
    board[74] = Tile(74, Pawn(-1))
    board[75] = Tile(75, Pawn(-1))
    board[76] = Tile(76, Pawn(-1))
    board[77] = Tile(77, Pawn(-1))
    board[78] = Tile(78, Pawn(-1))


    return board
  }
