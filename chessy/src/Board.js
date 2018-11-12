import React, { Component } from 'react';
import logo from './logo.svg';
import Square from './Square'
import './App.css';
import { Rook } from './pieces/Rook'
import { Tile } from './board/Tile'
import { EmptyTile } from './board/EmptyTile'
import { OffTile } from './board/OffTile'
import { Bishop } from './pieces/Bishop'
import { Knight } from './pieces/Knight'
import { Queen } from './pieces/Queen'
import { King } from './pieces/King'
import { Pawn } from './pieces/Pawn'
import Logic  from './game/Logic'





class Board extends Component {
  constructor(props){
    super();
      this.state = {
        board: [],
        selectedPiece:[],
        selectedTile:[],
        gameEnded:false,
        gameWinner:0,
        rootedTiles:[],
        turn:-1
      }
      this.logic = new Logic()
  }

  buildNewBoard(board){

    board[21] = Tile(21, Rook(1))
    board[22] = Tile(22, Knight(1))
    board[23] = Tile(23, Bishop(1))
    board[24] = Tile(24, Queen(1))
    board[25] = Tile(25, King(1))
    board[26] = Tile(26, Bishop(1))
    board[27] = Tile(27, Knight(1))
    board[28] = Tile(28, Rook(1))
    board[31] = Tile(31, Pawn(1))
    board[32] = Tile(32, Pawn(1))
    board[33] = Tile(33, Pawn(1))
    board[34] = Tile(34, Pawn(1))
    board[35] = Tile(35, Pawn(1))
    board[36] = Tile(36, Pawn(1))
    board[37] = Tile(37, Pawn(1))
    board[38] = Tile(38, Pawn(1))


    board[81] = Tile(81, Rook(-1))
    board[82] = Tile(82, Knight(-1))
    board[83] = Tile(83, Bishop(-1))
    board[84] = Tile(84, Queen(-1))
    board[85] = Tile(85, King(-1))
    board[86] = Tile(86, Bishop(-1))
    board[87] = Tile(87, Knight(-1))
    board[88] = Tile(88, Rook(-1))
    board[71] = Tile(71, Pawn(-1))
    board[72] = Tile(72, Pawn(-1))
    board[73] = Tile(73, Pawn(-1))
    board[74] = Tile(74, Pawn(-1))
    board[75] = Tile(75, Pawn(-1))
    board[76] = Tile(76, Pawn(-1))
    board[77] = Tile(77, Pawn(-1))
    board[78] = Tile(78, Pawn(-1))


    return board
  }

  selectTile(newPosition, piece){
    if(!this.state.gameEnded){
      if(this.state.selectedTile.length === 0){
          if(piece.alliance === this.state.turn){
          if(piece.name !== "empty" && this.state.rootedTiles.indexOf(newPosition) <0 && this.props.player === this.state.turn){
            this.state.board[newPosition].selected =true
            var availableMoves = piece.calculateMoves(this.state.board, newPosition).concat(piece.calculateSpecialMoves(this.state.board, newPosition))
            availableMoves.forEach(a => this.state.board[a].available = true)
            this.setState( function(){
              var selectedTile = [newPosition]
              var selectedPiece = [piece]
              return({selectedPiece: selectedPiece,
                      selectedTile: selectedTile})
            })
          }
        }
      }
      else if(this.props.player === this.state.turn){
        if(newPosition === this.state.selectedTile[0]){
          this.state.board.forEach(a => this.state.board[a.coordinate].available = false)
          this.state.board[newPosition].selected = false
          this.setState(function (){
            return ({selectedTile : [],
                    selectedPiece : [] })
          })
        }else if(this.state.selectedPiece[0].calculateMoves(this.state.board, this.state.selectedTile[0]).concat(this.state.selectedPiece[0].calculateSpecialMoves(this.state.board, this.state.selectedTile[0])).indexOf(newPosition) >= 0){
          this.handleMove(newPosition)
          this.executeMove(newPosition)
          this.state.board.forEach(a => this.state.board[a.coordinate].available = false)
        }

      }
    }
  }

  handleMove(newPosition){
    this.props.makeMove(this.state.selectedTile, this.state.selectedPiece, newPosition)
    console.log("handling Click")
  }
  executeMove(position){

    this.setState(function(){
      console.log("executing the move")
      let newBoard = this.state.board
      let newPiece = this.state.selectedPiece[0]
      if(newPiece.name === "King" && !newPiece.hasMoved && (position === 82 || position === 22 )){
        var rookFinalPosition = newPiece.alliance === -1 ? 83 : 23
        var rookActualPosition = newPiece.alliance === -1 ? 81 : 21
        let newRook = this.state.board[rookActualPosition].piece
        newRook.hasMoved = true
        newBoard[rookFinalPosition] = Tile(rookFinalPosition, newRook)
        newBoard[rookActualPosition] = EmptyTile(rookActualPosition)

      }
      if(newPiece.name === "King" && !newPiece.hasMoved && (position === 87 || position === 27 )){
        var rookFinalPosition = newPiece.alliance === -1 ? 86 : 26
        var rookActualPosition = newPiece.alliance === -1 ? 88 : 28
        let newRook = this.state.board[rookActualPosition].piece
        newRook.hasMoved = true
        newBoard[rookFinalPosition] = Tile(rookFinalPosition, newRook)
        newBoard[rookActualPosition] = EmptyTile(rookActualPosition)

      }
      newPiece.hasMoved = true
      newBoard[position] = Tile(position, newPiece)
      newBoard[this.state.selectedTile] = EmptyTile(this.state.selectedTile[0])
      let gameEnded = this.logic.isGameEnded(newBoard)
      let gameWinner = this.logic.selectWinner(newBoard);
      let newSelectedPiece = []
      let newSelectedTile = []
      let rootedTiles = this.logic.findRoots(newBoard)
      let turn = this.state.turn * -1
      this.props.endMove()
      return ({board:newBoard,
                selectedPiece: newSelectedPiece,
                selectedTile: newSelectedTile,
                gameEnded: gameEnded,
                gameWinner: gameWinner,
                rootedTiles: rootedTiles,
                turn: turn
                })})

  }

  drawTile(tile){
    return(<Square tile={tile} piece={tile.piece} position ={tile.coordinate} handleClick={this.selectTile.bind(this)}/>)
  }
  drawEmptyTile(tile){
    return (<Square tile={tile} piece={tile.piece} position ={tile.coordinate} handleClick={this.selectTile.bind(this)}/>)
  }
  componentWillMount(){
    const logic = new Logic()

    this.setState(function () {
      let board = []
      for(let i =0 ; i < 110 ; i++){
        if(i < 21 || i > 88  ){
            board.push(OffTile(i))
        }else if((i+1)%10 === 0 || i%10 ===0){
            board.push(OffTile(i))
        }else{
        board.push(EmptyTile(i))
      }
      }


      board = this.buildNewBoard(board)

      return({board})
    })
  }

  displayBoard (){
    let boardDisplay = []
    let board = this.state.board
    for(let i =21 ; i< 89 ; i++){
      if((i+1)%10 !== 0 && i%10 !==0){
      boardDisplay.push(this.drawTile(board[i]))
      }
      else {
        boardDisplay.push(<break style={{  flexBasis: '100%', width: 0, height: 0}}></break>)
      }
    }
    return(boardDisplay)

  }
  render() {

    if(typeof this.props.selectedTile !== 'undefined'){
      console.log("Moving")
      this.state.selectedTile = this.props.selectedTile;
      this.state.selectedPiece = this.props.selectedPiece;
      this.executeMove(this.props.newPosition)
      this.props.endMove()
    }
    return (
      <div>
      <div> {this.state.turn === this.props.player ? "Your turn" : "Waiting Oponents Move"}</div>
      <div style ={{display:'flex'}}><section style ={{display:'flex', flexFlow: 'row wrap'}}>{this.displayBoard()}</section></div>      {this.state.gameEnded === true && window.alert(this.state.gameWinner + "Won the Game!")}
      </div>
    );
  }
}

//      <div style ={{display:'flex'}}><section style ={{display:'flex', flexFlow: 'row wrap'}}>{this.displayBoard()}</section></div>



export default Board;
