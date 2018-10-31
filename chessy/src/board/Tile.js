export function Tile (position, piece){
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
