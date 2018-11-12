
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const board = require('./logic/Board')
const judge = require('./logic/Judge')
const game = require ('./Game')
const player = require ('./Player')

// our localhost port
const port = 4000

const app = express()

// our server instance
const server = http.createServer(app)

const io = socketIO(server)

var GAMES = []
GAMES.push("EmptyGame")
io.on('connection', socket => {
  console.log('New client connected')

  var idPlayer = Math.floor(Math.random() * 100);
  var idGame = parseInt(placePlayer(GAMES))
  console.log("id game" + idGame)
  console.log("id player" + idPlayer)
  if(typeof GAMES[idGame] === 'undefined'){
    var currentPlayer = player(idPlayer,-1, socket);
    GAMES.push(game(idGame, currentPlayer, board()))
    socket.emit("assignSlot", -1)
    console.log("assigned  -1")

  }else{
    var currentPlayer = player(idPlayer,1, socket);
    console.log("assigned  1")
    GAMES[idGame] = Object.assign({}, GAMES[idGame], {player2: currentPlayer});
      socket.emit("assignSlot", 1)

  }


  socket.on('newMove', (selectedTile, selectedPiece, newPosition, player) => {
    console.log("moveMade" + player)
    GAMES[idGame].board.selectedTile = selectedTile
    GAMES[idGame].board.selectedPiece = GAMES[idGame].board.board[selectedTile].piece
    GAMES[idGame].board = judge(GAMES[idGame].board, newPosition);
    if(player === -1 ){
      console.log(player)
      console.log("emiting move to player 2")
      GAMES[idGame].player2.socket.emit('newMoveDone', selectedTile, selectedPiece, newPosition)

    }else{
      console.log(player)
      console.log("emiting move to player 1")

      GAMES[idGame].player1.socket.emit('newMoveDone', selectedTile, selectedPiece, newPosition)

    }

  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

function placePlayer (games){
  for(var i = 1 ; i<=games.length ; i++){
    if(typeof games[i] === 'undefined' || typeof games[i].player2 === 'undefined'){
       console.log("player is undefined")
        return i
    }
  }
  return games.length
}

server.listen(port, () => console.log(`Listening on port ${port}`))
