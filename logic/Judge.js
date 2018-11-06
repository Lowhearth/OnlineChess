module.exports = function Judge (state, newPosition){

  if(state.selectedPiece.calculateMoves(state.board, state.selectedTile).concat(state.selectedPiece.calculateSpecialMoves(state.board, state.selectedTile)).indexOf(newPosition) >= 0){
    return executeMove(state, newPosition)

  }

}

function executeMove(state, position){

    let newBoard = state.board
    let newPiece = state.selectedPiece
    if(newPiece.name === "King" && !newPiece.hasMoved && (position === 82 || position === 22 )){
      var rookFinalPosition = newPiece.alliance === -1 ? 83 : 23
      var rookActualPosition = newPiece.alliance === -1 ? 81 : 21
      let newRook = state.board[rookActualPosition].piece
      newRook.hasMoved = true
      newBoard[rookFinalPosition] = Tile(rookFinalPosition, newRook)
      newBoard[rookActualPosition] = EmptyTile(rookActualPosition)

    }
    if(newPiece.name === "King" && !newPiece.hasMoved && (position === 87 || position === 27 )){
      var rookFinalPosition = newPiece.alliance === -1 ? 86 : 26
      var rookActualPosition = newPiece.alliance === -1 ? 88 : 28
      let newRook = state.board[rookActualPosition].piece
      newRook.hasMoved = true
      newBoard[rookFinalPosition] = Tile(rookFinalPosition, newRook)
      newBoard[rookActualPosition] = EmptyTile(rookActualPosition)

    }
    newPiece.hasMoved = true
    newBoard[position] = Tile(position, newPiece)
    newBoard[state.selectedTile] = EmptyTile(state.selectedTile[0])
    let gameEnded = isGameEnded(newBoard)
    let gameWinner = selectWinner(newBoard);
    let newSelectedPiece = []
    let newSelectedTile = []
    let rootedTiles = findRoots(newBoard)
    let turn = state.turn * -1
    return ({board:newBoard,
              selectedPiece: newSelectedPiece,
              selectedTile: newSelectedTile,
              gameEnded: gameEnded,
              gameWinner: gameWinner,
              rootedTiles: rootedTiles,
              turn: turn})
            }





function isGameEnded(board){
  var kings = board.filter((t) => t.piece.name === "King")
  return kings.length === 2 ? false : true
}
function selectWinner(board){
  var king = board.filter((t) => t.piece.name === "King")
  if(isGameEnded(board)){
    return king[0].piece.alliance
  }else{
    return 0
  }
}
function findRoots(board){
  var roots = board.filter((t) => (t.piece.name === "Bishop" || t.piece.name === "Queen" || t.piece.name === "Rook"))
                   .map((tile) => tile.piece.calculateRoots(board, tile.coordinate)).filter((root) => root.length > 0)
                   .map(c => parseInt(c));

  return roots

}
function isUnderAttack(board, position, alliance){
  var attacked = false
  var enemy = board.filter((t) => t.piece.alliance === -alliance).forEach(ti => { if(ti.piece.name ==="Pawn" ){ if(ti.piece.calculateAttackingMoves(board, ti.coordinate).indexOf(parseInt(position)) >=0){ attacked = true  }}else if( ti.piece.calculateMoves(board, ti.coordinate).indexOf(parseInt(position)) >=0){ attacked = true}})
  return attacked;
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
