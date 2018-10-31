export function EmptyTile (position){
  var self = {
    coordinate:position,
    isEmpty: true,
    selected: false,
    available:false,
    piece: {name:"empty"}

    }
    return self
  }
