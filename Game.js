module.exports = function Game (idGame, player1, board){
  self = {
    idGame: idGame,
    player1: player1,
    player2: undefined,
    board: board,

  }
  return self
}
