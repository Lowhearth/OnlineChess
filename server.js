
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

var GAMES = {}

io.on('connection', socket => {
  console.log('New client connected')

  var idPlayer = Math.floor(Math.random() * 10);
  var idGame =  1

    GAMES[idGame] = game(idGame, player(idPlayer,1,socket), board())
    GAMES[idGame].player2 = player(idPlayer,-1,socket)

  socket.on('newMove', (selectedTile, selectedPiece, newPosition) => {
    console.log("moveMade")
    GAMES[idGame].board.selectedTile = selectedTile
    GAMES[idGame].board.selectedPiece = GAMES[idGame].board.board[selectedTile].piece
    GAMES[idGame].board = judge(GAMES[idGame].board, newPosition);
    console.log(GAMES[idGame].board )
    GAMES[idGame].player2.socket.emit('newMoveDone', selectedTile, selectedPiece, newPosition)

  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
