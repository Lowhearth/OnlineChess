
module.exports = function King(Alliance){

  var self= {
    name:"King",
    alliance: Alliance,
    normalMoves: [11,10,9,-1,-11,-10,-9, 1],
    hasMoved: false,
    calculateMoves: function (board, position){
      var hasMove = this.hasMove
      var normalMoves=this.normalMoves
      var posibleMoves = []
      for(var i in normalMoves){
          var nextMove = false;
            var destinationCoordinate = parseInt(position) + parseInt(this.normalMoves[i])
            if(board[destinationCoordinate].isEmpty === true){
              posibleMoves.push(parseInt(destinationCoordinate))
            }else{
              if(board[destinationCoordinate].piece.alliance === -this.alliance){
                posibleMoves.push(parseInt(destinationCoordinate))
              }else{
              }

          }
      }
      return posibleMoves
    },
    calculateSpecialMoves: function(board, position){
      var hasMove = this.hasMove
      var normalMoves=this.normalMoves
      var posibleMoves = []
      var lRook = this.alliance === -1 ? 81 : 21
      var lPosition = this.alliance === -1 ? 82 : 22
      var rRook = this.alliance === -1 ? 88 : 28
      var rPosition = this.alliance === -1 ? 87 : 27
      var logic = new Logic()
      if(!this.hasMoved &&  board[lRook].piece.name=== "Rook" && !board[lRook].piece.hasMoved){
        var freeWay = true
        for( var i = 1; i<=3; i++){
          var pos = position- i
          if(!board[pos].isEmpty || logic.isUnderAttack(board, pos, this.alliance)){
            freeWay = false
            i = 4
          }
        }
        if(freeWay){
          posibleMoves.push(lPosition)
          console.log("adding " + lPosition)
        }

      }
      if(!this.hasMoved &&  board[rRook].piece.name=== "Rook" && !board[rRook].piece.hasMoved){
        var freeWay = true
        for( var i = 1; i<=2; i++){
          var pos = position + i
          if(!board[pos].isEmpty || logic.isUnderAttack(board, pos, this.alliance)){
            freeWay = false
            i = 4
          }
        }
        if(freeWay){
          posibleMoves.push(rPosition)
          console.log("adding " + rPosition)
        }

      }
      return posibleMoves
    }

  }
  return self
}

function isGameEnded(board){
  var kings = board.filter((t) => t.piece.name === "King")
  return kings.length === 2 ? false : true
}
function selectWinner(board){
  var king = board.filter((t) => t.piece.name === "King")
  if(this.isGameEnded(board)){
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
