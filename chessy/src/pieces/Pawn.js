export function Pawn (Alliance){
  var self= {
    name:"Pawn",
    alliance: Alliance,
    normalMoves: [10],
    atackingMoves: [9, 11],
    hasMoved: false,
    calculateMoves: function (board, position){
      var normalMoves=this.normalMoves
      var atackingMoves=this.atackingMoves
      var posibleMoves = []
      var alliance = this.alliance
      for(var i in normalMoves){
            var destinationCoordinate = parseInt(position) + parseInt(this.normalMoves[i])* alliance
              if(board[destinationCoordinate].isEmpty === true){
                posibleMoves.push(destinationCoordinate)
                destinationCoordinate = parseInt(destinationCoordinate) + parseInt(this.normalMoves[i])
              }
        }
      for(var i in atackingMoves){
        var destinationCoordinate = parseInt(position) + parseInt(this.atackingMoves[i])* alliance
            if(board[destinationCoordinate].isEmpty === false && board[destinationCoordinate].piece.alliance === -alliance){
              posibleMoves.push(destinationCoordinate)
            }
          }
          return posibleMoves
    },
    calculateAttackingMoves: function (board, position){
      var normalMoves=this.normalMoves
      var atackingMoves=this.atackingMoves
      var posibleMoves = []
      var alliance = this.alliance
      for(var i in atackingMoves){
        var destinationCoordinate = parseInt(position) + parseInt(this.atackingMoves[i])* alliance
            if(board[destinationCoordinate].isEmpty === false && board[destinationCoordinate].piece.alliance === -alliance){
              posibleMoves.push(parseInt(destinationCoordinate))
            }
          }
          return posibleMoves

    },
    calculateAttackingMoves: function (board, position, atackingPosition){
      var normalMoves=this.normalMoves
      var atackingMoves=this.atackingMoves
      var posibleMoves = []
      var alliance = this.alliance
      for(var i in atackingMoves){
        var destinationCoordinate = parseInt(position) + parseInt(this.atackingMoves[i])* alliance

              posibleMoves.push(parseInt(destinationCoordinate))

          }
          return posibleMoves

    },
    calculateSpecialMoves: function (board, pos){
      return 0
    }
  }
  return self
}
