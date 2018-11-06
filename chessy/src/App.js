import React, { Component } from 'react';
import logo from './logo.svg';
import Board from './Board';
import './App.css';
import socketIOClient from 'socket.io-client'

class App extends Component {

  constructor(){
    super()

    this.state = {
      endpoint: "http://localhost:4000",

    }
    this.socket = socketIOClient(this.state.endpoint)
  }

makeMove = (selectedTile, selectedPiece, newPosition) => {
  console.log("sending Package" + selectedTile + selectedPiece + newPosition)
  this.socket.emit("newMove", selectedTile, selectedPiece, newPosition)
}
endMove = () =>{
  this.setState(() => {return ({ selectedTile: undefined,
                                 selectedPiece: undefined,
                                  newPosition : undefined})})
}

  render() {
    this.socket.on('newMoveDone', (selectedTile, selectedPiece, newPosition) => {
      console.log("moveeed")
      this.setState(() =>{
        return({
        selectedTile:selectedTile,
        selectedPiece: selectedPiece,
        newPosition: newPosition
      })
      })
    })


    return (
      <div>
      <Board makeMove={this.makeMove.bind(this)} selectedTile={this.state.selectedTile} selectedPiece={this.state.selectedPiece} newPosition={this.state.newPosition} endMove ={this.endMove.bind(this)}/>
      </div>
    );
  }
}

export default App;
