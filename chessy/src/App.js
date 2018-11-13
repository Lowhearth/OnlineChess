import React, { Component } from 'react';
import logo from './logo.svg';
import Board from './Board';
import './App.css';
import socketIOClient from 'socket.io-client'

class App extends Component {

  constructor(){
    super()

    this.state = {
      endpoint: "http://10.168.21.78:4000",

    }
    this.socket = socketIOClient(this.state.endpoint)
  }

makeMove = (selectedTile, selectedPiece, newPosition) => {
  console.log("sending Package" + selectedTile + selectedPiece + newPosition + this.state.player)
  this.socket.emit("newMove", selectedTile, selectedPiece, newPosition, this.state.player)
}
endMove = () =>{
  this.setState(() => {return ({ selectedTile: undefined,
                                 selectedPiece: undefined,
                                  newPosition : undefined
                                })})
}

  componentDidMount(){
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
    this.socket.on("assignSlot", (player) =>{
        console.log("asigned Slot" + player)
        this.setState(() =>{
          return({player: player})
        })
    })
  }
  render() {



    return (
      <div>
      <Board makeMove={this.makeMove.bind(this)} player={this.state.player} moveHasEnded={typeof this.state.selectedTile === 'undefined' ? 0 : 1 }selectedTile={this.state.selectedTile} selectedPiece={this.state.selectedPiece} newPosition={this.state.newPosition} endMove ={this.endMove.bind(this)}/>
      </div>
    );
  }
}

export default App;
