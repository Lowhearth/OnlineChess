export function Bishop(Alliance){

  var self= {
    name:"Bishop",
    alliance: Alliance,
    normalMoves: [11,-11, 9, -9],
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
                destinationCoordinate = parseInt(destinationCoordinate) + parseInt(this.normalMoves[i])
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
    calculateRoots: function (board, position){
      var normalMoves = this.normalMoves
      var rootedTile = []

      for(var i in normalMoves){
          var nextMove = false;
            var destinationCoordinate = parseInt(position) + parseInt(this.normalMoves[i])
          while(nextMove === false){
              if(board[destinationCoordinate].isEmpty === true){
                destinationCoordinate = parseInt(destinationCoordinate) + parseInt(this.normalMoves[i])
              }else if(board[destinationCoordinate].piece.alliance === -this.alliance){
                  var candidate = destinationCoordinate
                  destinationCoordinate = parseInt(destinationCoordinate) + parseInt(this.normalMoves[i])
                  var finish = false
                  while(finish === false){
                      if(board[destinationCoordinate].isEmpty === true){
                        destinationCoordinate = parseInt(destinationCoordinate) + parseInt(this.normalMoves[i])
                      }else{
                        if(board[destinationCoordinate].piece.alliance === -this.alliance){
                          if(board[destinationCoordinate].piece.name === "King"){
                            rootedTile.push(candidate)
                            finish = true
                            nextMove = true
                          }else{
                            finish = true
                            nextMove = true
                            }
                          }else{
                            finish = true
                            nextMove = true
                          }
                       }
                      }
                }else{
                  nextMove = true
                }
              }
          }
        return rootedTile
      },
      calculateSpecialMoves: function (board, pos){
        return 0
      }

  }
  return self
}
