export function Knight(Alliance){

  var self= {
    name:"Knight",
    alliance: Alliance,
    normalMoves: [12,-12, 21,19 , -21, -19, 8, -8],
    hasMoved: false,
    calculateMoves: function (board, position){
      var normalMoves=this.normalMoves
      var posibleMoves = []
      for(var i in normalMoves){
          var nextMove = false;
            var destinationCoordinate = parseInt(position) + parseInt(this.normalMoves[i])
          while(nextMove === false){

              if(board[destinationCoordinate].isEmpty === true){
                posibleMoves.push(destinationCoordinate)
                nextMove= true
              }else{
                if(board[destinationCoordinate].piece.alliance === -this.alliance){
                  posibleMoves.push(destinationCoordinate)
                  nextMove = true
                }else{
                  nextMove = true
                }
              }
          }
      }
      return posibleMoves
    },
    calculateSpecialMoves: function (board, pos){
      return 0
    }

  }
  return self
}
