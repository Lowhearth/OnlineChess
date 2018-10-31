import React, { Component } from 'react';



class Square extends Component {
  constructor(props) {
   super(props);
  }

  handleClick(){
      this.props.handleClick(this.props.position, this.props.piece)

  }
  render() {
    return (
      <div className="Tile" style={this.props.tile.selected === false ? selector(this.props.tile.available, this.props.tile.coordinate): selected } onClick={this.handleClick.bind(this)}>
        {this.props.piece.alliance}{this.props.piece.name === "empty" ? "" : this.props.piece.name }
      </div>
    );
  }
}


var divStylePair = {
   backgroundColor: "#FAEBD7",
   height: 100,
   width: 100,
   textAlign: 'center',
   borderStyle: 'solid'

};
var divStyleOdd = {
   backgroundColor: "#F5DEB3",
   height: 100,
   width: 100,
   textAlign: 'center',
   borderStyle: 'solid'

};
var selector = function (a, c){
  if(a ===true ){
    return available
  }else{
    if(c%11 === 0 || (c+2)%11 === 0 || (c+4)%11 === 0 || c>50 && (c+6)%11 === 0 || (c-2)%11 === 0 || c< 50 &&(c-4)%11 === 0 || c< 50 &&(c-6)%11 === 0 ){
      return divStylePair
    }else{
        return divStyleOdd
    }

  }
}
var available = {
   backgroundColor: "#ADFF2F",
   height: 100,
   width: 100,
   textAlign: 'center',
   borderStyle: 'solid'

};
var selected={
  backgroundColor: "#7FFF00",
  height: 100,
  width: 100,
  textAlign: 'center',
  borderStyle: 'solid'
}


export default Square;
