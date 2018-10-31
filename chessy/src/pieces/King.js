import Logic from '../game/Logic'

export function King(Alliance){

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
