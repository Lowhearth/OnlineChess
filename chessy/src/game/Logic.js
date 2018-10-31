import {Tile} from '../board/Tile'
export default class Logic {

isGameEnded(board){
  var kings = board.filter((t) => t.piece.name === "King")
  return kings.length === 2 ? false : true
}
selectWinner(board){
  var king = board.filter((t) => t.piece.name === "King")
  if(this.isGameEnded(board)){
    return king[0].piece.alliance
  }else{
    return 0
  }
}
findRoots(board){
  var roots = board.filter((t) => (t.piece.name === "Bishop" || t.piece.name === "Queen" || t.piece.name === "Rook"))
                   .map((tile) => tile.piece.calculateRoots(board, tile.coordinate)).filter((root) => root.length > 0)
                   .map(c => parseInt(c));

  return roots

}
isUnderAttack(board, position, alliance){
  var attacked = false
  var enemy = board.filter((t) => t.piece.alliance === -alliance).forEach(ti => { if(ti.piece.name ==="Pawn" ){ if(ti.piece.calculateAttackingMoves(board, ti.coordinate).indexOf(parseInt(position)) >=0){ attacked = true  }}else if( ti.piece.calculateMoves(board, ti.coordinate).indexOf(parseInt(position)) >=0){ attacked = true}})
  return attacked;
}



}
